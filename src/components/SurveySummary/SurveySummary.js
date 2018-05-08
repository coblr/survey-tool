import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './SurveySummary.css';
import SurveySummaryMetrics from '../SurveySummaryMetrics/SurveySummaryMetrics';
import SurveySummaryControls from '../SurveySummaryControls/SurveySummaryControls';
import SurveySummaryChart from '../SurveySummaryChart/SurveySummaryChart';
import Throbber from '../Throbber/Throbber';

export class SurveySummary extends React.PureComponent {
  render() {
    const {
      surveyId,
      surveyMap,
      reportState: {
        fetching,
        surveySummary,
        surveySummary: { totals: metrics },
        breakdownData,
        breakdownLabels,
        timeScale,
        currentUnit
      },
      timeTravel,
      setSummaryScale,
      audienceStatus
    } = this.props;

    if (_.isEmpty(surveySummary)) return null;

    const loadClass = ['SurveySummary_loading'];
    if (fetching) {
      loadClass.push('SurveySummary_loading--show');
    }

    const summaryClass = ['SurveySummary'];
    if (fetching) {
      summaryClass.push('SurveySummary--hide');
    }

    // to avoid having to pass lots of props through
    // the chart to pass to the controls, we're just going
    // to pass in the controls component as a child to
    // the chart and pass in all required props directly from here.
    return (
      <div
        className={summaryClass.join(' ')}
        style={{ visibility: 'hidden' }}>
        <div className={loadClass.join(' ')}>
          <Throbber
            show={true}
            className="SurveySummary_throbber"
            text="Loading Data..."
          />
        </div>

        <div className="SurveySummary_metrics">
          <SurveySummaryMetrics
            metrics={metrics}
            survey={surveyMap[surveyId]}
            audienceStatus={audienceStatus}
          />
        </div>
        <div className="SurveySummary_chart">
          <SurveySummaryChart
            breakdownData={breakdownData}
            breakdownLabels={breakdownLabels}>
            <SurveySummaryControls
              timeScale={timeScale}
              currentUnit={currentUnit}
              timeTravel={timeTravel}
              setSummaryScale={setSummaryScale}
            />
          </SurveySummaryChart>
        </div>
      </div>
    );
  }
}

SurveySummary.propTypes = {
  reportState: PropTypes.object,
  timeTravel: PropTypes.func,
  setSummaryScale: PropTypes.func,
  audienceStatus: PropTypes.object,
  surveyId: PropTypes.string,
  surveyMap: PropTypes.object
};

export default SurveySummary;
