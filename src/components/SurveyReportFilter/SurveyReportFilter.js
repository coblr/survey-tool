import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './SurveyReportFilter.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class SurveyReportFilter extends React.PureComponent {
  render() {
    const { currentFilter, openReportFilterModal } = this.props;

    return (
      <div
        className="SurveyReportFilter"
        style={{ visibility: 'hidden' }}>
        <div className="SurveyReportFilter_title">
          <SVGIcon
            iconId="filter"
            className="SurveyReportFilter_titleIcon"
          />
          Filter Settings:
          <FeatureToggle feature="REPORT_MGMT_ENABLED">
            <button
              className="SurveyReportFilter_editBtn"
              onClick={() => openReportFilterModal(currentFilter)}>
              [edit]
            </button>
          </FeatureToggle>
        </div>
        <div className="SurveyReportFilter_filterSettings">
          {this.renderStatuses(currentFilter)}
          {this.renderSources(currentFilter)}
          {/*this.renderLocations(currentFilter)*/}
          {/*this.renderQuestion(currentFilter)*/}
          {/*this.renderProperties(currentFilter)*/}
          {this.renderDateRange(currentFilter)}
          {/*this.renderConditions(currentFilter)*/}
          {/*this.renderDuration(currentFilter)*/}
        </div>
      </div>
    );
  }

  renderStatuses(currentFilter) {
    let statuses = 'All';
    if (currentFilter && currentFilter.statuses) {
      statuses = currentFilter.statuses
        .join(', ')
        .replace('_', ' ')
        .toLowerCase();
    }

    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Status:</span>
        <span className="SurveyReportFilter_setting">{statuses}</span>
      </div>
    );
  }

  renderSources(currentFilter) {
    let sourceTypes = 'All';
    if (currentFilter && currentFilter.sourceTypes) {
      sourceTypes = currentFilter.sourceTypes
        .join(', ')
        .replace('_', ' ')
        .toLowerCase();
    }
    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Source:</span>
        <span className="SurveyReportFilter_setting">
          {sourceTypes}
        </span>
      </div>
    );
  }

  renderLocations(currentFilter) {
    let locations = 'None Set';
    if (currentFilter && currentFilter.locations) {
      locations = currentFilter.locations;
    }
    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Location:</span>
        <span className="SurveyReportFilter_setting">
          {locations}
        </span>
      </div>
    );
  }

  renderQuestion(currentFilter) {
    let questions = 'All';
    if (currentFilter && currentFilter.questions) {
      questions = currentFilter.questions;
    }
    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Questions:</span>
        <span className="SurveyReportFilter_setting">
          {questions}
        </span>
      </div>
    );
  }

  renderProperties(currentFilter) {
    let properties = 'None Set';
    if (currentFilter && currentFilter.properties) {
      properties = currentFilter.properties;
    }
    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Properties:</span>
        <span className="SurveyReportFilter_setting">
          {properties}
        </span>
      </div>
    );
  }

  renderDateRange(currentFilter) {
    const { startDate, endDate } = currentFilter;
    const start = !startDate ? startDate : moment(startDate);
    const end = !endDate ? endDate : moment(endDate);

    let dateRange = 'Anytime';
    if (start && !end) {
      dateRange = `After ${start.format('MMM DD')}`;
    }
    if (!start && end) {
      dateRange = `Before ${end.format('MMM DD')}`;
    }
    if (start && end) {
      dateRange = `${start.format('MMM DD')} - ${end.format(
        'MMM DD'
      )}`;
    }

    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Date Range:</span>
        <span className="SurveyReportFilter_setting">
          {dateRange}
        </span>
      </div>
    );
  }

  renderConditions(currentFilter) {
    let conditions = 'None Set';
    if (currentFilter && currentFilter.conditions) {
      conditions = currentFilter.conditions;
    }
    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">Conditions:</span>
        <span className="SurveyReportFilter_setting">
          {conditions}
        </span>
      </div>
    );
  }

  renderDuration(currentFilter) {
    let duration = 'None Set';
    if (currentFilter && currentFilter.duration) {
      duration = currentFilter.duration;
    }
    return (
      <div className="SurveyReportFilter_settingRow">
        <span className="SurveyReportFilter_label">
          Time In Survey:
        </span>
        <span className="SurveyReportFilter_setting">{duration}</span>
      </div>
    );
  }
}

SurveyReportFilter.propTypes = {
  openReportFilterModal: PropTypes.func,
  currentFilter: PropTypes.object
};

export default SurveyReportFilter;
