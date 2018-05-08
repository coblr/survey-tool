import React from 'react';
import PropTypes from 'prop-types';

import './SurveySummaryControls.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveySummaryControls extends React.PureComponent {
  render() {
    const {
      timeScale,
      currentUnit,
      timeTravel,
      setSummaryScale
    } = this.props;

    const scaleClassMap = {
      year: 'SurveySummaryControls_scaleNavBtn',
      month: 'SurveySummaryControls_scaleNavBtn',
      day: 'SurveySummaryControls_scaleNavBtn'
    };
    scaleClassMap[timeScale] +=
      ' SurveySummaryControls_scaleNavBtn--selected';

    return (
      <div
        className="SurveySummaryControls"
        style={{ visibility: 'hidden' }}>
        <div className="SurveySummaryControls_timeNav">
          <button
            id="btn-chartTimeNavPrev"
            className="SurveySummaryControls_timeNavBtn"
            onClick={() => timeTravel(-1)}
            title="Show results for the full day">
            <SVGIcon
              iconId="arrow-l-lg"
              className="SurveySummaryControls_timeNavIcon"
            />
          </button>
          <span
            id="info-chartCurrentTime"
            className="SurveySummaryControls_currentUnit">
            {currentUnit}
          </span>
          <button
            id="btn-chartTimeNavNext"
            className="SurveySummaryControls_timeNavBtn"
            onClick={() => timeTravel()}
            title="Show results for the full month">
            <SVGIcon
              iconId="arrow-r-lg"
              className="SurveySummaryControls_timeNavIcon"
            />
          </button>
        </div>
        <div className="SurveySummaryControls_scaleNav">
          <button
            id="btn-chartTimeScaleYear"
            className={scaleClassMap.year}
            onClick={() => setSummaryScale('year')}
            title="Show results for the full year">
            <SVGIcon
              iconId="calendar-lg"
              className="SurveySummaryControls_scaleNavIcon"
            />
          </button>
          <button
            id="btn-chartTimeScaleMonth"
            className={scaleClassMap.month}
            onClick={() => setSummaryScale('month')}>
            <SVGIcon
              iconId="day-lg"
              className="SurveySummaryControls_scaleNavIcon"
            />
          </button>
          <button
            id="btn-chartTimeScaleDay"
            className={scaleClassMap.day}
            onClick={() => setSummaryScale('day')}>
            <SVGIcon
              iconId="clock-time"
              className="SurveySummaryControls_scaleNavIcon"
            />
          </button>
        </div>
      </div>
    );
  }
}

SurveySummaryControls.propTypes = {
  timeScale: PropTypes.string,
  currentUnit: PropTypes.string,
  timeTravel: PropTypes.func,
  setSummaryScale: PropTypes.func
};

export default SurveySummaryControls;
