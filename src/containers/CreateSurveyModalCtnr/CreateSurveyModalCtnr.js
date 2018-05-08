import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change, formValueSelector } from 'redux-form';

import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import CreateSurveyModal from '../../components/CreateSurveyModal/CreateSurveyModal';

import { dismissCreateSurveyModal } from '../../store/ui/CreateSurveyModal';
import { createSurvey, resetErrors } from '../../store/api/Survey';

export class CreateSurveyModalCtnr extends React.PureComponent {
  handleSubmit(values) {
    this.props.createSurvey(values);
  }

  render() {
    const { isOpen, dismissCreateSurveyModal } = this.props;

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={() => dismissCreateSurveyModal()}>
        <ModalDialogHeader
          title="Create a New Survey"
          titleIcon="add-plus-lg"
          onDismiss={() => dismissCreateSurveyModal()}
        />
        {isOpen && (
          <CreateSurveyModal
            {...this.props}
            onSubmit={v => this.handleSubmit(v)}
          />
        )}
      </ModalDialog>
    );
  }
}

CreateSurveyModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  dismissCreateSurveyModal: PropTypes.func,
  createSurvey: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  isOpen: state.CreateSurveyModal.get('isOpen'),
  creatingSurvey: state.Survey.get('creatingSurvey'),
  createSurveyError: state.Survey.get('createSurveyError').toJS(),
  title: formValueSelector('CreateSurveyModal')(state, 'title')
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  dismissCreateSurveyModal() {
    dispatch(dismissCreateSurveyModal());
    dispatch(resetErrors('createSurveyError'));
  },
  createSurvey(values) {
    dispatch(createSurvey({ title: values.title })).then(res => {
      if (!res.error) {
        ownProps.history.push(
          `/surveys/${res.payload.id}/${values.nextPath}`
        );
        dispatch(dismissCreateSurveyModal());
      }
    });
  },
  setNextPath(path) {
    dispatch(change('CreateSurveyModal', 'nextPath', path));
  },
  resetErrors(errField) {
    dispatch(resetErrors(errField));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateSurveyModalCtnr
);
