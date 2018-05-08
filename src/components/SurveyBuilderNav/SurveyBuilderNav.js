import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getPreviewUrl } from '../../helpers/InterviewUrl';

import './SurveyBuilderNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveyBuilderNav extends React.PureComponent {
  openSurveyPreview() {
    const { surveyId } = this.props;
    const previewUrl = getPreviewUrl(surveyId);
    window.open(previewUrl, '_blank', 'width=890,height=640');
  }

  render() {
    const { surveyId, location } = this.props;

    const classNames = {
      build: 'SurveyBuilderNav_navBtn',
      promote: 'SurveyBuilderNav_navBtn',
      reports: 'SurveyBuilderNav_navBtn'
    };

    if (location) {
      let active = location.pathname.split('/')[3];
      classNames[active] += ' SurveyBuilderNav_navBtn--selected';
    }

    if (!surveyId) return null;
    return (
      <div
        className="SurveyBuilderNav"
        style={{ visibility: 'hidden' }}>
        <div className="container">
          <div className="SurveyBuilderNav_navItem">
            <Link
              id="btn-buildSurvey"
              className={classNames.build}
              to={`/surveys/${surveyId}/build`}>
              <SVGIcon
                iconId="build"
                className="SurveyBuilderNav_navIcon"
              />
              Build a Survey
            </Link>
          </div>
          <div className="SurveyBuilderNav_navItem">
            <Link
              id="btn-accessAudience"
              className={classNames.promote}
              to={`/surveys/${surveyId}/promote`}>
              <SVGIcon
                iconId="promote"
                className="SurveyBuilderNav_navIcon"
              />
              Access Audience
            </Link>
          </div>
          <div className="SurveyBuilderNav_navItem">
            <Link
              id="btn-analyzeReport"
              className={classNames.reports}
              to={`/surveys/${surveyId}/reports/realtime`}>
              <SVGIcon
                iconId="analyze"
                className="SurveyBuilderNav_navIcon"
              />
              Analyze &amp; Report
            </Link>
          </div>
          <div className="SurveyBuilderNav_actionItem">
            <a
              id="btn-previewSurvey"
              className="SurveyBuilderNav_actionBtn"
              onClick={() => this.openSurveyPreview()}>
              <SVGIcon
                iconId="preview-lg"
                className="SurveyBuilderNav_actionIcon"
              />
              Preview Survey
            </a>
          </div>
        </div>
      </div>
    );
  }
}

SurveyBuilderNav.propTypes = {
  surveyId: PropTypes.string,
  location: PropTypes.object
};

export default SurveyBuilderNav;
