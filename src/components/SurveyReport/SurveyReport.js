import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import './SurveyReport.css';
import AppSubHeaderCtnr from '../../containers/AppSubHeaderCtnr/AppSubHeaderCtnr';
import SurveyBuilderNav from '../SurveyBuilderNav/SurveyBuilderNav';
import NotAvailable from '../NotAvailable/NotAvailable';
import ReportNavCtnr from '../../containers/ReportNavCtnr/ReportNavCtnr';
import RealTimeReportCtnr from '../../containers/RealTimeReportCtnr/RealTimeReportCtnr';
import IndividualReportCtnr from '../../containers/IndividualReportCtnr/IndividualReportCtnr';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveyReport extends React.PureComponent {
  render() {
    const {
      match: { params: { surveyId } },
      location,
      openDownloadReportModal,
      fetchSurveyErrors,
      surveyMap
    } = this.props;

    let fetchError = fetchSurveyErrors[surveyId];
    if (fetchError === '500') {
      fetchError = 'There was a problem fetching your survey.';
    }

    if (fetchError) {
      return (
        <div className="SurveyReport_fetchError">
          <SVGIcon
            iconId="frown-sad"
            className="SurveyReport_fetchErrorIcon"
          />
          <NotAvailable reason={fetchError.message} />
        </div>
      );
    }

    let survey;
    if (surveyMap[surveyId]) {
      survey = surveyMap[surveyId];
    }

    return (
      <div className="SurveyReport" style={{ visibility: 'hidden' }}>
        <AppSubHeaderCtnr
          surveyId={surveyId}
          iconId="survey-lg"
          title={survey ? survey.title : 'Loading Survey...'}
          editable={survey && !survey.locked}
        />
        <SurveyBuilderNav surveyId={surveyId} location={location} />
        <div className="container">
          <ReportNavCtnr
            surveyId={surveyId}
            location={location}
            openDownloadReportModal={() => openDownloadReportModal()}
          />
          <Route
            path="/surveys/:surveyId/reports/realtime/:filterId?"
            component={RealTimeReportCtnr}
          />
          <Route
            exact
            path="/surveys/:surveyId/reports/individual/:interviewId?"
            component={IndividualReportCtnr}
          />
        </div>
      </div>
    );
  }
}

SurveyReport.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  openDownloadReportModal: PropTypes.func,
  fetchSurveyErrors: PropTypes.object,
  surveyMap: PropTypes.object
};

export default SurveyReport;
