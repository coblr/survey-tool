import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Environment from '../../helpers/Environment';

import TerminatePage from '../../components/TerminatePage/TerminatePage';

import {
  openEditor,
  closeEditor,
  updateTerminatePage,
  setErrors
} from '../../store/ui/TerminatePage';
import { updateSurvey, resetErrors } from '../../store/api/Survey';

export class TerminatePageCtnr extends React.PureComponent {
  componentDidMount() {
    this.syncEditor({});
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  componentDidUpdate(prevProps) {
    const {
      survey,
      updatingSurveys,
      closeEditor,
      updateSurveyErrors,
      setErrors,
      resetErrors
    } = this.props;
    const { updatingSurveys: prevUpdating } = prevProps;

    this.syncEditor(prevProps);

    // if we were saving but aren't anymore,
    // and there aren't any update errors
    // close the editor.
    const wasUpdating =
      prevUpdating[survey.id] && !updatingSurveys[survey.id];
    if (wasUpdating && !updateSurveyErrors[survey.id]) {
      resetErrors('updateSurveyErrors');
      closeEditor();
      return;
    }

    if (updateSurveyErrors[survey.id]) {
      const err = updateSurveyErrors[survey.id];
      if (err) {
        if (
          err.status === 400 &&
          err.field === 'terminateConclusion.redirectUrl'
        ) {
          setErrors(['The Redirect URL entered is not valid.']);
        }
      }
    }
  }

  syncEditor(prevProps) {
    const { survey, editorIsOpen, updateTerminatePage } = this.props;
    const conclusion = survey.terminateConclusion;
    const userType = localStorage.getItem('user-type');

    if (userType === 'dk' && !conclusion.redirectUrl) {
      let sub;
      let domain;
      switch (Environment) {
        case 'ci':
          sub = 'qaproxy';
          domain = 'surveysampling.com';
          break;
        case 'qa':
          sub = 'qaproxy';
          domain = 'surveysampling.com';
          break;
        case 'stage':
          sub = 'dkr1';
          domain = 'ssisurveys.com';
          break;
        case 'prod':
          sub = 'dkr1';
          domain = 'ssisurveys.com';
          break;
        // no default
      }
      conclusion.redirectUrl = `https://${sub}.${domain}/projects/end?rst=2`;
    }

    if (!editorIsOpen && survey) {
      const type = conclusion.redirectUrl ? 'redirect' : 'message';
      updateTerminatePage('terminateType', type);
      updateTerminatePage('message', conclusion.message || '');
      updateTerminatePage(
        'redirectUrl',
        conclusion.redirectUrl || ''
      );
      updateTerminatePage(
        'includeParams',
        conclusion.includeParams || true
      );
    }
  }

  onChange(param, value) {
    this.props.updateTerminatePage(param, value);
    this.props.setErrors([]);
    this.props.resetErrors('updateSurveyErrors');
  }

  onSubmit() {
    const {
      survey,
      terminateType,
      message,
      redirectUrl,
      includeParams,
      updateSurvey,
      setErrors
    } = this.props;

    const editorErrors = [];

    const terminateConclusion = {};
    if (terminateType === 'message') {
      if (!message) {
        editorErrors.push('Terminate message cannot be blank.');
      }
      delete terminateConclusion.redirectUrl;
      delete terminateConclusion.includeParams;
      terminateConclusion.message = message;
    }
    if (terminateType === 'redirect') {
      if (redirectUrl.match(/^$/)) {
        editorErrors.push('The redirect URL cannot be blank.');
      } else if (!redirectUrl.match(/^https?:\/\//)) {
        editorErrors.push('Please include http:// or https://');
      }

      if (redirectUrl.match(/^https?:\/\/(localhost|10|192|172)/)) {
        editorErrors.push(
          'Redirect URLs must be publicly accessible.'
        );
      }

      delete terminateConclusion.message;
      terminateConclusion.redirectUrl = redirectUrl;
      terminateConclusion.includeParams = includeParams;
    }

    if (editorErrors.length) {
      setErrors(editorErrors);
    } else {
      updateSurvey(survey.id, { terminateConclusion });
    }
  }

  render() {
    return (
      <TerminatePage
        onChange={(param, value) => this.onChange(param, value)}
        onSubmit={() => this.onSubmit()}
        {...this.props}
      />
    );
  }
}

TerminatePageCtnr.propTypes = {
  editorIsOpen: PropTypes.bool,
  survey: PropTypes.object,
  locked: PropTypes.bool,
  validate: PropTypes.func,
  editorErrors: PropTypes.array,
  updateSurvey: PropTypes.func,
  terminateType: PropTypes.string,
  message: PropTypes.string,
  redirectUrl: PropTypes.string,
  includeParams: PropTypes.bool,
  updateTerminatePage: PropTypes.func,
  closeEditor: PropTypes.func,
  updatingSurveys: PropTypes.object,
  updateSurveyErrors: PropTypes.object,
  setErrors: PropTypes.func,
  resetErrors: PropTypes.func
};

const mapStateToProps = state => ({
  editorIsOpen: state.TerminatePage.get('isOpen'),
  includeParams: state.TerminatePage.get('includeParams'),
  terminateType: state.TerminatePage.get('terminateType'),
  message: state.TerminatePage.get('message'),
  redirectUrl: state.TerminatePage.get('redirectUrl'),
  postUrl: state.TerminatePage.get('postUrl'),
  updatingSurveys: state.Survey.get('updatingSurveys').toJS(),
  updateSurveyErrors: state.Survey.get('updateSurveyErrors').toJS(),
  editorErrors: state.TerminatePage.get('editorErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  openEditor() {
    dispatch(openEditor());
  },
  closeEditor() {
    dispatch(closeEditor());
  },
  updateTerminatePage(param, value) {
    dispatch(updateTerminatePage(param, value));
  },
  updateSurvey(surveyId, terminateConclusion) {
    dispatch(updateSurvey(surveyId, terminateConclusion));
  },
  setErrors(errors) {
    dispatch(setErrors(errors));
  },
  resetErrors(field) {
    dispatch(resetErrors(field));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  TerminatePageCtnr
);
