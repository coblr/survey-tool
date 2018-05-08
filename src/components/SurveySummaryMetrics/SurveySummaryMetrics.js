import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

import './SurveySummaryMetrics.css';

export class SurveySummaryMetrics extends React.PureComponent {
  render() {
    const { metrics, survey } = this.props;

    if (!survey) return null;

    let tileClass = 'SurveySummaryMetrics_metricTile';
    let labelClass = 'SurveySummaryMetrics_metricLabel';
    let metricClass = 'SurveySummaryMetrics_metric';

    if (survey.inProject) {
      tileClass += ' SurveySummaryMetrics_metricTile--small';
      labelClass += ' SurveySummaryMetrics_metricLabel--small';
      metricClass += ' SurveySummaryMetrics_metric--small';
    }

    return (
      <div
        className="SurveySummaryMetrics"
        style={{ visibility: 'hidden' }}>
        <div className={tileClass}>
          <label className={labelClass}>Surveys Started</label>
          <span className={metricClass}>{metrics.started}</span>
        </div>

        <div className={tileClass}>
          <label className={labelClass}>Surveys Finished</label>
          <span className={metricClass}>{metrics.completed}</span>
        </div>

        {survey.projectInfo &&
          survey.projectInfo.audienceIds.length &&
          this.renderChartMetric()}
      </div>
    );
  }

  renderChartMetric() {
    const { survey, audienceStatus } = this.props;

    const pieChartOptions = {
      width: 25,
      height: 25,
      responsive: true,
      maintainAspectRatio: false,
      cutoutPercentage: 40,
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
        custom: tooltip => {
          var tooltipEl = document.getElementById(
            'SurveySummaryMetrics_chartTooltip'
          );

          // Hide if no tooltip
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
          }

          // Set caret Position
          tooltipEl.classList.remove(
            'above',
            'below',
            'no-transform'
          );
          if (tooltip.yAlign) {
            tooltipEl.classList.add(tooltip.yAlign);
          } else {
            tooltipEl.classList.add('no-transform');
          }

          if (tooltip.body) {
            const bodyLines = tooltip.body.map(b => b.lines);
            tooltipEl.innerHTML = bodyLines[0];
          }

          var positionY = 250;
          var positionX = 25;
          tooltipEl.style.opacity = 1;
          tooltipEl.style.left = positionX + tooltip.caretX + 'px';
          tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        }
      }
    };

    const statuses = {
      notStarted: 0,
      active: 0,
      suspended: 0,
      closed: 0
    };
    survey.projectInfo.audienceIds.forEach(audId => {
      if (audienceStatus[audId]) {
        switch (audienceStatus[audId].status) {
          case 'NOT_STARTED':
            statuses.notStarted++;
            break;
          case 'ACTIVE':
            statuses.active++;
            break;
          case 'SUSPENDED':
            statuses.suspended++;
            break;
          case 'CLOSED':
            statuses.closed++;
            break;
          // no default
        }
      }
    });

    const chartData = {
      labels: ['Not Started', 'Active', 'Suspended', 'Closed'],
      datasets: [
        {
          data: [
            statuses.notStarted,
            statuses.active,
            statuses.suspended,
            statuses.closed
          ],
          backgroundColor: ['#30a8dd', '#98be00', '#e42252', '#000']
        }
      ]
    };

    return (
      <div className="SurveySummaryMetrics_metricTile SurveySummaryMetrics_metricTile--small">
        <label className="SurveySummaryMetrics_metricLabel SurveySummaryMetrics_metricLabel--small">
          SSI Audience Status
        </label>
        <span className="SurveySummaryMetrics_chart">
          <Pie data={chartData} options={pieChartOptions} />
          <div id="SurveySummaryMetrics_chartTooltip" />
        </span>
      </div>
    );
  }
}

SurveySummaryMetrics.propTypes = {
  metrics: PropTypes.object,
  survey: PropTypes.object,
  audienceStatus: PropTypes.object
};

export default SurveySummaryMetrics;
