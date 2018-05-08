import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { submit, formValueSelector, change } from 'redux-form';
import _ from 'lodash';

import QuestionConfig from '../../helpers/QuestionConfig';

import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import ModalDialogFooter from '../../components/ModalDialogFooter/ModalDialogFooter';
import QuestionOptionModal from '../../components/QuestionOptionModal/QuestionOptionModal';

import { dismissQuestionOptionModal } from '../../store/ui/QuestionOptionModal';
import { updateQuestion } from '../../store/api/SurveyQuestion';

export class QuestionOptionModalCtnr extends React.PureComponent {
  componentWillUpdate(nextProps) {
    this.updateAnswerLength(nextProps);
    this.updateAnchoredAnswers(nextProps);
  }

  updateAnswerLength(nextProps) {
    const { lengthEnabled, lengthType, setFieldValue } = this.props;

    const {
      lengthEnabled: nextEnabled,
      lengthType: nextType
    } = nextProps;

    // clear all numbers if disabling length check
    if (lengthEnabled && !nextEnabled && nextType) {
      setFieldValue('lengthType', '');
      setFieldValue('exactAnsLength', '');
      setFieldValue('minAnsLength', '');
      setFieldValue('maxAnsLength', '');
    }

    // clear numbers when lengthType changes
    if (lengthType && lengthType !== nextType) {
      setFieldValue('exactAnsLength', '');
      setFieldValue('minAnsLength', '');
      setFieldValue('maxAnsLength', '');
    }
  }

  updateAnchoredAnswers(nextProps) {
    const { randomizeAnswers, question, setFieldValue } = this.props;
    const { randomizeAnswers: nextRandomize } = nextProps;

    if (_.isEmpty(question)) return;
    const qConfig = QuestionConfig.find(c => c.key === question.type);
    const type = qConfig.type;
    const randomizeField = type === 'matrix' ? 'rows' : 'answers';

    if (randomizeAnswers && !nextRandomize) {
      question[randomizeField].forEach((answer, i) => {
        setFieldValue(`${randomizeField}[${i}].anchored`, false);
      });
    }
  }

  handleSubmit(values) {
    const { question, updateQuestion } = this.props;
    const payload = Object.assign({}, question, values);
    this.transformInputLength(payload);
    updateQuestion(payload);
  }

  transformInputLength(payload) {
    switch (payload.lengthType) {
      case 'DEFAULT':
        delete payload.minAnsLength;
        delete payload.maxAnsLength;
        break;

      case 'EXACT':
        payload.minAnsLength = payload.exactAnsLength;
        payload.maxAnsLength = payload.exactAnsLength;
        break;

      // RANGE already has min/max set correctly
      // no default
    }
    delete payload.lengthType;
    delete payload.exactAnsLength;
  }

  render() {
    const {
      isOpen,
      dismissQuestionOptionModal,
      question,
      submitForm
    } = this.props;

    const initialValues = Object.assign({}, question);

    if (question.minAnsLength && question.maxAnsLength) {
      initialValues.lengthEnabled = true;
      if (question.minAnsLength !== question.maxAnsLength) {
        initialValues.lengthType = 'RANGE';
      } else {
        initialValues.lengthType = 'EXACT';
        initialValues.exactAnsLength = question.minAnsLength;
        delete initialValues.minAnsLength;
        delete initialValues.maxAnsLength;
      }
    }

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={() => dismissQuestionOptionModal()}>
        <ModalDialogHeader
          title="Options"
          titleIcon="options"
          onDismiss={() => dismissQuestionOptionModal()}
        />
        {isOpen && (
          <QuestionOptionModal
            {...this.props}
            initialValues={initialValues}
            onSubmit={v => this.handleSubmit(v)}
          />
        )}
        <ModalDialogFooter
          onDismiss={() => dismissQuestionOptionModal()}
          onSubmit={() => submitForm()}
        />
      </ModalDialog>
    );
  }
}

QuestionOptionModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  saving: PropTypes.bool,
  dismissQuestionOptionModal: PropTypes.func,
  question: PropTypes.object,
  updateQuestion: PropTypes.func,
  submitForm: PropTypes.func,
  setFieldValue: PropTypes.func,
  lengthType: PropTypes.string,
  lengthEnabled: PropTypes.bool,
  randomizeAnswers: PropTypes.bool
};

const mapStateToProps = state => {
  const optionForm = formValueSelector('QuestionOptionModal');

  return {
    isOpen: state.QuestionOptionModal.get('isOpen'),
    question: state.QuestionOptionModal.get('currentQuestion').toJS(),
    randomizeAnswers: optionForm(state, 'randomizeAnswers'),
    updatingQuestions: state.SurveyQuestion
      .get('updatingQuestions')
      .toJS(),
    lengthType: optionForm(state, 'lengthType'),
    lengthEnabled: optionForm(state, 'lengthEnabled'),
    mandatory: optionForm(state, 'mandatory')
  };
};

const mapDispatchToProps = dispatch => ({
  dismissQuestionOptionModal() {
    dispatch(dismissQuestionOptionModal());
  },
  updateQuestion(question) {
    dispatch(updateQuestion(question)).then(res => {
      if (!res.error) {
        dispatch(dismissQuestionOptionModal());
      }
    });
  },
  submitForm() {
    dispatch(submit('QuestionOptionModal'));
  },
  setFieldValue(field, value) {
    dispatch(change('QuestionOptionModal', field, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionOptionModalCtnr
);
