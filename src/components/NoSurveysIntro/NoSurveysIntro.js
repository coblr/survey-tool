import React from 'react';
import PropTypes from 'prop-types';

import './NoSurveysIntro.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class NoSurveysIntro extends React.PureComponent {
  render() {
    const { openCreateSurveyModal } = this.props;
    return (
      <div
        className="NoSurveysIntro"
        style={{ visibility: 'hidden' }}>
        <div className="NoSurveysIntro_text">
          <h2 className="NoSurveysIntro_title">Survey Builder</h2>
          <p>
            Build a survey, connect to <em>any</em> audience and
            analyze results quickly and efficiently.
          </p>
          <p>
            With 36 demographic data points and thousands of profile
            questions to choose from, there are an infinite number of
            audience combinations — all at your fingertips.
          </p>
        </div>
        <SVGIcon iconId="survey-lg" className="NoSurveysIntro_icon" />
        <div className="NoSurveysIntro_btnWrapper">
          <button
            id="btn-introLaunchCreateModal"
            className="NoSurveysIntro_createBtn btn btn-primary"
            onClick={() => openCreateSurveyModal()}>
            <SVGIcon
              iconId="add-plus-lg"
              className="NoSurveysIntro_createBtnIcon"
            />
            <br />
            Start A<br />Survey
          </button>
        </div>
      </div>
    );
  }
}

NoSurveysIntro.propTypes = {
  openCreateSurveyModal: PropTypes.func
};

export default NoSurveysIntro;
