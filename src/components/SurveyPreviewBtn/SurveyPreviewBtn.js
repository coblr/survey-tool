import React from 'react';
import PropTypes from 'prop-types';

import { getPreviewUrl } from '../../helpers/InterviewUrl';

import './SurveyPreviewBtn.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveyPreviewBtn extends React.PureComponent {
  openSurveyPreview() {
    const { surveyId } = this.props;
    const previewUrl = getPreviewUrl(surveyId);
    window.open(previewUrl, '_blank', 'width=890,height=640');
  }

  render() {
    return (
      <button
        className="SurveyPreviewBtn"
        style={{ visibility: 'hidden' }}
        onClick={() => this.openSurveyPreview()}>
        <SVGIcon
          iconId="preview-lg"
          className="SurveyPreviewBtn_icon"
        />
        Preview Survey
      </button>
    );
  }
}

SurveyPreviewBtn.propTypes = {
  surveyId: PropTypes.string
};

export default SurveyPreviewBtn;
