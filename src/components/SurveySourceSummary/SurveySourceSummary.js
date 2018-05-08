import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-duration-format';

import './SurveySourceSummary.css';
import { getReadableTime } from '../../helpers/Time';

export class SurveySourceSummary extends React.PureComponent {
  render() {
    if (!this.props.data) return null;
    return this.renderSummaryTable();
  }

  renderSummaryTable() {
    const { data } = this.props;

    return (
      <table
        className="SurveySourceSummary"
        style={{ visibility: 'hidden' }}>
        <thead>
          <tr>
            <th>Source</th>
            <th className="SurveySourceSummary_dataCol">Started</th>
            <th className="SurveySourceSummary_dataCol">
              In Progress
            </th>
            <th className="SurveySourceSummary_dataCol">Completed</th>
            <th className="SurveySourceSummary_dataCol">
              Terminated
            </th>
            {/*
          <th className="SurveySourceSummary_dataCol">
            Abandoned
          </th>
          */}
            <th className="SurveySourceSummary_dataCol">
              Avg. Duration
            </th>
          </tr>
        </thead>
        {!data.length
          ? this.renderNoSources()
          : this.renderSourceRows()}
        {!!data.length && this.renderTotals()}
      </table>
    );
  }

  renderNoSources() {
    return (
      <tbody>
        <tr>
          <td colSpan="6" className="SurveySourceSummary_noSources">
            No Sources Reporting
          </td>
        </tr>
      </tbody>
    );
  }

  renderSourceRows() {
    const { data } = this.props;

    return (
      <tbody>
        {data.map((source, i) => {
          const durationData = moment.duration(
            source.totals.avgDuration,
            'milliseconds'
          );
          const duration = getReadableTime(durationData);

          return (
            <tr key={i}>
              <td>{source.sourceType}</td>
              <td className="SurveySourceSummary_dataCol">
                {source.totals.started}
              </td>
              <td className="SurveySourceSummary_dataCol">
                {source.totals.inProgress}
              </td>
              <td className="SurveySourceSummary_dataCol">
                {source.totals.completed}
              </td>
              <td className="SurveySourceSummary_dataCol">
                {source.totals.terminated}
              </td>
              {/*
            <td className="SurveySourceSummary_dataCol">
              {source.totals.abandoned}
            </td>
            */}
              <td className="SurveySourceSummary_dataCol">
                {duration}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  renderTotals() {
    const { data } = this.props;

    const grandTotals = {
      started: 0,
      inProgress: 0,
      completed: 0,
      terminated: 0,
      abandoned: 0,
      duration: 0
    };

    data.forEach(d => {
      grandTotals.started += d.totals.started || 0;
      grandTotals.inProgress += d.totals.inProgress || 0;
      grandTotals.completed += d.totals.completed || 0;
      grandTotals.terminated += d.totals.terminated || 0;
      grandTotals.abandoned += d.totals.abandoned || 0;
      grandTotals.duration += d.totals.avgDuration || 0;
    });

    const totalAvgDurationData = moment.duration(
      grandTotals.duration / data.length,
      'milliseconds'
    );

    const totalAvgDuration = getReadableTime(totalAvgDurationData);

    return (
      <tfoot>
        <tr>
          <td>Totals</td>
          <td className="SurveySourceSummary_dataCol">
            {grandTotals.started}
          </td>
          <td className="SurveySourceSummary_dataCol">
            {grandTotals.inProgress}
          </td>
          <td className="SurveySourceSummary_dataCol">
            {grandTotals.completed}
          </td>
          <td className="SurveySourceSummary_dataCol">
            {grandTotals.terminated}
          </td>
          {/*
        <td className="SurveySourceSummary_dataCol">
          {grandTotals.abandoned}
        </td>
        */}
          <td className="SurveySourceSummary_dataCol">
            {totalAvgDuration}
          </td>
        </tr>
      </tfoot>
    );
  }
}

SurveySourceSummary.propTypes = {
  data: PropTypes.array
};

export default SurveySourceSummary;
