import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import _ from 'lodash';

import * as schemas from '../../schemas';
import * as utils from '../utils';
import { getRealQuestions } from '../../helpers/TempQuestions';

////////////
/// Actions

import {
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEY_SUCCESS,
  CREATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_SUCCESS,
  DELETE_SURVEY_SUCCESS,
  COPY_SURVEY_SUCCESS
} from './Survey';

import {
  INIT_QUESTION,
  UNINIT_QUESTION,
  REMOVE_TEMP_QUESTIONS,
  CREATE_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS
} from './SurveyQuestion';

export const CREATE_PAGE_REQUEST =
  'sb-ui/SurveyPage/CREATE_PAGE_REQUEST';
export const CREATE_PAGE_ERROR = 'sb-ui/SurveyPage/CREATE_PAGE_ERROR';
export const CREATE_PAGE_SUCCESS =
  'sb-ui/SurveyPage/CREATE_PAGE_SUCCESS';
export const UPDATE_PAGE_REQUEST =
  'sb-ui/Surveypage/UPDATE_PAGE_REQUEST';
export const UPDATE_PAGE_ERROR = 'sb-ui/Surveypage/UPDATE_PAGE_ERROR';
export const UPDATE_PAGE_SUCCESS =
  'sb-ui/Surveypage/UPDATE_PAGE_SUCCESS';
export const DELETE_PAGE_REQUEST =
  'sb-ui/SurveyPage/DELETE_PAGE_REQUEST';
export const DELETE_PAGE_ERROR = 'sb-ui/SurveyPage/DELETE_PAGE_ERROR';
export const DELETE_PAGE_SUCCESS =
  'sb-ui/SurveyPage/DELETE_PAGE_SUCCESS';
export const QUESTION_ORDER_REQUEST =
  'sb-ui/SurveyPage/QUESTION_ORDER_REQUEST';
export const QUESTION_ORDER_SUCCESS =
  'sb-ui/SurveyPage/QUESTION_ORDER_SUCCESS';
export const QUESTION_ORDER_ERROR =
  'sb-ui/SurveyPage/QUESTION_ORDER_ERROR';
export const QUESTION_MOVE_REQUEST =
  'sb-ui/SurveyPage/QUESTION_MOVE_REQUEST';
export const QUESTION_MOVE_SUCCESS =
  'sb-ui/SurveyPage/QUESTION_MOVE_SUCCESS';
export const QUESTION_MOVE_ERROR =
  'sb-ui/SurveyPage/QUESTION_MOVE_ERROR';
export const DELETE_LOGIC_REQUEST =
  'sb-ui/SurveyPage/DELETE_LOGIC_REQUEST';
export const DELETE_LOGIC_SUCCESS =
  'sb-ui/SurveyPage/DELETE_LOGIC_SUCCESS';
export const DELETE_LOGIC_ERROR =
  'sb-ui/SurveyPage/DELETE_LOGIC_ERROR';
export const CLEAR_DELETE_PAGE_ERROR =
  'sb-ui/SurveyPage/CLEAR_DELETE_PAGE_ERROR';
export const CLEAR_MOVE_REORDER_ERRORS =
  'sb-ui/SurveyPage/CLEAR_MOVE_REORDER_ERRORS';

////////////
/// Reducer

const initialState = fromJS({
  surveyPageMap: {},
  fetching: false,
  creatingPages: {},
  createPageErrors: {},
  updatingPages: {},
  updatePageErrors: {},
  deletingPages: {},
  deletePageErrors: {},
  deletingLogic: {},
  deleteLogicErrors: {},
  reorderingQuestions: {},
  reorderQuestionErrors: {},
  movingQuestions: {},
  moveQuestionErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;

  switch (action.type) {
    case CREATE_PAGE_REQUEST: {
      return utils.setRequestFlag(state, 'creatingPages', meta.index);
    }

    case CREATE_PAGE_SUCCESS: {
      const page = payload;
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const creatingPages = state.get('creatingPages').toJS();

      surveyPageMap[page.id] = page;
      delete creatingPages[meta.index];

      return state.merge(
        fromJS({
          creatingPages,
          surveyPageMap
        })
      );
    }

    case CREATE_PAGE_ERROR: {
      const creatingPages = state.get('creatingPages').toJS();
      const createPageErrors = state.get('createPageErrors').toJS();

      delete creatingPages[meta.index];
      createPageErrors[meta.index] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          creatingPages,
          createPageErrors
        })
      );
    }

    case UPDATE_PAGE_REQUEST: {
      return utils.setRequestFlag(
        state,
        'updatingPages',
        meta.pageId
      );
    }

    case UPDATE_PAGE_SUCCESS: {
      const updatingPages = state.get('updatingPages').toJS();
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const normalized = normalize(payload, schemas.surveyPageSchema);
      const { surveyPages: updatedPages } = normalized.entities;

      delete updatingPages[meta.pageId];
      surveyPageMap[meta.pageId] = updatedPages[meta.pageId];

      return state.merge({
        updatingPages,
        surveyPageMap
      });
    }

    case UPDATE_PAGE_ERROR: {
      const updatingPages = state.get('updatingPages').toJS();
      const updatePageErrors = state.get('updatePageErrors').toJS();

      delete updatingPages[meta.pageId];
      updatePageErrors[meta.pageId] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          updatingPages,
          updatePageErrors
        })
      );
    }

    case DELETE_PAGE_REQUEST: {
      return utils.setRequestFlag(
        state,
        'deletingPages',
        meta.pageId
      );
    }

    case DELETE_PAGE_SUCCESS: {
      const pageId = meta.page.id;
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const deletingPages = state.get('deletingPages').toJS();
      const deletePageErrors = state.get('deletePageErrors').toJS();

      delete surveyPageMap[pageId];
      delete deletingPages[pageId];
      delete deletePageErrors[pageId];

      return state.merge(
        fromJS({
          deletingPages,
          surveyPageMap,
          deletePageErrors
        })
      );
    }

    case DELETE_PAGE_ERROR: {
      const deletingPages = state.get('deletingPages').toJS();
      const deletePageErrors = state.get('deletePageErrors').toJS();

      delete deletingPages[meta.pageId];
      deletePageErrors[meta.pageId] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          deletingPages,
          deletePageErrors
        })
      );
    }

    case QUESTION_ORDER_REQUEST: {
      return utils.setRequestFlag(
        state,
        'reorderingQuestions',
        meta.pageId
      );
    }

    case QUESTION_ORDER_SUCCESS: {
      const { pageId } = meta;
      const reorderingQuestions = state
        .get('reorderingQuestions')
        .toJS();
      const surveyPageMap = state.get('surveyPageMap').toJS();

      delete reorderingQuestions[pageId];
      surveyPageMap[pageId].questions = payload.questionOrder;

      return state.merge(
        fromJS({
          reorderingQuestions,
          surveyPageMap
        })
      );
    }

    case QUESTION_ORDER_ERROR: {
      const reorderingQuestions = state
        .get('reorderingQuestions')
        .toJS();
      const reorderQuestionErrors = state
        .get('reorderQuestionErrors')
        .toJS();

      delete reorderingQuestions[meta.pageId];
      reorderQuestionErrors[meta.pageId] = utils.createErrorMap(
        payload
      );

      return state.merge({
        reorderingQuestions,
        reorderQuestionErrors
      });
    }

    case QUESTION_MOVE_REQUEST: {
      const nextState = utils.setRequestFlag(
        state,
        'movingQuestions',
        meta.fromPageId
      );
      return utils.setRequestFlag(
        nextState,
        'movingQuestions',
        meta.toPageId
      );
    }

    case QUESTION_MOVE_SUCCESS: {
      const { fromPageId, toPageId, position } = meta;
      const { questionIds: qIds } = payload;
      const movingQuestions = state.get('movingQuestions').toJS();
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const fromQuestions = surveyPageMap[fromPageId].questions;
      const toQuestions = surveyPageMap[toPageId].questions;

      delete movingQuestions[meta.fromPageId];
      delete movingQuestions[meta.toPageId];
      // had to do some trickery here.
      // http://stackoverflow.com/a/7032717/2800116
      toQuestions.splice.apply(
        toQuestions,
        [position, 0].concat(qIds)
      );
      surveyPageMap[fromPageId].questions = fromQuestions.filter(
        qId => qIds.indexOf(qId) === -1
      );

      return state.merge(
        fromJS({
          movingQuestions,
          surveyPageMap
        })
      );
    }

    case QUESTION_MOVE_ERROR: {
      const movingQuestions = state.get('movingQuestions').toJS();
      const moveQuestionErrors = state
        .get('moveQuestionErrors')
        .toJS();

      delete movingQuestions[meta.fromPageId];
      delete movingQuestions[meta.toPageId];
      moveQuestionErrors[meta.fromPageId] = utils.createErrorMap(
        payload
      );

      return state.merge({
        movingQuestions,
        moveQuestionErrors
      });
    }

    case DELETE_LOGIC_REQUEST: {
      return utils.setRequestFlag(
        state,
        'deletingLogic',
        meta.pageId
      );
    }

    case DELETE_LOGIC_SUCCESS: {
      const deletingLogic = state.get('deletingLogic').toJS();
      const surveyPageMap = state.get('surveyPageMap').toJS();

      delete deletingLogic[meta.pageId];
      delete surveyPageMap[meta.pageId].branchLogic;

      return state.merge(
        fromJS({
          deletingLogic,
          surveyPageMap
        })
      );
    }

    case DELETE_LOGIC_ERROR: {
      const deletingLogic = state.get('deletingLogic').toJS();
      const deleteLogicErrors = state.get('deleteLogicErrors').toJS();

      delete deletingLogic[meta.pageId];
      deleteLogicErrors[meta.pageId] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          deletingLogic,
          deleteLogicErrors
        })
      );
    }

    case CLEAR_DELETE_PAGE_ERROR: {
      const deletePageErrors = state.get('deletePageErrors').toJS();
      delete deletePageErrors[payload.pageId];
      return state.set('deletePageErrors', fromJS(deletePageErrors));
    }

    case CLEAR_MOVE_REORDER_ERRORS: {
      return state.merge(
        fromJS({
          reorderQuestionErrors: {},
          moveQuestionErrors: {}
        })
      );
    }

    ////////////
    /// SIDE EFFECTS FROM EXTERNAL ACTIONS
    /// These actions are actually dispatched by other branches
    /// in the state tree, but this branch also needs to make
    /// some updates when they occur.

    case FETCH_SURVEYS_SUCCESS: {
      const normalized = normalize(payload.content, [
        schemas.surveySchema
      ]);
      const { surveyPages } = normalized.entities;

      const toMerge = { fetching: false };
      if (surveyPages) {
        toMerge.surveyPageMap = surveyPages;
      }

      return state.merge(fromJS(toMerge));
    }

    case FETCH_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyPages } = normalized.entities;

      const surveyPageMap = state
        .get('surveyPageMap')
        .merge(surveyPages);

      const final = state.merge(
        fromJS({
          fetching: false,
          surveyPageMap
        })
      );
      return final;
    }

    case CREATE_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyPages } = normalized.entities;

      return state.merge(
        fromJS({
          surveyPageMap: surveyPages,
          fetching: false
        })
      );
    }

    case DELETE_SURVEY_SUCCESS: {
      const survey = meta.survey;
      const surveyPageMap = state.get('surveyPageMap').toJS();

      if (survey.pages) {
        survey.pages.forEach(pageId => {
          delete surveyPageMap[pageId];
        });
      }

      return state.merge({
        surveyPageMap,
        fetching: false
      });
    }

    case UPDATE_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyPages } = normalized.entities;
      let surveyPageMap = state.get('surveyPageMap').toJS();

      // loop though the new surveyPages to see if there
      // are any empty pages. If there are, we need to
      // copy over questions from surveyPageMap for that page.
      // It's likely those questions are temp questions
      _.each(surveyPages, page => {
        page.questions = page.questions || [];
        const newQuestions = page.questions;
        const oldQuestions = surveyPageMap[page.id].questions;
        if (!newQuestions.length && oldQuestions.length) {
          page.questions = oldQuestions;
        }
      });

      surveyPageMap = Object.assign({}, surveyPageMap, surveyPages);

      return state.merge(
        fromJS({
          surveyPageMap,
          fetching: false
        })
      );
    }

    case COPY_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyPages } = normalized.entities;
      let surveyPageMap = state.get('surveyPageMap');

      surveyPageMap = surveyPageMap.merge(fromJS(surveyPages)).toJS();

      return state.merge(
        fromJS({
          surveyPageMap
        })
      );
    }

    case INIT_QUESTION: {
      const tempId = payload.id;
      const pageId = payload.pageId;
      const index = payload.index;
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const questions = surveyPageMap[pageId].questions;

      if (!index) {
        questions.push(tempId);
      } else {
        questions.splice(index, 0, tempId);
      }

      return state.merge(fromJS({ surveyPageMap }));
    }

    case UNINIT_QUESTION: {
      const tempId = payload.tempId;
      const pageId = payload.pageId;
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const pageQuestions = surveyPageMap[pageId].questions;
      const questionIndex = pageQuestions.indexOf(tempId);

      surveyPageMap[pageId].questions.splice(questionIndex, 1);

      return state.merge(fromJS({ surveyPageMap }));
    }

    case REMOVE_TEMP_QUESTIONS: {
      const surveyPageMap = state.get('surveyPageMap').toJS();

      for (let pId in surveyPageMap) {
        const page = surveyPageMap[pId];
        page.questions = getRealQuestions(page.questions);
      }

      return state.set('surveyPageMap', fromJS(surveyPageMap));
    }

    // when we create a question, we are using
    // a question that was created via initQuestion.
    // This means it created a temporary ID that we used
    // in our arrays and maps which will need to be removed.
    case CREATE_QUESTION_SUCCESS: {
      const question = payload;
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const pageQuestions = surveyPageMap[meta.pageId].questions;
      const PageQuestionIndex = pageQuestions.indexOf(meta.tempId);

      // we just want to swap out the temp ID with the real one.
      pageQuestions.splice(PageQuestionIndex, 1, question.id);

      return state.merge(
        fromJS({
          surveyPageMap,
          fetching: false
        })
      );
    }

    case DELETE_QUESTION_SUCCESS: {
      const { pageId, questionId } = meta;
      const surveyPageMap = state.get('surveyPageMap').toJS();
      const qIndex = surveyPageMap[pageId].questions.indexOf(
        questionId
      );

      surveyPageMap[pageId].questions.splice(qIndex, 1);

      return state.merge(
        fromJS({
          surveyPageMap,
          fetching: false
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Action Creators

export const createPage = (surveyId, index) => {
  let endpoint = `/api/pages?surveyId=${surveyId}`;
  if (index) {
    endpoint += `&position=${index}`;
  }
  return {
    [CALL_API]: {
      endpoint,
      method: 'POST',
      body: JSON.stringify({}),
      types: [
        {
          type: CREATE_PAGE_REQUEST,
          meta: { surveyId, index }
        },
        {
          type: CREATE_PAGE_SUCCESS,
          meta: { surveyId, index }
        },
        {
          type: CREATE_PAGE_ERROR,
          meta: { surveyId, index }
        }
      ]
    }
  };
};

export const updatePage = (pageId, info) => ({
  [CALL_API]: {
    endpoint: `/api/pages/${pageId}`,
    method: 'PATCH',
    body: JSON.stringify(info),
    types: [
      {
        type: UPDATE_PAGE_REQUEST,
        meta: { pageId }
      },
      {
        type: UPDATE_PAGE_SUCCESS,
        meta: { pageId }
      },
      {
        type: UPDATE_PAGE_ERROR,
        meta: { pageId }
      }
    ]
  }
});

export const deletePage = (surveyId, page, force) => ({
  [CALL_API]: {
    endpoint: `/api/pages/${page.id}${force
      ? '?breakReferences=true'
      : ''}`,
    method: 'DELETE',
    types: [
      {
        type: DELETE_PAGE_REQUEST,
        meta: { pageId: page.id }
      },
      {
        type: DELETE_PAGE_SUCCESS,
        meta: { surveyId, page }
      },
      {
        type: DELETE_PAGE_ERROR,
        meta: { pageId: page.id }
      }
    ]
  }
});

export const updateQuestionOrder = (pageId, questionOrder, force) => {
  let endPoint = `/api/pages/${pageId}/questionOrder`;
  if (force) {
    endPoint += `?breakReferences=true`;
  }
  return {
    [CALL_API]: {
      endpoint: endPoint,
      method: 'POST',
      body: JSON.stringify({ ids: questionOrder }),
      types: [
        {
          type: QUESTION_ORDER_REQUEST,
          meta: { pageId }
        },
        {
          type: QUESTION_ORDER_SUCCESS,
          meta: { pageId },
          payload: { questionOrder }
        },
        {
          type: QUESTION_ORDER_ERROR,
          meta: { pageId }
        }
      ]
    }
  };
};

export const moveQuestionToPage = (
  fromPageId,
  toPageId,
  position,
  questionIds,
  force
) => {
  let endPoint = `/api/pages/${fromPageId}/questionMoveRequest?toPage=${toPageId}&position=${position}`;
  if (force) {
    endPoint += `&breakReferences=true`;
  }
  return {
    [CALL_API]: {
      endpoint: endPoint,
      method: 'POST',
      body: JSON.stringify({ ids: questionIds }),
      types: [
        {
          type: QUESTION_MOVE_REQUEST,
          meta: { fromPageId, toPageId }
        },
        {
          type: QUESTION_MOVE_SUCCESS,
          meta: { fromPageId, toPageId, position },
          payload: { questionIds }
        },
        {
          type: QUESTION_MOVE_ERROR,
          meta: { fromPageId, toPageId }
        }
      ]
    }
  };
};

export const deletePageLogic = pageId => ({
  [CALL_API]: {
    endpoint: `/api/pages/${pageId}/branchLogic`,
    method: 'DELETE',
    types: [
      {
        type: DELETE_LOGIC_REQUEST,
        meta: { pageId }
      },
      {
        type: DELETE_LOGIC_SUCCESS,
        meta: { pageId }
      },
      {
        type: DELETE_LOGIC_ERROR,
        meta: { pageId }
      }
    ]
  }
});

export const clearDeletePageError = pageId => ({
  type: CLEAR_DELETE_PAGE_ERROR,
  payload: { pageId }
});

export const clearMoveReorderErrors = () => ({
  type: CLEAR_MOVE_REORDER_ERRORS
});
