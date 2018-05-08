import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';

import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import ModalDialogFooter from '../../components/ModalDialogFooter/ModalDialogFooter';
import CreateFilterModal from '../../components/CreateFilterModal/CreateFilterModal';

import { dismissCreateFilterModal } from '../../store/ui/CreateFilterModal';
import {
  createFilter,
  updateFilterMapping
} from '../../store/api/SurveyReportFilter';

export class CreateFilterModalCtnr extends React.PureComponent {
  handleSubmit(values) {
    const {
      surveyId,
      createFilter,
      dismissCreateFilterModal,
      updateFilterMapping,
      history
    } = this.props;

    const filter = { surveyId, title: values.title };
    createFilter(surveyId, filter).then(res => {
      if (!res.error) {
        dismissCreateFilterModal();
        updateFilterMapping(surveyId, {
          mappings: { realtime: res.payload.id }
        });
        history.push(
          `/surveys/${surveyId}/reports/realtime/${res.payload.id}`
        );
      }
    });
  }

  render() {
    const {
      isOpen,
      dismissCreateFilterModal,
      submitForm,
      filterTitle
    } = this.props;

    const initialValues = {
      title: filterTitle
    };

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={() => dismissCreateFilterModal()}>
        <ModalDialogHeader
          title="New Report"
          titleIcon="new-report-doc"
          onDismiss={() => dismissCreateFilterModal()}
        />
        {isOpen && (
          <CreateFilterModal
            {...this.props}
            initialValues={initialValues}
            onSubmit={v => this.handleSubmit(v)}
          />
        )}
        <ModalDialogFooter
          onDismiss={() => dismissCreateFilterModal()}
          onSubmit={() => submitForm()}
          submitLabel="Create Report"
        />
      </ModalDialog>
    );
  }
}

CreateFilterModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  dismissCreateFilterModal: PropTypes.func,
  saving: PropTypes.bool,
  title: PropTypes.string,
  surveyId: PropTypes.string,
  createFilter: PropTypes.func,
  creatingFilters: PropTypes.object,
  currentFilters: PropTypes.object,
  updateFilterMapping: PropTypes.func,
  history: PropTypes.object,
  submitForm: PropTypes.func,
  filterTitle: PropTypes.string
};

const mapStateToProps = state => {
  const filterForm = formValueSelector('CreateFilterModal');
  return {
    isOpen: state.CreateFilterModal.get('isOpen'),
    filterTitle: state.CreateFilterModal.get('filterTitle'),
    title: filterForm(state, 'title'),
    surveyId: state.Survey.get('currentSurveyId'),
    creatingFilters: state.SurveyReportFilter
      .get('creatingSurveyFilters')
      .toJS(),
    currentFilters: state.SurveyReport.get('currentFilters').toJS()
  };
};

const mapDispatchToProps = dispatch => ({
  dismissCreateFilterModal() {
    dispatch(dismissCreateFilterModal());
  },
  createFilter(surveyId, filter) {
    return dispatch(createFilter(surveyId, filter));
  },
  updateFilterMapping(surveyId, mapping) {
    dispatch(updateFilterMapping(surveyId, mapping));
  },
  submitForm() {
    dispatch(submit('CreateFilterModal'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateFilterModalCtnr
);
