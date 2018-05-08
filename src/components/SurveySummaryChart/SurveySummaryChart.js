import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import _ from 'lodash';

import './SurveySummaryChart.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class SurveySummaryChart extends React.PureComponent {
  render() {
    const { breakdownData, breakdownLabels, children } = this.props;

    const chartData = {
      labels: breakdownLabels,
      datasets: [
        {
          type: 'bar',
          label: 'completes',
          data: breakdownData,
          backgroundColor: '#30a8dd'
        }
      ]
    };

    const maxResponses = _.max(breakdownData);
    const chartOptions = {
      responsive: false,
      maintainAspectRatio: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize:
                maxResponses < 10 ? 1 : Math.round(maxResponses / 5),
              suggestedMax: maxResponses < 5 ? 5 : maxResponses
            }
          }
        ]
      }
    };

    // to avoid having to pass all sorts of props from the
    // report container to the chart controls, we're just
    // going to expect that the controls will be passed in
    // as a child of this component. Keeps things focused here.
    return (
      <div
        className="SurveySummaryChart"
        style={{ visibility: 'hidden' }}>
        {children}

        {_.isEmpty(breakdownData) ? (
          <div className="SurveySummaryChart_noData">
            <SVGIcon
              iconId="frown-sad"
              className="SurveySummaryChart_noDataIcon"
            />
            No Data Available
          </div>
        ) : (
          <Bar
            data={chartData}
            options={chartOptions}
            width={480}
            height={200}
          />
        )}
      </div>
    );
  }
}

SurveySummaryChart.propTypes = {
  children: PropTypes.object,
  breakdownData: PropTypes.array,
  breakdownLabels: PropTypes.array
};

export default SurveySummaryChart;
