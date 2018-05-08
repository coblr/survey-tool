import React from 'react';
import PropTypes from 'prop-types';

import './SurveyLayout.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import LogoUploaderCtnr from '../../containers/LogoUploaderCtnr/LogoUploaderCtnr';
import Throbber from '../Throbber/Throbber';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveyLayout extends React.PureComponent {
  render() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      onChange,
      onSubmit,
      allowBacktrack,
      engineTitle,
      footer,
      logoUrl,
      deleteLogo,
      updatingSurveys
    } = this.props;

    const survey = surveyMap[surveyId];

    if (!survey) return null;
    return (
      <div className="SurveyLayout" style={{ visibility: 'hidden' }}>
        <header className="SurveyLayout_header">
          <SVGIcon
            iconId="layout"
            className="SurveyLayout_headerIcon"
          />
          <h3 className="SurveyLayout_title">Survey Layout</h3>
          <p className="SurveyLayout_disclaimer">
            The following layout options apply to all pages and
            determine how the survey will look to the survey taker.
          </p>
        </header>

        {updatingSurveys[surveyId] ? (
          <Throbber show={true} text="Updating Survey Layout..." />
        ) : (
          <div>
            <label className="SurveyLayout_label">
              Your Logo <small>(optional)</small>
            </label>
            <div className="SurveyLayout_uploadInstructions">
              <p>
                The maximum allowed height is 125 pixels. Images that
                are taller will be automatically resized. File type
                must be .jpg, .gif or .png.
              </p>
              <p className="SurveyLayout_uploadDisclaimer">
                NOTE: You must click save in order to save changes to
                your logo.
              </p>
              {!survey.locked &&
                logoUrl && (
                  <FeatureToggle feature="SURVEY_MGMT_ENABLED">
                    <button
                      className="SurveyLayout_deleteLogoBtn"
                      onClick={() => deleteLogo()}>
                      Delete Logo
                    </button>
                  </FeatureToggle>
                )}
            </div>

            <div className="SurveyLayout_uploadWrapper">
              {!logoUrl &&
                !survey.locked && (
                  <FeatureToggle feature="SURVEY_MGMT_ENABLED">
                    <LogoUploaderCtnr
                      surveyId={surveyId}
                      className="SurveyLayout_fileUploader"
                    />
                  </FeatureToggle>
                )}
              {logoUrl && (
                <img
                  alt="Survey Logo"
                  src={`${logoUrl}?${Date.now()}`}
                  height="125"
                />
              )}
            </div>

            <div className="SurveyLayout_fieldWrapper">
              <div className="SurveyLayout_titleField">
                <label className="SurveyLayout_label">
                  Survey Title
                  <small className="SurveyLayout_small">
                    (optional)
                  </small>
                </label>
                <textarea
                  className="SurveyLayout_textarea"
                  name="engineTitle"
                  value={engineTitle.value}
                  onChange={e => onChange(e)}
                  readOnly={survey.locked}
                />
              </div>
              <div className="SurveyLayout_footerField">
                <label className="SurveyLayout_label">
                  Survey Footer
                  <small className="SurveyLayout_small">
                    (optional)
                  </small>
                </label>
                <textarea
                  className="SurveyLayout_textarea"
                  name="footer"
                  value={footer.value}
                  onChange={e => onChange(e)}
                  readOnly={survey.locked}
                />
              </div>
            </div>
            {
              <div className="SurveyLayout_fieldWrapper">
                <label>
                  <input
                    type="checkbox"
                    name="allowBacktrack"
                    className="SurveyLayout_checkbox"
                    checked={allowBacktrack.value}
                    onChange={e => onChange(e)}
                    disabled={survey.locked}
                  />
                  Enable Back Button
                </label>
                <p className="SurveySettingsForm_instructions">
                  Showing a back button on your survey allows the
                  survey taker to go back and change answers to
                  previous questions.
                </p>
              </div>
            }
            <footer className="SurveyLayout_footer">
              <FeatureToggle feature="SURVEY_MGMT_ENABLED">
                <button
                  type="submit"
                  className="SurveyLayout_saveBtn"
                  onClick={e => onSubmit(e)}
                  disabled={survey && survey.locked}>
                  <SVGIcon
                    iconId="check-lg"
                    className="SurveyLayout_saveIcon"
                  />
                  Save Changes
                </button>
              </FeatureToggle>
            </footer>
          </div>
        )}
      </div>
    );
  }
}

SurveyLayout.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  allowBacktrack: PropTypes.object,
  engineTitle: PropTypes.object,
  footer: PropTypes.object,
  logoUrl: PropTypes.string,
  deleteLogo: PropTypes.func,
  updatingSurveys: PropTypes.object
};

export default SurveyLayout;
