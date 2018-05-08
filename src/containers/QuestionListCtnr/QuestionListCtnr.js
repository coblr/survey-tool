import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuestionList from '../../components/QuestionList/QuestionList';

import {
  initQuestion,
  uninitQuestion
} from '../../store/api/SurveyQuestion';

export class QuestionListCtnr extends React.PureComponent {
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  render() {
    return <QuestionList {...this.props} />;
  }
}

QuestionListCtnr.propTypes = {
  surveyQuestionMap: PropTypes.object,
  page: PropTypes.object,
  editingQuestions: PropTypes.object,
  creatingQuestions: PropTypes.object,
  updatingQuestions: PropTypes.object,
  deletingQuestions: PropTypes.object
};

const mapStateToProps = state => ({
  surveyQuestionMap: state.SurveyQuestion
    .get('surveyQuestionMap')
    .toJS(),
  creatingQuestions: state.SurveyQuestion
    .get('creatingQuestions')
    .toJS(),
  createQuestionErrors: state.SurveyQuestion
    .get('createQuestionErrors')
    .toJS(),
  updatingQuestions: state.SurveyQuestion
    .get('updatingQuestions')
    .toJS(),
  updateQuestionErrors: state.SurveyQuestion
    .get('updateQuestionErrors')
    .toJS(),
  deletingQuestions: state.SurveyQuestion
    .get('deletingQuestions')
    .toJS(),
  deleteQuestionErrors: state.SurveyQuestion
    .get('deleteQuestionErrors')
    .toJS(),
  editingQuestions: state.SurveyQuestion
    .get('editingQuestions')
    .toJS()
});

const mapDispatchToProps = dispatch => ({
  initQuestion(pageId, index) {
    dispatch(initQuestion(pageId, index));
  },
  uninitQuestion(pageId, questionId) {
    dispatch(uninitQuestion(pageId, questionId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionListCtnr
);
