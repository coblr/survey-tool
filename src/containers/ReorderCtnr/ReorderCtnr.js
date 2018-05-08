import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import Reorder from '../../components/Reorder/Reorder';

import {
  deletePage,
  updateQuestionOrder,
  moveQuestionToPage,
  clearMoveReorderErrors,
  clearDeletePageError
} from '../../store/api/SurveyPage';
import {
  deleteQuestion,
  clearDeleteQuestionError
} from '../../store/api/SurveyQuestion';
import {
  updatePageOrder,
  deleteSurvey,
  resetErrors,
  fetchSurvey
} from '../../store/api/Survey';
import {
  showDeletePageAlert,
  clearDeletePageAlert,
  showDeleteQuestionAlert,
  clearDeleteQuestionAlert
} from '../../store/ui/Reorder';

export class ReorderCtnr extends React.PureComponent {
  render() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      surveyPageMap
    } = this.props;
    const survey = surveyMap[surveyId];
    let pageOrder = [];
    const questionOrder = {};

    if (survey) {
      pageOrder = survey.pages;

      survey.pages.forEach(pageId => {
        if (!surveyPageMap[pageId]) return;
        const questions = surveyPageMap[pageId].questions;
        questionOrder[pageId] = questions.map(qId => qId);
      });
    }

    if (!pageOrder.length || _.isEmpty(questionOrder)) return null;

    return (
      <Reorder
        {...this.props}
        pageOrder={pageOrder}
        questionOrder={questionOrder}
      />
    );
  }
}

ReorderCtnr.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  surveyPageMap: PropTypes.object,
  updatePageOrder: PropTypes.func,
  updateQuestionOrder: PropTypes.func
};

const mapStateToProps = state => ({
  currentSurveyId: state.Survey.get('currentSurveyId'),
  surveyMap: state.Survey.get('surveyMap').toJS(),
  surveyPageMap: state.SurveyPage.get('surveyPageMap').toJS(),
  surveyQuestionMap: state.SurveyQuestion
    .get('surveyQuestionMap')
    .toJS(),
  reorderQuestionErrors: state.SurveyPage
    .get('reorderQuestionErrors')
    .toJS(),
  moveQuestionErrors: state.SurveyPage
    .get('moveQuestionErrors')
    .toJS(),
  reorderPageErrors: state.Survey.get('reorderPageErrors').toJS(),
  deletePageAlerts: state.Reorder.get('deletePageAlerts').toJS(),
  deletePageErrors: state.SurveyPage.get('deletePageErrors').toJS(),
  deleteQuestionAlerts: state.Reorder
    .get('deleteQuestionAlerts')
    .toJS(),
  deleteQuestionErrors: state.SurveyQuestion
    .get('deleteQuestionErrors')
    .toJS()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  deletePage(surveyId, page, force) {
    dispatch(deletePage(surveyId, page, force)).then(res => {
      if (!res.error) {
        if (force) {
          dispatch(clearDeletePageAlert(page.id));
          const { surveyId } = ownProps.match.params;
          dispatch(fetchSurvey(surveyId));
        }
      }
    });
  },
  deleteQuestion(pageId, questionId, force) {
    dispatch(deleteQuestion(pageId, questionId, force)).then(res => {
      if (!res.error) {
        dispatch(clearDeleteQuestionAlert(questionId));
        if (force) {
          const { surveyId } = ownProps.match.params;
          dispatch(fetchSurvey(surveyId));
        }
      }
    });
  },
  updatePageOrder(surveyId, pageOrder, force) {
    dispatch(updatePageOrder(surveyId, pageOrder, force));
  },
  updateQuestionOrder(pageId, questionOrder, force) {
    dispatch(updateQuestionOrder(pageId, questionOrder, force));
  },
  moveQuestionToPage(
    fromPageId,
    toPageId,
    position,
    questionIds,
    force
  ) {
    dispatch(
      moveQuestionToPage(
        fromPageId,
        toPageId,
        position,
        questionIds,
        force
      )
    ).then(res => {
      if (!res.error) {
        dispatch(clearMoveReorderErrors());
        if (force) {
          const { surveyId } = ownProps.match.params;
          dispatch(fetchSurvey(surveyId));
        }
      }
    });
  },
  deleteSurvey(survey) {
    dispatch(deleteSurvey(survey));
  },
  clearMoveReorderErrors() {
    dispatch(clearMoveReorderErrors());
    dispatch(resetErrors('reorderPageErrors'));
  },
  clearDeletePageError(pageId) {
    dispatch(clearDeletePageError(pageId));
  },
  clearDeleteQuestionError(questionId) {
    dispatch(clearDeleteQuestionError(questionId));
  },
  showDeletePageAlert(pageId) {
    dispatch(showDeletePageAlert(pageId));
  },
  clearDeletePageAlert(pageId) {
    dispatch(clearDeletePageAlert(pageId));
  },
  showDeleteQuestionAlert(questionId) {
    dispatch(showDeleteQuestionAlert(questionId));
  },
  clearDeleteQuestionAlert(questionId) {
    dispatch(clearDeleteQuestionAlert(questionId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ReorderCtnr
);
