import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import './ReportFilterModal.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class ReportFilterModal extends React.PureComponent {
  render() {
    const { expandedSection, toggleExpandedSection } = this.props;

    const sectionMap = {
      statuses: {
        label: 'Status',
        component: this.renderStatuses()
      },
      sourceTypes: {
        label: 'Sources',
        component: this.renderSourceTypes()
      },
      // questions: {
      //   label: 'Questions',
      //   component: this.renderQuestions()
      // },
      dateRange: {
        label: 'Date Range',
        component: this.renderDateRange()
      }
      // duration: {
      //   label: 'Time in Survey',
      //   component: this.renderDuration()
      // },
      // properties: {
      //   label: 'Properties',
      //   component: this.renderProperties()
      // },
      // conditions: {
      //   label: 'Conditions',
      //   component: this.renderConditions()
      // }
    };

    return (
      <div
        className="ReportFilterModal"
        style={{ visibility: 'hidden' }}>
        {Object.keys(sectionMap).map((section, i) => {
          const sectionClass = ['ReportFilterModal_filterSection'];
          let arrowIconId = 'select-arrow-r';

          if (section === expandedSection) {
            sectionClass.push(
              'ReportFilterModal_filterSection--selected'
            );
            arrowIconId = 'select-arrow';
          }

          return (
            <div key={i} className={sectionClass.join(' ')}>
              <div
                className="ReportFilterModal_sectionHeader"
                onClick={() => toggleExpandedSection(section)}>
                <SVGIcon
                  iconId={arrowIconId}
                  className="ReportFilterModal_headerIcon"
                />
                {sectionMap[section].label}
              </div>
              <div className="ReportFilterModal_sectionBody">
                {sectionMap[section].component}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  autoSelect(filterParam, state) {
    const { filter } = this.props;
    const selected = Object.assign({}, state);

    if (filter[filterParam]) {
      Object.keys(selected).forEach(s => {
        if (filter[filterParam].indexOf(s) >= 0) {
          selected[s] = true;
        }
      });
    }

    // if we're actively using an .ALL property and nothing else
    // in this particular filter is selected, then ALL should be.
    const hasSelected =
      filter[filterParam] && filter[filterParam].length > 0;
    if (selected.ALL !== undefined && !hasSelected) {
      selected.ALL = true;
    }

    return selected;
  }

  renderStatuses() {
    const { toggleFilterParam, clearFilter } = this.props;

    const isChecked = this.autoSelect('statuses', {
      ALL: false,
      IN_PROGRESS: false,
      COMPLETED: false,
      TERMINATED: false,
      ABANDONED: false
    });

    return (
      <div>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="radio"
              className="ReportFilterModal_checkbox"
              checked={isChecked.ALL}
              onChange={() => clearFilter('statuses')}
            />
            All Statuses
          </label>
        </p>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="checkbox"
              className="ReportFilterModal_checkbox"
              checked={isChecked.IN_PROGRESS}
              onChange={() =>
                toggleFilterParam('statuses', 'IN_PROGRESS')}
            />
            In Progress
          </label>
        </p>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="checkbox"
              className="ReportFilterModal_checkbox"
              checked={isChecked.COMPLETED}
              onChange={() =>
                toggleFilterParam('statuses', 'COMPLETED')}
            />
            Completed
          </label>
        </p>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="checkbox"
              className="ReportFilterModal_checkbox"
              checked={isChecked.TERMINATED}
              onChange={() =>
                toggleFilterParam('statuses', 'TERMINATED')}
            />
            Terminated
          </label>
        </p>
        {/*
      <p className="ReportFilterModal_field">
        <label className="ReportFilterModal_checkboxLabel">
          <input
            type="checkbox"
            className="ReportFilterModal_checkbox"
            checked={isChecked.ABANDONED}
            onChange={() => toggleFilterParam('statuses', 'ABANDONED')} />
          Abandoned
        </label>
      </p>
      */}
      </div>
    );
  }

  renderSourceTypes() {
    const { toggleFilterParam, clearFilter } = this.props;

    const isChecked = this.autoSelect('sourceTypes', {
      ALL: false,
      WEB: false,
      EMAIL: false,
      SSS: false
    });

    return (
      <div>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="radio"
              className="ReportFilterModal_checkbox"
              checked={isChecked.ALL}
              onChange={() => clearFilter('sourceTypes')}
            />
            All Sources
          </label>
        </p>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="checkbox"
              className="ReportFilterModal_checkbox"
              checked={isChecked.WEB}
              onChange={() => toggleFilterParam('sourceTypes', 'WEB')}
            />
            Survey Link
          </label>
        </p>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="checkbox"
              className="ReportFilterModal_checkbox"
              checked={isChecked.EMAIL}
              onChange={() =>
                toggleFilterParam('sourceTypes', 'EMAIL')}
            />
            Email
          </label>
        </p>
        <p className="ReportFilterModal_field">
          <label className="ReportFilterModal_checkboxLabel">
            <input
              type="checkbox"
              className="ReportFilterModal_checkbox"
              checked={isChecked.SSS}
              onChange={() => toggleFilterParam('sourceTypes', 'SSS')}
            />
            Self Serve Sample
          </label>
        </p>
      </div>
    );
  }

  // renderQuestions(){
  //   return <div>TODO: Survey Question List</div>;
  // }

  renderDateRange() {
    const { filter, handleDateChange } = this.props;

    const startDate = filter.startDate
      ? moment(filter.startDate)
      : '';
    const endDate = filter.endDate ? moment(filter.endDate) : '';

    return (
      <div>
        <p>Show responses from people who took this survey.</p>
        <label className="ReportFilterModal_label">
          Starting on:
          <Datetime
            className="ReportFilterModal_datetime"
            value={startDate}
            onChange={v => handleDateChange('startDate', v)}
            timeFormat={false}
            inputProps={{
              placeholder: 'Select a start date'
            }}
          />
        </label>
        <label className="ReportFilterModal_label">
          Ending on:
          <Datetime
            className="ReportFilterModal_datetime"
            value={endDate}
            onChange={v =>
              handleDateChange('endDate', v ? v.endOf('day') : null)}
            timeFormat={false}
            inputProps={{
              placeholder: 'Select an end date'
            }}
          />
        </label>
      </div>
    );
  }

  // renderDuration(){
  //   const {setFilterParam, appliedFilters} = this.props;

  //   let startTime = '';
  //   let endTime = '';
  //   if(appliedFilters.duration){
  //     startTime = appliedFilters.duration.startTime || '';
  //     endTime = appliedFilters.duration.endTime || '';
  //   }

  //   return <div>
  //     <p>Show responses of people who spent between</p>
  //     <p>
  //       <input
  //         type="text"
  //         className="ReportFilterModal_input"
  //         value={startTime}
  //         onChange={e => setFilterParam('duration', 'startTime', e.target.value)} />
  //       <span style={{margin:'0 10px'}}>and</span>
  //       <input
  //         type="text"
  //         className="ReportFilterModal_input"
  //         value={endTime}
  //         onChange={e => setFilterParam('duration', 'endTime', e.target.value)} />
  //     </p>
  //     <p>minutes in the survey</p>
  //   </div>;
  // }

  // renderProperties(){
  //   return <div>
  //     <p>Only show responses that match the specified property conditions.</p>
  //     TODO: Property Conditions
  //   </div>;
  // }

  // renderConditions(){
  //   return <div>
  //     <p>Only show responses of people who answered specific questions with specific answers.</p>
  //     TODO: Property Conditions
  //   </div>;
  // }
}

ReportFilterModal.propTypes = {
  expandedSection: PropTypes.string,
  toggleExpandedSection: PropTypes.func,
  filter: PropTypes.object,
  toggleFilterParam: PropTypes.func,
  setFilterParam: PropTypes.func,
  clearFilter: PropTypes.func,
  handleDateChange: PropTypes.func
};

export default ReportFilterModal;
