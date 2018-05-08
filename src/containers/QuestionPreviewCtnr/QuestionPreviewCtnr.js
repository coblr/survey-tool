import React from 'react';
import { connect } from 'react-redux';

import QuestionPreview from '../../components/QuestionPreview/QuestionPreview';

import {
  openQuestionEditor,
  deleteQuestion,
  expandQuestion,
  collapseQuestion,
  clearDeleteQuestionError
} from '../../store/api/SurveyQuestion';
import { fetchSurvey } from '../../store/api/Survey';
import { openQuestionOptionModal } from '../../store/ui/QuestionOptionModal';

export class QuestionPreviewCtnr extends React.PureComponent {
  componentDidMount() {
    // make any data requests here
  }

  render() {
    return <QuestionPreview {...this.props} />;
  }
}

QuestionPreviewCtnr.propTypes = {};

const mapStateToProps = state => ({
  collapsedQuestions: state.SurveyQuestion
    .get('collapsedQuestions')
    .toJS(),
  deleteQuestionErrors: state.SurveyQuestion
    .get('deleteQuestionErrors')
    .toJS(),
  media: state.Media.get('media').toJS()
});

const mapDispatchToProps = dispatch => ({
  openQuestionEditor(questionId) {
    dispatch(openQuestionEditor(questionId));
  },
  deleteQuestion(surveyId, pageId, questionId, force) {
    dispatch(deleteQuestion(pageId, questionId, force)).then(() => {
      if (force) {
        dispatch(fetchSurvey(surveyId));
      }
    });
  },
  expandQuestion(questionId) {
    dispatch(expandQuestion(questionId));
  },
  collapseQuestion(questionId) {
    dispatch(collapseQuestion(questionId));
  },
  clearDeleteQuestionError(questionId) {
    dispatch(clearDeleteQuestionError(questionId));
  },
  openQuestionOptionModal(question) {
    dispatch(openQuestionOptionModal(question));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionPreviewCtnr
);
