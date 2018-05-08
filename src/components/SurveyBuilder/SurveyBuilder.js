import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import './SurveyBuilder.css';
import SurveyEditorNav from '../SurveyEditorNav/SurveyEditorNav';
import SurveyPagesCtnr from '../../containers/SurveyPagesCtnr/SurveyPagesCtnr';
import ReorderCtnr from '../../containers/ReorderCtnr/ReorderCtnr';
import SurveyLayoutCtnr from '../../containers/SurveyLayoutCtnr/SurveyLayoutCtnr';
import SurveySettingsCtnr from '../../containers/SurveySettingsCtnr/SurveySettingsCtnr';
import SVGIcon from '../SVGIcon/SVGIcon';
import NotAvailable from '../NotAvailable/NotAvailable';
import FeatureToggles from '../../helpers/FeatureToggles';

export class SurveyBuilder extends React.PureComponent {
  render() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      location,
      openCopySurveyModal,
      fetchSurveyErrors
    } = this.props;

    let survey;
    if (surveyMap[surveyId]) {
      survey = surveyMap[surveyId];
    }

    let fetchError = fetchSurveyErrors[surveyId];
    if (fetchError === '500') {
      fetchError = 'There was a problem fetching your survey.';
    }
    if (fetchError && fetchError.status === 403) {
      fetchError = 'You are not authorized to view this survey.';
    }

    if (fetchError) {
      return (
        <div className="SurveyBuilder_notAuthorized">
          <SVGIcon
            iconId="frown-sad"
            className="SurveyBuilder_notAuthorizedIcon"
          />
          <NotAvailable reason={fetchError.message} />
        </div>
      );
    }

    const copyBtn = (
      <button
        className="SurveyBuilder_copyBtn"
        onClick={() => openCopySurveyModal(survey.title)}>
        <SVGIcon
          iconId="copy-lg"
          className="SurveyBuilder_copyIcon"
        />
        Copy
      </button>
    );

    return (
      <div className="SurveyBuilder" style={{ visibility: 'hidden' }}>
        <SurveyEditorNav surveyId={surveyId} location={location} />
        {survey &&
          survey.locked && (
            <p className="SurveyBuilder_lockMessage">
              Editing capabilities are limited after receiving the
              first survey response.<br />
              {FeatureToggles.SURVEY_MGMT_ENABLED && (
                <span>
                  To make edits, please {copyBtn} the survey, make
                  edits to the copy and launch the copied survey.
                </span>
              )}
            </p>
          )}
        <Switch>
          <Route
            exact
            path={`/surveys/:surveyId/build`}
            component={SurveyPagesCtnr}
          />
          <Route
            exact
            path={`/surveys/:surveyId/build/reorder`}
            component={ReorderCtnr}
          />
          <Route
            exact
            path={`/surveys/:surveyId/build/layout`}
            component={SurveyLayoutCtnr}
          />
          <Route
            exact
            path={`/surveys/:surveyId/build/settings`}
            component={SurveySettingsCtnr}
          />
        </Switch>
      </div>
    );
  }
}

SurveyBuilder.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  surveyMap: PropTypes.object,
  openCopySurveyModal: PropTypes.func,
  fetchSurveyErrors: PropTypes.object
};

export default SurveyBuilder;
