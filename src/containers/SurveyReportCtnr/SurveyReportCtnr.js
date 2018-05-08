import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveyReport from '../../components/SurveyReport/SurveyReport';

import {
  configureLayout,
  showEditorNav
} from '../../store/ui/Global';
import { fetchSurvey, selectSurvey } from '../../store/api/Survey';
import {
  fetchSurveyFilters,
  fetchFilterMappings
} from '../../store/api/SurveyReportFilter';
import { openDownloadReportModal } from '../../store/ui/DownloadReportModal';

export class SurveyReportCtnr extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params: { surveyId } },
      fetchSurvey,
      selectSurvey,
      configureLayout,
      fetchSurveyFilters,
      fetchFilterMappings
    } = this.props;

    configureLayout({
      showAppActions: true,
      showBuildNav: true,
      showEditorNav: false,
      appBodyBackground: '#FFF'
    });

    fetchSurvey(surveyId);
    selectSurvey(surveyId);
    fetchSurveyFilters(surveyId);
    fetchFilterMappings(surveyId);
  }

  componentDidUpdate(prevProps) {
    this.checkSurvey(prevProps);
  }

  checkSurvey(prevProps) {
    const {
      match: { params: { surveyId } },
      surveyMap,
      fetchSurveyErrors,
      history
    } = this.props;
    const { surveyMap: prevSurveyMap } = prevProps;

    const prevSurvey = prevSurveyMap[surveyId];
    const survey = surveyMap[surveyId];
    const surveyExists = prevSurvey && survey;
    const fetchErrors = fetchSurveyErrors[surveyId];

    if (!surveyExists && !!fetchErrors) {
      if (fetchErrors.status === 404) {
        history.push('/404');
      }
      if (fetchErrors.status === 403) {
        history.push('/403');
      }
    }
  }

  render() {
    return <SurveyReport {...this.props} />;
  }
}

SurveyReportCtnr.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  fetchSurvey: PropTypes.func,
  selectSurvey: PropTypes.func,
  configureLayout: PropTypes.func,
  location: PropTypes.object,
  fetchSurveyFilters: PropTypes.func,
  fetchFilterMappings: PropTypes.func,
  openDownloadReportModal: PropTypes.func,
  fetchSurveyErrors: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS(),
  fetchSurveyErrors: state.Survey.get('fetchSurveyErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchSurvey(surveyId) {
    dispatch(fetchSurvey(surveyId));
  },
  selectSurvey(surveyId) {
    dispatch(selectSurvey(surveyId));
  },
  configureLayout(config) {
    dispatch(configureLayout(config));
  },
  showEditorNav(bool) {
    dispatch(showEditorNav(bool));
  },
  fetchSurveyFilters(surveyId) {
    dispatch(fetchSurveyFilters(surveyId));
  },
  fetchFilterMappings(surveyId) {
    dispatch(fetchFilterMappings(surveyId));
  },
  openDownloadReportModal() {
    dispatch(openDownloadReportModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveyReportCtnr
);
