import React from 'react';
import PropTypes from 'prop-types';

import { getSourceConfig } from '../../helpers/SourceConfig';
import FeatureToggles from '../../helpers/FeatureToggles';

import './SourceDashboard.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import ActionAlert from '../ActionAlert/ActionAlert';

export class SourceDashboard extends React.PureComponent {
  disableSource(source) {
    const {
      match: { params: { surveyId } },
      toggleSourceProp,
      toggleDisableAlert
    } = this.props;
    toggleSourceProp(surveyId, source, 'active');
    toggleDisableAlert(source.id);
  }

  toggleSwitch(source) {
    const {
      match: { params: { surveyId } },
      toggleSourceProp,
      toggleDisableAlert
    } = this.props;

    // if we are disabling, we need to show the alert
    // otherwise, just make the source active again.
    if (source.active) {
      toggleDisableAlert(source.id);
    } else {
      toggleSourceProp(surveyId, source, 'active');
    }
  }

  render() {
    const {
      match: { params: { surveyId } },
      surveySources,
      fetchResponseSources
    } = this.props;

    const sources = surveySources[surveyId];

    // if we don't have any sources or none of our
    // sources are visible, then don't show shit.
    const hasVisibleSources = !!(
      sources && sources.filter(s => s.visible).length
    );
    if (!sources || !sources.length || !hasVisibleSources) {
      return null;
    }

    return (
      <table
        className="SourceDashboard"
        style={{ visibility: 'hidden' }}>
        <thead>
          <tr className="SourceDashboard_colHeadRow">
            <th />
            <th className="SourceDashboard_colHeadCell SourceDashboard_cell--leftAlign">
              My Sources
            </th>
            <th className="SourceDashboard_colHeadCell">
              Surveys Started
            </th>
            <th className="SourceDashboard_colHeadCell">
              Surveys Finished
            </th>
            <th className="SourceDashboard_colHeadCell">Completed</th>
            <th className="SourceDashboard_colHeadCell">
              Terminated
            </th>
            <th className="SourceDashboard_colHeadCell">Status</th>
            <th className="SourceDashboard_colHeadCell">
              <button
                className="SourceDashboard_refreshBtn"
                onClick={() => fetchResponseSources(surveyId)}>
                <SVGIcon
                  iconId="reload"
                  className="SourceDashboard_colHeadIcon"
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sources &&
            sources.map((source, i) =>
              this.renderSourceRow(source, i)
            )}
        </tbody>
      </table>
    );
  }

  renderSourceRow(source, index) {
    const {
      match: { params: { surveyId } },
      responseSources,
      toggleDisableAlert,
      sourceAlerts,
      survey
    } = this.props;
    const sourceConfig = getSourceConfig(source);

    let totals;
    let started = 0;
    let finished = 0;
    let completed = 0;
    let terminated = 0;

    const rSources = responseSources[surveyId];
    let sourceResponses;
    if (rSources) {
      sourceResponses = rSources.find(
        rs => rs.sourceId === source.id
      );
    }
    if (sourceResponses) {
      totals = sourceResponses.totals;
      started = totals.started;
      finished = totals.completed + totals.terminated;
      completed = totals.completed;
      terminated = totals.terminated;
    }

    // classNames as vars makes the markup cleaner
    // especially for multi-class cells
    const cellClass = 'SourceDashboard_cell';

    const titleCellClass = [
      'SourceDashboard_cell',
      'SourceDashboard_cell--leftAlign'
    ].join(' ');

    const startedCellClass = [
      'SourceDashboard_cell',
      'SourceDashboard_cell--largeText'
    ].join(' ');

    const finishedCellClass = [
      'SourceDashboard_cell',
      'SourceDashboard_cell--largeText',
      'SourceDashboard_cell--redText'
    ].join(' ');

    let dotClass = ['SourceDashboard_activeDot'];
    if (source.active) {
      dotClass.push('SourceDashboard_activeDot--active');
    }
    dotClass = dotClass.join(' ');

    let alertClass = ['SourceDashboard_disableAlert'];
    if (sourceAlerts[source.id]) {
      alertClass.push('SourceDashboard_disableAlert--show');
    }
    alertClass = alertClass.join(' ');

    if (!source.visible) return null;
    return (
      <tr key={index} className="SourceDashboard_bodyRow">
        <td className={cellClass}>
          <SVGIcon iconId="dot" className={dotClass} />
        </td>
        <td className={titleCellClass}>
          <SVGIcon
            iconId={sourceConfig.iconId}
            className="SourceDashboard_sourceIcon"
          />
          {sourceConfig.label}
        </td>
        <td className={startedCellClass}>{started}</td>
        <td className={finishedCellClass}>{finished}</td>
        <td className={cellClass}>{completed}</td>
        <td className={cellClass}>{terminated}</td>
        <td className={cellClass}>
          {source.active ? 'ON' : 'OFF'}
          {!survey.inProject &&
            FeatureToggles.SOURCE_MGMT_ENABLED && (
              <ToggleSwitch
                className="SourceDashboard_toggle"
                active={source.active}
                onToggle={() => this.toggleSwitch(source)}
              />
            )}
          <ActionAlert
            className={alertClass}
            pointer="rightMiddle"
            dismissLabel="Cancel"
            confirmLabel="Turn Off"
            dismissAction={() => toggleDisableAlert(source.id)}
            confirmAction={() => this.disableSource(source)}>
            <h4 className="SourceDashboard_disableTitle">
              Turn Source Off
            </h4>
            <p className="SourceDashboard_disableMessage">
              {`Your survey will become unavailable. Survey takers will see
              the message, "This survey is no longer available."`}
            </p>
          </ActionAlert>
        </td>
        <td className={cellClass} />
      </tr>
    );
  }
}

SourceDashboard.propTypes = {
  match: PropTypes.object,
  surveySources: PropTypes.object,
  toggleSourceProp: PropTypes.func,
  responseSources: PropTypes.object,
  toggleDisableAlert: PropTypes.func,
  sourceAlerts: PropTypes.object,
  fetchResponseSources: PropTypes.func,
  survey: PropTypes.object
};

export default SourceDashboard;
