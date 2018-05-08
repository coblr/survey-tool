import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import './SurveyPromote.css';
import PromoteNav from '../PromoteNav/PromoteNav';
import PromoteInviteCtnr from '../../containers/PromoteInviteCtnr/PromoteInviteCtnr';
import PromoteOnlineCtnr from '../../containers/PromoteOnlineCtnr/PromoteOnlineCtnr';
import PromoteMobileCtnr from '../../containers/PromoteMobileCtnr/PromoteMobileCtnr';
import PromoteSampleCtnr from '../../containers/PromoteSampleCtnr/PromoteSampleCtnr';
import SourceDashboard from '../SourceDashboard/SourceDashboard';
import AudienceDashboardCtnr from '../../containers/AudienceDashboardCtnr/AudienceDashboardCtnr';
import SVGIcon from '../SVGIcon/SVGIcon';
import NotAvailable from '../NotAvailable/NotAvailable';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveyPromote extends React.PureComponent {
  render() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      location,
      fetchSurveyErrors
    } = this.props;

    let fetchError = fetchSurveyErrors[surveyId];
    if (fetchError === '500') {
      fetchError = 'There was a problem fetching your survey.';
    }

    if (fetchError) {
      return (
        <div className="SurveyPromote_fetchError">
          <SVGIcon
            iconId="frown-sad"
            className="SurveyPromote_fetchErrorIcon"
          />
          <NotAvailable reason={fetchError.message} />
        </div>
      );
    }

    const survey = surveyMap[surveyId];
    if (!survey) return null;

    const showContent =
      location.pathname.split('/').pop() !== 'promote';

    return (
      <div className="SurveyPromote" style={{ visibility: 'hidden' }}>
        <SourceDashboard {...this.props} survey={survey} />
        {survey.projectInfo &&
          survey.projectInfo.audienceIds && (
            <AudienceDashboardCtnr survey={survey} />
          )}
        {!survey.inProject && (
          <FeatureToggle feature="SOURCE_MGMT_ENABLED">
            <div>
              <PromoteNav survey={survey} location={location} />
              {showContent && (
                <div className="SurveyPromote_content">
                  <Route
                    exact
                    path="/surveys/:surveyId/promote/invite"
                    component={PromoteInviteCtnr}
                  />
                  <Route
                    exact
                    path="/surveys/:surveyId/promote/online"
                    component={PromoteOnlineCtnr}
                  />
                  <Route
                    exact
                    path="/surveys/:surveyId/promote/mobile"
                    component={PromoteMobileCtnr}
                  />
                  <Route
                    exact
                    path="/surveys/:surveyId/promote/sample"
                    component={PromoteSampleCtnr}
                  />
                </div>
              )}
            </div>
          </FeatureToggle>
        )}
      </div>
    );
  }
}

SurveyPromote.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  location: PropTypes.object,
  responseSources: PropTypes.object,
  fetchSurveyErrors: PropTypes.object
};

export default SurveyPromote;
