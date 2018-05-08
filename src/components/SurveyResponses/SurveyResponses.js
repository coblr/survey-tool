import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import FeatureToggles from '../../helpers/FeatureToggles';

import './SurveyResponses.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import InterviewPaginationCtnr from '../../containers/InterviewPaginationCtnr/InterviewPaginationCtnr';
import ActionAlert from '../ActionAlert/ActionAlert';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { getReadableTime } from '../../helpers/Time';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveyResponses extends React.PureComponent {
  render() {
    const {
      responses,
      surveyId,
      filterId,
      deleteInterview,
      showDeleteAlerts,
      showDeleteAlert,
      hideDeleteAlert,
      toggleExclude
    } = this.props;

    return (
      <table
        className="SurveyResponses"
        style={{ visibility: 'hidden' }}>
        <thead className="SurveyResponses_head">
          <tr>
            <th>Included</th>
            <th>Response ID</th>
            <th>Source</th>
            <th>Status</th>
            <th>Cost</th>
            <th>Start Time (PST)</th>
            <th>Time In Survey</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="SurveyResponses_body">
          {(!responses || !responses.length) && (
            <tr>
              <td colSpan="7">No Responses</td>
            </tr>
          )}
          {responses &&
            responses
              .sort((a, b) => {
                const aTime = new Date(a.startTime).getTime();
                const bTime = new Date(b.startTime).getTime();
                // most recent responses at the top
                return bTime - aTime;
              })
              .map((resp, i) => {
                const showAlert = showDeleteAlerts[resp.interviewId];

                const startTime = moment(resp.startTime).format(
                  'YYYY-MM-DD HH:mm:ss'
                );
                const durationData = moment.duration(
                  resp.durationSoFar,
                  'milliseconds'
                );
                const duration = getReadableTime(durationData);

                const rowClass = ['SurveyResponses_row'];
                if (resp.excluded) {
                  rowClass.push('SurveyResponses_row--excluded');
                }

                return (
                  <tr key={i} className={rowClass.join(' ')}>
                    <td>
                      {FeatureToggles.REPORT_MGMT_ENABLED && (
                        <ToggleSwitch
                          active={!resp.excluded}
                          onToggle={() =>
                            toggleExclude(surveyId, resp)}
                        />
                      )}
                      {!FeatureToggles.REPORT_MGMT_ENABLED &&
                        (!resp.excluded ? 'Yes' : 'No')}
                    </td>
                    <td>
                      <Link
                        to={`/surveys/${surveyId}/reports/individual/${resp.interviewId}`}>
                        {resp.interviewId}
                      </Link>
                    </td>
                    <td>{resp.sourceType}</td>
                    <td>{resp.status}</td>
                    <td>N/A</td>
                    <td>{startTime}</td>
                    <td>{duration}</td>
                    <td>
                      <FeatureToggle feature="REPORT_MGMT_ENABLED">
                        <a
                          className="SurveyResponses_deleteBtn"
                          onClick={() =>
                            showDeleteAlert(resp.interviewId)}>
                          <SVGIcon
                            iconId="trash-lg"
                            className="SurveyResponses_deleteIcon"
                          />
                        </a>
                      </FeatureToggle>
                      {showAlert && (
                        <ActionAlert
                          className="SurveyResponses_deleteAlert"
                          pointer="rightMiddle"
                          confirmLabel="Yes, delete anyway"
                          confirmAction={() =>
                            deleteInterview(surveyId, resp)}
                          dismissLabel="Nevermind"
                          dismissAction={() =>
                            hideDeleteAlert(resp.interviewId)}>
                          <p>
                            Do you want to delete this interview?<br />
                            All data and responses will be lost.
                          </p>
                        </ActionAlert>
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
        <tfoot className="SurveyResponses_foot">
          <tr>
            <td colSpan="8">
              <InterviewPaginationCtnr
                surveyId={surveyId}
                filterId={filterId}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

SurveyResponses.propTypes = {
  responses: PropTypes.array,
  surveyId: PropTypes.string,
  filterId: PropTypes.string,
  pagination: PropTypes.object,
  deleteInterview: PropTypes.func,
  showDeleteAlerts: PropTypes.object,
  showDeleteAlert: PropTypes.func,
  hideDeleteAlert: PropTypes.func,
  toggleExclude: PropTypes.func
};

export default SurveyResponses;
