import React from 'react';
import PropTypes from 'prop-types';

import './SurveySettings.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveySettings extends React.PureComponent {
  render() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      onChange,
      onSubmit,
      allowMultipleFinishes
    } = this.props;

    const survey = surveyMap[surveyId];

    if (!survey) return null;
    return (
      <form
        className="SurveySettings"
        style={{ visibility: 'hidden' }}
        onSubmit={e => onSubmit(e)}
        method="PATCH">
        <header className="SurveySettings_header">
          <SVGIcon
            iconId="settings-lg"
            className="SurveySettings_headerIcon"
          />
          <h3 className="SurveySettings_title">Survey Settings</h3>
          <p className="SurveySettings_disclaimer">
            The following survey settings allow you to configure the
            behavior of your survey.
          </p>
        </header>
        <div>
          <label className="SurveySettings_label">
            Survey Finishes
          </label>
          <p className="SurveySettings_instructions">
            These settings only apply if you are promoting your survey
            to your own sources. If you are promoting to a targeted
            audience, responses are automatically restricted to one
            survey finish per person.
          </p>
          <div>
            <input
              type="radio"
              className="SurveySettings_checkbox"
              name="allowMultipleFinishes"
              value="false"
              checked={allowMultipleFinishes.value === 'false'}
              onChange={e => onChange(e)}
              disabled={survey.locked}
            />
            <label>Allow only one survey finish per computer</label>
          </div>
          <div>
            <input
              type="radio"
              className="SurveySettings_checkbox"
              name="allowMultipleFinishes"
              value="true"
              checked={allowMultipleFinishes.value === 'true'}
              onChange={e => onChange(e)}
              disabled={survey.locked}
            />
            <label>Allow multiple survey finishes per computer</label>
          </div>
        </div>
        <footer className="SurveySettings_footer">
          <FeatureToggle feature="SURVEY_MGMT_ENABLED">
            <button
              type="submit"
              className="SurveySettings_saveBtn"
              disabled={survey.locked}>
              <SVGIcon
                iconId="check-lg"
                className="SurveySettings_saveIcon"
              />
              Save Changes
            </button>
          </FeatureToggle>
        </footer>
      </form>
    );
  }
}

SurveySettings.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  allowMultipleFinishes: PropTypes.object
};

export default SurveySettings;
