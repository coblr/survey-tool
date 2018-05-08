import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Environment from '../../helpers/Environment';

import ThankYouPage from '../../components/ThankYouPage/ThankYouPage';

import {
  openEditor,
  closeEditor,
  updateThankYouPage,
  setErrors
} from '../../store/ui/ThankYouPage';
import { updateSurvey, resetErrors } from '../../store/api/Survey';

export class ThankYouPageCtnr extends React.PureComponent {
  componentDidMount() {
    this.syncEditor();
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

    this.syncEditor();

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
          err.field === 'thankYouConclusion.redirectUrl'
        ) {
          setErrors(['The Redirect URL entered is not valid.']);
        }
      }
    }
  }

  syncEditor() {
    const { survey, editorIsOpen, updateThankYouPage } = this.props;
    const conclusion = survey.thankYouConclusion;
    const userType = localStorage.getItem('user-type');

    // for DK users, we're going to manually set up a
    // redirect URL back to DK.
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
      conclusion.redirectUrl = `https://${sub}.${domain}/projects/end?rst=1`;
    }

    if (!editorIsOpen && survey) {
      const type = conclusion.redirectUrl ? 'redirect' : 'message';
      updateThankYouPage('thankYouType', type);
      updateThankYouPage('message', conclusion.message || '');
      updateThankYouPage('redirectUrl', conclusion.redirectUrl || '');
      updateThankYouPage(
        'includeParams',
        conclusion.includeParams || true
      );
    }
  }

  onChange(param, value) {
    this.props.updateThankYouPage(param, value);
    this.props.setErrors([]);
    this.props.resetErrors('updateSurveyErrors');
  }

  onSubmit() {
    const {
      survey,
      thankYouType,
      message,
      redirectUrl,
      includeParams,
      updateSurvey,
      setErrors
    } = this.props;

    const editorErrors = [];

    const thankYouConclusion = {};
    if (thankYouType === 'message') {
      if (!message) {
        editorErrors.push('Thank you message cannot be blank.');
      }
      delete thankYouConclusion.redirectUrl;
      delete thankYouConclusion.includeParams;
      thankYouConclusion.message = message;
    }
    if (thankYouType === 'redirect') {
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

      delete thankYouConclusion.message;
      thankYouConclusion.redirectUrl = redirectUrl;
      thankYouConclusion.includeParams = includeParams;
    }

    if (editorErrors.length) {
      setErrors(editorErrors);
    } else {
      updateSurvey(survey.id, { thankYouConclusion });
    }
  }

  render() {
    return (
      <ThankYouPage
        onChange={(param, value) => this.onChange(param, value)}
        onSubmit={() => this.onSubmit()}
        {...this.props}
      />
    );
  }
}

ThankYouPageCtnr.propTypes = {
  editorIsOpen: PropTypes.bool,
  survey: PropTypes.object,
  validate: PropTypes.func,
  editorErrors: PropTypes.array,
  updateSurvey: PropTypes.func,
  thankYouType: PropTypes.string,
  message: PropTypes.string,
  redirectUrl: PropTypes.string,
  includeParams: PropTypes.bool,
  updateThankYouPage: PropTypes.func,
  closeEditor: PropTypes.func,
  updatingSurveys: PropTypes.object,
  updateSurveyErrors: PropTypes.object,
  setErrors: PropTypes.func,
  resetErrors: PropTypes.func
};

const mapStateToProps = state => ({
  editorIsOpen: state.ThankYouPage.get('isOpen'),
  includeParams: state.ThankYouPage.get('includeParams'),
  thankYouType: state.ThankYouPage.get('thankYouType'),
  message: state.ThankYouPage.get('message'),
  redirectUrl: state.ThankYouPage.get('redirectUrl'),
  postUrl: state.ThankYouPage.get('postUrl'),
  updatingSurveys: state.Survey.get('updatingSurveys').toJS(),
  updateSurveyErrors: state.Survey.get('updateSurveyErrors').toJS(),
  editorErrors: state.ThankYouPage.get('editorErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  openEditor() {
    dispatch(openEditor());
  },
  closeEditor() {
    dispatch(closeEditor());
  },
  updateThankYouPage(param, value) {
    dispatch(updateThankYouPage(param, value));
  },
  updateSurvey(surveyId, thankYouConclusion) {
    dispatch(updateSurvey(surveyId, thankYouConclusion));
  },
  setErrors(errors) {
    dispatch(setErrors(errors));
  },
  resetErrors(field) {
    dispatch(resetErrors(field));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ThankYouPageCtnr
);
