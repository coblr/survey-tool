import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import FeatureToggles from '../../helpers/FeatureToggles';

import './ResponseSummary.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { getReadableTime } from '../../helpers/Time';

export class ResponseSummary extends React.PureComponent {
  render() {
    const { data, surveyId, toggleExclude } = this.props;

    return (
      <table
        className="ResponseSummary"
        style={{ visibility: 'hidden' }}>
        <thead className="ResponseSummary_head">
          <tr>
            <th>Included</th>
            <th>Source</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Start Time (PST)</th>
            <th>Time In Survey</th>
          </tr>
        </thead>
        <tbody className="ResponseSummary_body">
          {data
            .sort((a, b) => {
              const aTime = new Date(a.startTime).getTime();
              const bTime = new Date(b.startTime).getTime();
              // most recent responses at the top
              return bTime - aTime;
            })
            .map((resp, i) => {
              const startTime = moment(resp.startTime).format(
                'YYYY-MM-DD HH:mm:ss'
              );

              const durationData = moment.duration(
                resp.durationSoFar,
                'milliseconds'
              );
              const duration = getReadableTime(durationData);

              return (
                <tr key={i}>
                  <td>
                    {FeatureToggles.REPORT_MGMT_ENABLED && (
                      <ToggleSwitch
                        active={!resp.excluded}
                        onToggle={() => toggleExclude(surveyId, resp)}
                      />
                    )}
                    {!FeatureToggles.REPORT_MGMT_ENABLED &&
                      (!resp.excluded ? 'Yes' : 'No')}
                  </td>
                  <td>{resp.sourceType}</td>
                  <td>{resp.status}</td>
                  <td>N/A</td>
                  <td>{startTime}</td>
                  <td>{duration}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

ResponseSummary.propTypes = {
  data: PropTypes.array,
  surveyId: PropTypes.string,
  toggleExclude: PropTypes.func
};

export default ResponseSummary;
