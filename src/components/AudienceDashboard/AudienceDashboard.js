import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Environment from '../../helpers/Environment';

import './AudienceDashboard.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import Throbber from '../Throbber/Throbber';
import { getReadableTime } from '../../helpers/Time';

export class AudienceDashboard extends React.PureComponent {
  render() {
    const { survey, refreshAudienceStatuses } = this.props;

    const projectInfo = survey.projectInfo;
    if (!projectInfo) return null;

    const audiences = survey.projectInfo.audienceIds;
    if (!audiences) return null;

    return (
      <table
        className="AudienceDashboard"
        style={{ visibility: 'hidden' }}>
        <thead>
          <tr className="AudienceDashboard_colHeadRow">
            <th />
            <th className="AudienceDashboard_colHeadCell AudienceDashboard_cell--leftAlign">
              Audience ID
            </th>
            <th className="AudienceDashboard_colHeadCell">Starts</th>
            <th className="AudienceDashboard_colHeadCell">
              Completes
            </th>
            <th className="AudienceDashboard_colHeadCell">
              Screened Out
            </th>
            <th className="AudienceDashboard_colHeadCell">Drops</th>
            <th className="AudienceDashboard_colHeadCell">
              Incidence
            </th>
            <th className="AudienceDashboard_colHeadCell">
              Duration
            </th>
            <th className="AudienceDashboard_colHeadCell">
              <button
                className="AudienceDashboard_refreshBtn"
                onClick={() => refreshAudienceStatuses()}>
                <SVGIcon
                  iconId="reload"
                  className="AudienceDashboard_colHeadIcon"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {audiences &&
            audiences.map((audId, i) =>
              this.renderAudienceRow(audId, i)
            )}
        </tbody>
      </table>
    );
  }

  renderAudienceRow(audId, index) {
    let {
      survey,
      audienceStatus,
      fetchingAudienceStatus,
      fetchAudienceStatusErrors,
      fetchAudienceStatus
    } = this.props;
    let starts = 0;
    let screenedOuts = 0;
    let drops = 0;
    let completes = 0;
    let surveyIncidence = 0;
    let surveyLength = 0;

    audienceStatus = audienceStatus[audId];
    const fetching = fetchingAudienceStatus[audId];
    const error = fetchAudienceStatusErrors[audId];

    if (error) {
      return this.renderErrorRow(index, error);
    }

    if (audienceStatus) {
      starts = audienceStatus.metrics.starts;
      screenedOuts = audienceStatus.metrics.screenedOuts;
      drops = audienceStatus.metrics.drops;
      completes = audienceStatus.metrics.completes;
      surveyIncidence = audienceStatus.metrics.surveyIncidence;
      surveyLength = audienceStatus.metrics.surveyLength;
    }

    const durationData = moment.duration(surveyLength, 'seconds');
    const duration = getReadableTime(durationData);

    // classNames as vars makes the markup cleaner
    // especially for multi-class cells
    const cellClass = 'AudienceDashboard_cell';

    const titleCellClass = [
      'AudienceDashboard_cell',
      'AudienceDashboard_cell--leftAlign'
    ].join(' ');

    const startedCellClass = [
      'AudienceDashboard_cell',
      'AudienceDashboard_cell--largeText'
    ].join(' ');

    const finishedCellClass = [
      'AudienceDashboard_cell',
      'AudienceDashboard_cell--largeText',
      'AudienceDashboard_cell--redText'
    ].join(' ');

    let dotClass = ['AudienceDashboard_activeDot'];
    if (audienceStatus) {
      switch (audienceStatus.status) {
        case 'NOT_STARTED':
          dotClass.push('AudienceDashboard_activeDot--notStarted');
          break;
        case 'SUSPENDED':
          dotClass.push('AudienceDashboard_activeDot--suspended');
          break;
        case 'ACTIVE':
          dotClass.push('AudienceDashboard_activeDot--active');
          break;
        case 'CLOSED':
          dotClass.push('AudienceDashboard_activeDot--closed');
          break;
        // no default
      }
    }
    dotClass = dotClass.join(' ');

    let audienceUrlHost;
    switch (Environment) {
      case 'ci':
      case 'qa':
      case 'stage':
        audienceUrlHost =
          'https://qa-selfservesample.surveysampling.com';
        break;
      case 'prod':
        audienceUrlHost =
          'https://selfservesample.surveysampling.com';
      // no default
    }
    const audienceUrlParams = [
      `p=${survey.projectInfo.projectId}`,
      `a=${audId}`
    ].join('&');
    const audienceUrl = `${audienceUrlHost}?${audienceUrlParams}`;

    return (
      <tr key={index} className="AudienceDashboard_bodyRow">
        <td className={cellClass}>
          <SVGIcon iconId="dot" className={dotClass} />
          {audienceStatus && (
            <span style={{ textTransform: 'capitalize' }}>
              {audienceStatus.status.replace('_', ' ')}
            </span>
          )}
        </td>
        <td className={titleCellClass}>
          <a href={audienceUrl}>{audId}</a>
          <Throbber
            show={fetching}
            className="AudienceDashboard_throbber"
          />
        </td>
        <td className={startedCellClass}>{starts}</td>
        <td className={finishedCellClass}>{completes}</td>
        <td className={cellClass}>{screenedOuts}</td>
        <td className={cellClass}>{drops}</td>
        <td className={cellClass}>{surveyIncidence}</td>
        <td className={cellClass}>{duration || 'N/A'}</td>
        <td className={cellClass}>
          <button
            className="AudienceDashboard_refreshBtn"
            onClick={() =>
              fetchAudienceStatus(
                survey.projectInfo.projectId,
                audId
              )}>
            <SVGIcon
              iconId="reload"
              className="AudienceDashboard_bodyRowIcon"
            />
          </button>
        </td>
      </tr>
    );
  }

  renderErrorRow(index, error) {
    const { status, message } = error;
    let err = `${status} ${message}`;
    if (status === '404') {
      err = 'Invalid Audience ID';
    }

    return (
      <tr key={index} className="AudienceDashboard_bodyRow">
        <td
          colSpan="10"
          className="AudienceDashboard_cell AudienceDashboard_cell--redText">
          {err}
        </td>
      </tr>
    );
  }
}

AudienceDashboard.propTypes = {
  survey: PropTypes.object,
  audienceStatus: PropTypes.object,
  fetchingAudienceStatus: PropTypes.object,
  fetchAudienceStatusErrors: PropTypes.object,
  refreshAudienceStatuses: PropTypes.func,
  fetchAudienceStatus: PropTypes.func
};

export default AudienceDashboard;
