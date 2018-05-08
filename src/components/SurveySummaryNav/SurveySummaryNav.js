import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { getPreviewUrl } from '../../helpers/InterviewUrl';

import './SurveySummaryNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveySummaryNav extends React.PureComponent {
  openSurveyPreview() {
    const { survey } = this.props;
    const previewUrl = getPreviewUrl(survey.id);

    window.open(previewUrl, '_blank', 'width=890,height=640');
  }

  render() {
    const { survey } = this.props;

    return (
      <div
        className="SurveySummaryNav"
        style={{ visibility: 'hidden' }}>
        <div className="SurveySummaryNav_navItem">
          <Link
            id="btn-buildSurvey"
            className="SurveySummaryNav_navBtn"
            to={`/surveys/${survey.id}/build`}>
            <SVGIcon
              iconId="build"
              className="SurveySummaryNav_navIcon"
            />
            Modify Survey
          </Link>
        </div>
        <div className="SurveySummaryNav_navItem">
          <Link
            id="btn-accessAudience"
            className="SurveySummaryNav_navBtn"
            to={`/surveys/${survey.id}/promote`}>
            <SVGIcon
              iconId="promote"
              className="SurveySummaryNav_navIcon"
            />
            Access Audience
          </Link>
        </div>
        <div className="SurveySummaryNav_navItem">
          <Link
            id="btn-analyzeReport"
            className="SurveySummaryNav_navBtn"
            to={`/surveys/${survey.id}/reports/realtime`}>
            <SVGIcon
              iconId="analyze"
              className="SurveySummaryNav_navIcon"
            />
            Analyze &amp; Report
          </Link>
        </div>
        <div className="SurveySummaryNav_navItem">
          <a
            id="btn-previewSurvey"
            className="SurveySummaryNav_navBtn"
            onClick={() => this.openSurveyPreview()}>
            <SVGIcon
              iconId="preview-lg"
              className="SurveySummaryNav_navIcon"
            />
            Preview Survey
          </a>
        </div>
      </div>
    );
  }
}

SurveySummaryNav.propTypes = {
  survey: PropTypes.object
};

export default SurveySummaryNav;
