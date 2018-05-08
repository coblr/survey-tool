import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveyLayout from '../../components/SurveyLayout/SurveyLayout';

import { updateSurvey } from '../../store/api/Survey';
import { removeLogo } from '../../store/api/SurveyLogo';

export class SurveyLayoutCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logoDeleted: false,
      allowBacktrack: { value: false },
      engineTitle: { value: '' },
      footer: { value: '' },
      logoUrl: { value: '' }
    };
  }

  // gotta do this so that when leaving this section
  // and coming back, things get populated again.
  // ComponentWilLReceiveProps doesn't run on mounting.
  componentDidMount() {
    this.populateForm(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.populateForm(nextProps);

    let { logo } = this.props;
    let { logo: nextLogo } = nextProps;

    // after a survey is uploaded, update for saving
    if (!logo && nextLogo) {
      this.setState({ logoUrl: { value: nextLogo } });
    }
  }

  // remove the upload from the media array
  // because if the user deletes the logo after
  // just uploading it, the file preview in the
  // file uploader will still display that image
  // when it should be displaying the upload form.
  componentWillUnmount() {
    this.props.removeLogo();
  }

  populateForm(props) {
    const { match: { params: { surveyId } } } = props;
    const survey = props.surveyMap[surveyId];
    if (!survey) return;

    // don't populate if we are uploading or else
    // the old logo will display while upload happens.
    if (props.uploadinLogo) return;

    // if the user has chosen to delete the logo then
    // from now on, when they delete logos (aka upload attempts)
    // we will keep that field blank instead of repopulating
    // with the original logo they wanted to delete.
    const logoUrl = this.state.logoDeleted ? '' : survey.logoUrl;

    this.setState({
      allowBacktrack: { value: survey.allowBacktrack },
      engineTitle: {
        value: this.state.engineTitle.value || survey.engineTitle
      },
      footer: { value: this.state.footer.value || survey.footer },
      logoUrl: { value: logoUrl }
    });
  }

  deleteLogo() {
    this.setState({
      logoDeleted: true,
      logoUrl: { value: '' }
    });
    this.props.removeLogo();
  }

  onChange(e) {
    const { name, type, value, checked } = e.target;
    const updateValue = type === 'checkbox' ? checked : value;
    const toMerge = {
      [name]: {
        value: updateValue
      }
    };
    this.setState(toMerge);
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      allowBacktrack: { value: allowBacktrack },
      engineTitle: { value: engineTitle },
      footer: { value: footer },
      logoUrl: { value: logoUrl }
    } = this.state;
    const { match: { params: { surveyId } } } = this.props;

    const payload = {
      allowBacktrack,
      engineTitle,
      footer,
      logoUrl
    };

    // this.setState({logoDeleted: false});
    this.props.updateSurvey(surveyId, payload);
  }

  render() {
    const { logo } = this.props;
    const { logoUrl } = this.state;

    return (
      <SurveyLayout
        {...this.props}
        {...this.state}
        onChange={e => this.onChange(e)}
        onSubmit={e => this.onSubmit(e)}
        logoUrl={logo || logoUrl.value}
        deleteLogo={() => this.deleteLogo()}
      />
    );
  }
}

SurveyLayoutCtnr.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  updateSurvey: PropTypes.func,
  logo: PropTypes.string,
  removeLogo: PropTypes.func
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS(),
  updatingSurveys: state.Survey.get('updatingSurveys').toJS(),
  uploadingLogo: state.SurveyLogo.get('uploadingLogo'),
  logo: state.SurveyLogo.get('logo')
});

const mapDispatchToProps = dispatch => ({
  updateSurvey(surveyId, survey) {
    dispatch(updateSurvey(surveyId, survey));
  },
  removeLogo(id) {
    dispatch(removeLogo(id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveyLayoutCtnr
);
