import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, submit } from 'redux-form';

import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import ModalDialogFooter from '../../components/ModalDialogFooter/ModalDialogFooter';
import CopySurveyModal from '../../components/CopySurveyModal/CopySurveyModal';

import { dismissCopySurveyModal } from '../../store/ui/CopySurveyModal';
import { copySurvey, resetErrors } from '../../store/api/Survey';

export class CopySurveyModalCtnr extends React.PureComponent {
  handleSubmit(values) {
    this.props.copySurvey(this.props.surveyId, {
      title: values.title
    });
  }

  render() {
    const {
      isOpen,
      dismissCopySurveyModal,
      submitForm,
      surveyTitle
    } = this.props;

    const initialValues = {
      title: surveyTitle
    };

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={() => dismissCopySurveyModal()}>
        <ModalDialogHeader
          title="Copy Existing Survey"
          titleIcon="copy-lg"
          onDismiss={() => dismissCopySurveyModal()}
        />
        {isOpen && (
          <CopySurveyModal
            {...this.props}
            onSubmit={v => this.handleSubmit(v)}
            initialValues={initialValues}
          />
        )}
        <ModalDialogFooter
          onDismiss={() => dismissCopySurveyModal()}
          onSubmit={() => submitForm()}
        />
      </ModalDialog>
    );
  }
}

CopySurveyModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  surveyTitle: PropTypes.string,
  dismissCopySurveyModal: PropTypes.func,
  copySurvey: PropTypes.func,
  surveyId: PropTypes.string,
  copyingSurveys: PropTypes.object,
  submitForm: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => {
  const copyForm = formValueSelector('CopySurveyModal');
  return {
    isOpen: state.CopySurveyModal.get('isOpen'),
    surveyTitle: state.CopySurveyModal.get('surveyTitle'),
    title: copyForm(state, 'title'),
    surveyId: state.Survey.get('currentSurveyId'),
    copyingSurveys: state.Survey.get('copyingSurveys').toJS(),
    copySurveyErrors: state.Survey.get('copySurveyErrors').toJS()
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dismissCopySurveyModal() {
    dispatch(dismissCopySurveyModal());
    dispatch(resetErrors('copySurveyErrors'));
  },
  copySurvey(surveyId, survey) {
    dispatch(copySurvey(surveyId, survey)).then(res => {
      if (!res.error) {
        dispatch(dismissCopySurveyModal());
        ownProps.history.push(`/surveys/${res.payload.id}/build`);
      }
    });
  },
  submitForm() {
    dispatch(submit('CopySurveyModal'));
  },
  resetErrors(errField) {
    dispatch(resetErrors(errField));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CopySurveyModalCtnr
);
