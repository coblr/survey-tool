import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector, change, reset, submit } from 'redux-form';

import QuestionConfig from '../../helpers/QuestionConfig.json';
import { isTempQuestion } from '../../helpers/TempQuestions';

import QuestionEditor from '../../components/QuestionEditor/QuestionEditor';

import {
  proposeQuestionType,
  confirmQuestionType,
  clearTypeChangeWarning,
  showMediaUploader,
  hideMediaUploader
} from '../../store/ui/QuestionEditor';
import {
  createQuestion,
  closeQuestionEditor,
  uninitQuestion,
  updateQuestion
} from '../../store/api/SurveyQuestion';
import { deletePage } from '../../store/api/SurveyPage';
import { fetchSurvey } from '../../store/api/Survey';
import { fetchMedia } from '../../store/api/Media';

export class QuestionEditorCtnr extends React.PureComponent {
  componentWillUnmount() {
    this.props.hideMediaUploader(this.props.question.id);
  }

  getPageLogicReferences() {
    const { survey, surveyPageMap, question } = this.props;

    // find all pages where this question is
    // being used in page logic conditions.
    const pageReferences = [];
    for (let a = 0; a < survey.pages.length; a++) {
      const pageId = survey.pages[a];
      if (pageId === 'temp') continue;

      const pageLogic = surveyPageMap[pageId].branchLogic;
      if (!pageLogic) continue;

      const statements = pageLogic.branchStatements;
      if (!statements) continue;

      for (let b = 0; b < statements.length; b++) {
        const statement = statements[b];
        if (!statement.conditions) continue;

        for (let c = 0; c < statement.conditions.length; c++) {
          const condition = statement.conditions[c];

          if (condition.questionId === question.id) {
            pageReferences.push(pageId);
          }
        }
      }
    }
    return pageReferences;
  }

  handleCancel() {
    const {
      survey,
      page,
      question,
      type,
      uninitQuestion,
      closeQuestionEditor,
      deletePage,
      resetForm
    } = this.props;

    const hasOnlyTemp =
      page.questions.length === 1 &&
      isTempQuestion(page.questions[0]);
    const isTemp = isTempQuestion(question.id);

    if (!hasOnlyTemp) {
      if (isTemp) {
        uninitQuestion(page.id, question.id);
      } else {
        closeQuestionEditor(question.id);
      }
    } else {
      if (!type) {
        deletePage(survey.id, page);
      } else {
        resetForm();
      }
    }
  }

  handleSubmit(values) {
    const {
      survey,
      page,
      question,
      createQuestion,
      updateQuestion,
      updateQuestionErrors
    } = this.props;

    const questionIndex = page.questions.indexOf(question.id);
    const payload = { ...values };
    const apiError = updateQuestionErrors[question.id];
    const qConfig = QuestionConfig.find(t => t.key === question.type);
    const answerType = qConfig && qConfig.answerType;

    // textarea fields have sometimes have dummy answers
    // that we must preserve.
    if (answerType === 'textarea') {
      payload.answers = question.answers;
    } else {
      ['answers', 'rows', 'columns'].forEach(field => {
        if (values[field] && values[field].length) {
          payload[field] = values[field]
            .replace(/(\r|\n|\r\n){1,}[\s]*/g, '$1')
            .trim()
            .split(/[\r\n]/g)
            .map(value => {
              let ogAns = [];
              if (question[field]) {
                ogAns = question[field].filter(v => v.text === value);
              }

              return {
                text: value,
                anchored: ogAns[0] ? ogAns.anchored : false,
                exclusive: ogAns[0] ? ogAns.exclusive : false,
                otherSpecify: value.indexOf('[[input') !== -1
              };
            });
        }
      });
    }

    if (!values.placedImage || !('image' in values.placedImage)) {
      delete payload.placedImage;
    }

    if (isTempQuestion(question.id)) {
      createQuestion(page.id, payload, questionIndex);
    } else {
      // if we currently have an error for the update
      // and we are submitting again, the user is probably
      // confirming they want to force the update
      const useForce =
        apiError && apiError.code === 1 && apiError.status === 409;
      updateQuestion(survey.id, payload, useForce);
    }
  }

  render() {
    const { question } = this.props;
    const pageLogicReferences = this.getPageLogicReferences();

    const initialValues = { ...question };
    ['answers', 'rows', 'columns'].forEach(field => {
      if (question[field] && question[field].length) {
        initialValues[field] = question[field]
          .map(item => item.text)
          .join('\n');
      }
    });

    return (
      <QuestionEditor
        {...this.props}
        form={`QuestionEditor_${question.id}`}
        onSubmit={(v, f) => this.handleSubmit(v, f)}
        onCancel={() => this.handleCancel()}
        initialValues={initialValues}
        pageLogicReferences={pageLogicReferences}
      />
    );
  }
}

QuestionEditorCtnr.propTypes = {
  survey: PropTypes.object,
  surveyPageMap: PropTypes.object,
  page: PropTypes.object,
  question: PropTypes.object,
  index: PropTypes.number,
  updateField: PropTypes.func,
  type: PropTypes.string,
  uninitQuestion: PropTypes.func,
  closeQuestionEditor: PropTypes.func,
  deletePage: PropTypes.func,
  resetForm: PropTypes.func,
  createQuestion: PropTypes.func,
  updateQuestion: PropTypes.func,
  updateQuestionErrors: PropTypes.object,
  hideMediaUploader: PropTypes.func
};

const mapStateToProps = (state, ownProps) => {
  const questionEditorForm = formValueSelector(
    `QuestionEditor_${ownProps.question.id}`
  );

  return {
    type: questionEditorForm(state, 'type'),
    surveyPageMap: state.SurveyPage.get('surveyPageMap').toJS(),
    updateQuestionErrors: state.SurveyQuestion
      .get('updateQuestionErrors')
      .toJS(),
    typeChangeWarnings: state.QuestionEditor
      .get('typeChangeWarnings')
      .toJS(),
    proposedQuestionTypes: state.QuestionEditor
      .get('proposedQuestionTypes')
      .toJS(),
    answers: questionEditorForm(state, 'answers'),
    placedImage: questionEditorForm(state, 'placedImage'),
    openUploaders: state.QuestionEditor.get('openUploaders').toJS()
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const formId = `QuestionEditor_${ownProps.question.id}`;

  return {
    updateField(fieldName, value) {
      dispatch(change(formId, fieldName, value));
    },
    proposeQuestionType(questionId, type) {
      dispatch(proposeQuestionType(questionId, type));
    },
    setQuestionType(questionId, type) {
      dispatch(change(formId, 'type', type));
      dispatch(confirmQuestionType(questionId));
    },
    clearTypeChangeWarning(questionId) {
      dispatch(clearTypeChangeWarning(questionId));
    },
    uninitQuestion(pageId, questionId) {
      dispatch(uninitQuestion(pageId, questionId));
    },
    closeQuestionEditor(qId) {
      dispatch(closeQuestionEditor(qId));
    },
    deletePage(surveyId, page) {
      dispatch(deletePage(surveyId, page));
    },
    resetForm() {
      dispatch(reset(formId));
    },
    createQuestion(pageId, question, index) {
      dispatch(createQuestion(pageId, question, index));
    },
    updateQuestion(surveyId, question, force) {
      dispatch(updateQuestion(question, force))
        .then(() => force && dispatch(fetchSurvey(surveyId)))
        .then(() => dispatch(fetchMedia()));
    },
    submitForm() {
      dispatch(submit(formId));
    },
    showMediaUploader(questionId) {
      dispatch(showMediaUploader(questionId));
      dispatch(change(formId, 'placedImage.size', 'MEDIUM'));
    },
    hideMediaUploader(questionId) {
      dispatch(hideMediaUploader(questionId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionEditorCtnr
);
