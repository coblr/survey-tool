import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Environment from '../../helpers/Environment';

import './SurveyActionNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import ActionAlert from '../ActionAlert/ActionAlert';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveyActionNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showDeleteAlert: false };
  }

  toggleDeleteAlert() {
    this.setState({ showDeleteAlert: !this.state.showDeleteAlert });
  }

  render() {
    const { survey, openCopySurveyModal, deleteSurvey } = this.props;
    const { showDeleteAlert } = this.state;

    if (!survey) return null;

    let projectUrl;
    if (survey.projectInfo) {
      let projectUrlHost;
      switch (Environment) {
        case 'ci':
        case 'qa':
        case 'stage':
          projectUrlHost =
            'https://qa-selfservesample.surveysampling.com';
          break;
        case 'prod':
          projectUrlHost =
            'https://selfservesample.surveysampling.com';
        // no default
      }
      projectUrl = `${projectUrlHost}?p=${survey.projectInfo
        .projectId}`;
    }

    return (
      <div
        className="SurveyActionNav"
        style={{ visibility: 'hidden' }}>
        <FeatureToggle feature="SURVEY_MGMT_ENABLED">
          {!survey.locked && (
            <Link
              to={`/surveys/${survey.id}/build`}
              className="SurveyActionNav_item">
              <SVGIcon
                iconId="build"
                className="SurveyActionNav_itemIcon"
              />
              Build
            </Link>
          )}
          {!survey.locked && (
            <Link
              to={`/surveys/${survey.id}/build/reorder`}
              className="SurveyActionNav_item">
              <SVGIcon
                iconId="reorder-arrows"
                className="SurveyActionNav_itemIcon"
              />
              Reorder
            </Link>
          )}
          <a
            className="SurveyActionNav_item"
            onClick={() => openCopySurveyModal(survey.title)}>
            <SVGIcon
              iconId="copy-lg"
              className="SurveyActionNav_itemIcon"
            />
            Copy Survey
          </a>
          <div
            className="SurveyActionNav_item"
            onClick={() => this.toggleDeleteAlert()}>
            <SVGIcon
              iconId="trash-lg"
              className="SurveyActionNav_itemIcon"
            />
            Delete Survey
            {showDeleteAlert &&
              !survey.inProject && (
                <ActionAlert
                  className="SurveyActionNav_deleteAlert"
                  pointer="leftTop"
                  dismissAction={() => this.toggleDeleteAlert()}
                  confirmAction={() => deleteSurvey(survey)}>
                  <p>
                    Do you want to delete this survey?<br />
                    All data for this survey will be removed.
                  </p>
                </ActionAlert>
              )}
            {showDeleteAlert &&
              survey.inProject && (
                <ActionAlert
                  className="SurveyActionNav_deleteAlert"
                  pointer="leftTop"
                  confirmAction={() => this.toggleDeleteAlert()}
                  confirmLabel="OK">
                  <p>
                    This survey is being used within a<br />
                    project and cannot be deleted.<br />
                    <a href={projectUrl}>View Project</a>
                  </p>
                </ActionAlert>
              )}
          </div>
        </FeatureToggle>
      </div>
    );
  }
}

SurveyActionNav.propTypes = {
  survey: PropTypes.object,
  openCopySurveyModal: PropTypes.func,
  toggleDeleteAlert: PropTypes.func,
  showDeleteAlert: PropTypes.bool,
  deleteSurvey: PropTypes.func
};

export default SurveyActionNav;
