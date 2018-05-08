import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './InterviewNavigator.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class InterviewNavigator extends React.PureComponent {
  render() {
    const { surveyId, interviewId, interviews } = this.props;

    let index;
    if (interviews) {
      interviews.forEach((interview, i) => {
        if (interview.interviewId === interviewId) {
          index = i;
        }
      });
    }

    const prevInterview = interviews[index - 1];
    const nextInterview = interviews[index + 1];

    return (
      <div
        className="InterviewNavigator"
        style={{ visibility: 'hidden' }}>
        <Link
          className="InterviewNavigator_backBtn"
          to={`/surveys/${surveyId}/reports/individual`}>
          View All
        </Link>
        {index && (
          <span>
            |
            <span className="InterviewNavigator_counter">
              {index + 1} of {interviews.length}
            </span>
          </span>
        )}
        {prevInterview && (
          <Link
            className="InterviewNavigator_navBtn"
            to={`/surveys/${surveyId}/reports/individual/${prevInterview.interviewId}`}>
            <SVGIcon
              iconId="arrow-circle-l-lg"
              className="InterviewNavigator_navIcon"
            />
          </Link>
        )}
        {nextInterview && (
          <Link
            className="InterviewNavigator_navBtn"
            to={`/surveys/${surveyId}/reports/individual/${nextInterview.interviewId}`}>
            <SVGIcon
              iconId="arrow-circle-r-lg"
              className="InterviewNavigator_navIcon"
            />
          </Link>
        )}
      </div>
    );
  }
}

InterviewNavigator.propTypes = {
  interviews: PropTypes.array,
  surveyId: PropTypes.string,
  interviewId: PropTypes.string
};

export default InterviewNavigator;
