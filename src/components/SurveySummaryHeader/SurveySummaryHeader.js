import React from 'react';
import PropTypes from 'prop-types';

import './SurveySummaryHeader.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import InlineEditorCtnr from '../../containers/InlineEditorCtnr/InlineEditorCtnr';
import EllipsedText from '../EllipsedText/EllipsedText';
import ActionAlert from '../ActionAlert/ActionAlert';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveySummaryHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteAlert: false
    };
  }

  toggleDeleteAlert() {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  }

  render() {
    const {
      survey,
      updateSurvey,
      deleteSurvey,
      surveyState,
      openCopySurveyModal
    } = this.props;

    const savingSurvey = surveyState.updatingSurveys[survey.id];

    return (
      <div
        className="SurveySummaryHeader"
        style={{ visibility: 'hidden' }}>
        <SVGIcon
          iconId="survey-lg"
          className="SurveySummaryHeader_titleIcon"
        />
        <h3
          id="info-currentSurveyTitle"
          className="SurveySummaryHeader_title">
          {survey.locked ? (
            <span>{survey.title}</span>
          ) : (
            <InlineEditorCtnr
              editorId="summaryTitle"
              value={survey.title}
              onSubmit={title => updateSurvey(survey.id, { title })}
              saving={savingSurvey}>
              <EllipsedText length="30">{survey.title}</EllipsedText>
            </InlineEditorCtnr>
          )}
        </h3>
        <div className="SurveySummaryHeader_surveyActions">
          <FeatureToggle feature="SURVEY_MGMT_ENABLED">
            <button
              id="btn-copySurvey"
              className="SurveySummaryHeader_surveyAction"
              onClick={() => openCopySurveyModal(survey.title)}
              title="Copy Survey">
              <SVGIcon
                iconId="copy-lg"
                className="SurveySummaryHeader_surveyActionIcon"
              />
            </button>
          </FeatureToggle>
          <button
            id="btn-deleteSurvey"
            className="SurveySummaryHeader_surveyAction"
            onClick={() => this.toggleDeleteAlert()}
            title="Delete Survey">
            <SVGIcon
              iconId="trash-lg"
              className="SurveySummaryHeader_surveyActionIcon"
            />
          </button>
          {this.state.showDeleteAlert &&
            !survey.inProject && (
              <ActionAlert
                className="SurveySummaryHeader_deleteAlert"
                pointer="rightTop"
                dismissAction={() => this.toggleDeleteAlert()}
                confirmAction={() => deleteSurvey(survey)}>
                <p>
                  Do you want to delete this survey?<br />
                  All data for this survey will be removed.
                </p>
              </ActionAlert>
            )}
          {this.state.showDeleteAlert &&
            survey.inProject && (
              <ActionAlert
                className="SurveySummaryHeader_deleteAlert"
                pointer="rightTop"
                confirmAction={() => this.toggleDeleteAlert()}
                confirmLabel="OK">
                <p>
                  This survey is being used within a<br />
                  a project and cannot be deleted.
                </p>
              </ActionAlert>
            )}
        </div>
      </div>
    );
  }
}

SurveySummaryHeader.propTypes = {
  survey: PropTypes.object,
  updateSurvey: PropTypes.func,
  deleteSurvey: PropTypes.func,
  surveyState: PropTypes.object,
  openCopySurveyModal: PropTypes.func
};

export default SurveySummaryHeader;
