import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import ModalDialogFooter from '../../components/ModalDialogFooter/ModalDialogFooter';
import ReportFilterModal from '../../components/ReportFilterModal/ReportFilterModal';

import {
  dismissReportFilterModal,
  setExpandedSection,
  toggleFilterParam,
  setFilterParam,
  clearFilter
} from '../../store/ui/ReportFilterModal';
import {
  createFilter,
  updateFilter
} from '../../store/api/SurveyReportFilter';

export class ReportFilterModalCtnr extends React.PureComponent {
  toggleExpandedSection(section) {
    const { expandedSection, setExpandedSection } = this.props;
    const newSection = expandedSection !== section ? section : '';
    setExpandedSection(newSection);
  }

  handleDateChange(field, value) {
    value = !value ? '' : value.format('YYYY-MM-DDTHH:mm:ssZ');
    this.props.setFilterParam(field, value);
  }

  onSubmit() {
    const {
      surveyId,
      filter,
      createFilter,
      updateFilter,
      dismissReportFilterModal
    } = this.props;

    if (_.isEmpty(filter)) {
      createFilter(surveyId, {
        surveyId,
        title: 'My Summary Report',
        ...filter
      });
    } else {
      updateFilter(surveyId, filter.id, filter);
    }
    dismissReportFilterModal();
  }

  render() {
    const { isOpen, dismissReportFilterModal } = this.props;

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={dismissReportFilterModal}>
        <ModalDialogHeader
          title="Edit Filter Settings"
          titleIcon="filter"
          onDismiss={dismissReportFilterModal}
        />
        <ReportFilterModal
          {...this.props}
          handleDateChange={(f, v) => this.handleDateChange(f, v)}
          toggleExpandedSection={s => this.toggleExpandedSection(s)}
        />
        <ModalDialogFooter
          onDismiss={dismissReportFilterModal}
          onSubmit={() => this.onSubmit()}
        />
      </ModalDialog>
    );
  }
}

ReportFilterModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  filter: PropTypes.object,
  expandedSection: PropTypes.string,
  setExpandedSection: PropTypes.func,
  dismissReportFilterModal: PropTypes.func,
  toggleFilterParam: PropTypes.func,
  setFilterParam: PropTypes.func,
  surveyId: PropTypes.string,
  createFilter: PropTypes.func,
  updateFilter: PropTypes.func,
  clearFilter: PropTypes.func
};

const mapStateToProps = state => ({
  isOpen: state.ReportFilterModal.get('isOpen'),
  filter: state.ReportFilterModal.get('filter').toJS(),
  expandedSection: state.ReportFilterModal.get('expandedSection'),
  surveyId: state.Survey.get('currentSurveyId')
});

const mapDispatchToProps = dispatch => ({
  setExpandedSection(section) {
    dispatch(setExpandedSection(section));
  },
  dismissReportFilterModal() {
    dispatch(dismissReportFilterModal());
  },
  createFilter(surveyId, filter) {
    dispatch(createFilter(surveyId, filter));
  },
  toggleFilterParam(section, param) {
    dispatch(toggleFilterParam(section, param));
  },
  setFilterParam(param, value) {
    dispatch(setFilterParam(param, value));
  },
  updateFilter(surveyId, filterId, filter) {
    dispatch(updateFilter(surveyId, filterId, filter));
  },
  clearFilter(section) {
    dispatch(clearFilter(section));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ReportFilterModalCtnr
);
