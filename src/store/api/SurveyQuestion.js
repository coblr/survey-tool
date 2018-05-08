import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import _ from 'lodash';

import * as schemas from '../../schemas';
import * as utils from '../utils';
import * as helpers from '../../helpers/TempQuestions';

////////////
/// Actions

import { DELETE_PAGE_SUCCESS } from './SurveyPage';
import {
  FETCH_SURVEYS_SUCCESS,
  FETCH_SURVEY_SUCCESS,
  UPDATE_SURVEY_SUCCESS,
  DELETE_SURVEY_SUCCESS,
  COPY_SURVEY_SUCCESS
} from './Survey';

export const INIT_QUESTION = 'sb-ui/SurveyQuestion/INIT_QUESTION';
export const UNINIT_QUESTION = 'sb-ui/SurveyQuestion/UNINIT_QUESTION';
export const CREATE_QUESTION_REQUEST =
  'sb-ui/SurveyQuestion/CREATE_QUESTION_REQUEST';
export const CREATE_QUESTION_ERROR =
  'sb-ui/SurveyQuestion/CREATE_QUESTION_ERROR';
export const CREATE_QUESTION_SUCCESS =
  'sb-ui/SurveyQuestion/CREATE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_REQUEST =
  'sb-ui/SurveyQuestion/UPDATE_QUESTION_REQUEST';
export const UPDATE_QUESTION_ERROR =
  'sb-ui/SurveyQuestion/UPDATE_QUESTION_ERROR';
export const UPDATE_QUESTION_SUCCESS =
  'sb-ui/SurveyQuestion/UPDATE_QUESTION_SUCCESS';
export const DELETE_QUESTION_REQUEST =
  'sb-ui/SurveyQuestion/DELETE_QUESTION_REQUEST';
export const DELETE_QUESTION_ERROR =
  'sb-ui/SurveyQuestion/DELETE_QUESTION_ERROR';
export const DELETE_QUESTION_SUCCESS =
  'sb-ui/SurveyQuestion/DELETE_QUESTION_SUCCESS';
export const OPEN_QUESTION_EDITOR =
  'sb-ui/SurveyQuestion/OPEN_QUESTION_EDITOR';
export const EXIT_QUESTION_EDITOR =
  'sb-ui/SurveyQuestion/EXIT_QUESTION_EDITOR';
export const EXPAND_QUESTION = 'sb-ui/SurveyQuestion/EXPAND_QUESTION';
export const COLLAPSE_QUESTION =
  'sb-ui/SurveyQuestion/COLLAPSE_QUESTION';
export const EXPAND_ALL_QUESTIONS =
  'sb-ui/SurveyQuestion/EXPAND_ALL_QUESTIONS';
export const COLLAPSE_ALL_QUESTIONS =
  'sb-ui/SurveyQuestion/COLLAPSE_ALL_QUESTIONS';
export const REMOVE_TEMP_QUESTIONS =
  'sb-ui/SurveyQuestion/REMOVE_TEMP_QUESTIONS';
export const CLEAR_DELETE_QUESTION_ERROR =
  'sb-ui/SurveyQuestion/CLEAR_DELETE_QUESTION_ERROR';
export const UPLOAD_IMAGE_REQUEST =
  'sb-ui/SurveyQuestion/UPLOAD_IMAGE_REQUEST';
export const UPLOAD_IMAGE_SUCCESS =
  'sb-ui/SurveyQuestion/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_ERROR =
  'sb-ui/SurveyQuestion/UPLOAD_IMAGE_ERROR';

////////////
/// Reducer

const initialState = fromJS({
  surveyQuestionMap: {},
  creatingQuestions: {},
  createQuestionErrors: {},
  updatingQuestions: {},
  updateQuestionErrors: {},
  deletingQuestions: {},
  deleteQuestionErrors: {},
  editingQuestions: {},
  collapsedQuestions: {},
  uploadingMedia: {},
  uploadMediaErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case INIT_QUESTION: {
      const tempId = payload.id;
      const pageId = payload.pageId;
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();
      const editingQuestions = state.get('editingQuestions').toJS();

      // because this can be called from both a DidMount() and a
      // DidUpdate(), and temp IDs are timestamps; we need to make
      // sure that pages only have one temp question and it's the
      // most recent result of initQuestion. Previous inits
      // for the same page should be removed or else the ID of the
      // first temp question will hold the page hostage from future
      // initQuestion calls and pages will display without any questions.
      _.each(surveyQuestionMap, question => {
        const isTemp = helpers.isTempQuestion(question.id);
        if (isTemp && question.pageId === pageId) {
          delete surveyQuestionMap[question.id];
          delete editingQuestions[question.id];
        }
      });

      surveyQuestionMap[tempId] = { id: tempId, pageId };
      editingQuestions[tempId] = true;

      return state.merge(
        fromJS({
          surveyQuestionMap,
          editingQuestions
        })
      );
    }

    case UNINIT_QUESTION: {
      const tempId = payload.tempId;
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();
      delete surveyQuestionMap[tempId];
      return state.merge(fromJS({ surveyQuestionMap }));
    }

    case REMOVE_TEMP_QUESTIONS: {
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();
      const editingQuestions = state.get('editingQuestions').toJS();
      const keys = Object.keys(surveyQuestionMap);

      keys.forEach(qId => {
        if (helpers.isTempQuestion(qId)) {
          delete surveyQuestionMap[qId];
          delete editingQuestions[qId];
        }
      });

      return state.merge(
        fromJS({
          surveyQuestionMap,
          editingQuestions
        })
      );
    }

    case CREATE_QUESTION_REQUEST: {
      return utils.setRequestFlag(
        state,
        'creatingQuestions',
        meta.tempId
      );
    }

    case CREATE_QUESTION_SUCCESS: {
      const question = payload;
      const editingQuestions = state.get('editingQuestions').toJS();
      const creatingQuestions = state.get('creatingQuestions').toJS();
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();

      // replace temp question with actual question
      delete editingQuestions[meta.tempId];
      delete creatingQuestions[meta.tempId];
      delete surveyQuestionMap[meta.tempId];
      surveyQuestionMap[question.id] = question;

      return state.merge(
        fromJS({
          editingQuestions,
          creatingQuestions,
          surveyQuestionMap
        })
      );
    }

    case CREATE_QUESTION_ERROR: {
      const creatingQuestions = state.get('creatingQuestions').toJS();
      const createQuestionErrors = state
        .get('createQuestionErrors')
        .toJS();

      delete creatingQuestions[meta.tempId];
      createQuestionErrors[meta.tempId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          creatingQuestions,
          createQuestionErrors
        })
      );
    }

    case UPDATE_QUESTION_REQUEST: {
      return utils.setRequestFlag(
        state,
        'updatingQuestions',
        meta.questionId
      );
    }

    case UPDATE_QUESTION_SUCCESS: {
      const question = payload;
      const editingQuestions = state.get('editingQuestions').toJS();
      const updatingQuestions = state.get('updatingQuestions').toJS();
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();
      const updateQuestionErrors = state
        .get('updateQuestionErrors')
        .toJS();

      delete editingQuestions[meta.questionId];
      delete updatingQuestions[meta.questionId];
      surveyQuestionMap[question.id] = question;
      delete updateQuestionErrors[question.id];

      return state.merge(
        fromJS({
          editingQuestions,
          updatingQuestions,
          surveyQuestionMap,
          updateQuestionErrors
        })
      );
    }

    case UPDATE_QUESTION_ERROR: {
      const updatingQuestions = state.get('updatingQuestions').toJS();
      const updateQuestionErrors = state
        .get('updateQuestionErrors')
        .toJS();

      delete updatingQuestions[meta.questionId];
      updateQuestionErrors[meta.questionId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          updatingQuestions,
          updateQuestionErrors
        })
      );
    }

    case DELETE_QUESTION_REQUEST: {
      return utils.setRequestFlag(
        state,
        'deletingQuestions',
        meta.questionId
      );
    }

    case DELETE_QUESTION_SUCCESS: {
      const deletingQuestions = state.get('deletingQuestions').toJS();
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();
      const deleteQuestionErrors = state
        .get('deleteQuestionErrors')
        .toJS();

      delete deletingQuestions[meta.questionId];
      delete surveyQuestionMap[meta.questionId];
      delete deleteQuestionErrors[meta.questionId];

      return state.merge(
        fromJS({
          deletingQuestions,
          surveyQuestionMap,
          deleteQuestionErrors
        })
      );
    }

    case DELETE_QUESTION_ERROR: {
      const deletingQuestions = state.get('deletingQuestions').toJS();
      const deleteQuestionErrors = state
        .get('deleteQuestionErrors')
        .toJS();

      delete deletingQuestions[meta.questionId];
      deleteQuestionErrors[meta.questionId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          deletingQuestions,
          deleteQuestionErrors
        })
      );
    }

    case OPEN_QUESTION_EDITOR: {
      const questionId = payload;
      const editingQuestions = state.get('editingQuestions').toJS();
      editingQuestions[questionId] = true;
      return state.merge(fromJS({ editingQuestions }));
    }

    case EXIT_QUESTION_EDITOR: {
      const questionId = payload;
      const editingQuestions = state.get('editingQuestions').toJS();
      delete editingQuestions[questionId];
      return state.merge(fromJS({ editingQuestions }));
    }

    case EXPAND_QUESTION: {
      const questionId = payload;
      const collapsedQuestions = state
        .get('collapsedQuestions')
        .toJS();
      delete collapsedQuestions[questionId];
      return state.merge(fromJS({ collapsedQuestions }));
    }

    case COLLAPSE_QUESTION: {
      const questionId = payload;
      const collapsedQuestions = state
        .get('collapsedQuestions')
        .toJS();
      collapsedQuestions[questionId] = true;
      return state.merge(fromJS({ collapsedQuestions }));
    }

    case EXPAND_ALL_QUESTIONS: {
      return state.set('collapsedQuestions', fromJS({}));
    }

    case COLLAPSE_ALL_QUESTIONS: {
      const questions = state.get('surveyQuestionMap').toJS();
      const collapsedQuestions = {};
      Object.keys(questions).forEach(qId => {
        collapsedQuestions[qId] = true;
      });
      return state.set(
        'collapsedQuestions',
        fromJS(collapsedQuestions)
      );
    }

    case CLEAR_DELETE_QUESTION_ERROR: {
      const deleteQuestionErrors = state
        .get('deleteQuestionErrors')
        .toJS();
      delete deleteQuestionErrors[payload.questionId];
      return state.set(
        'deleteQuestionErrors',
        fromJS(deleteQuestionErrors)
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
      const { surveyQuestions } = normalized.entities;

      const toMerge = {};
      if (surveyQuestions) {
        toMerge.surveyQuestionMap = surveyQuestions;
      }

      return state.merge(fromJS(toMerge));
    }

    case FETCH_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyQuestions } = normalized.entities;

      const surveyQuestionMap = state
        .get('surveyQuestionMap')
        .merge(surveyQuestions);

      const final = state.merge(
        fromJS({
          surveyQuestionMap
        })
      );
      return final;
    }

    case DELETE_SURVEY_SUCCESS: {
      const survey = meta.survey;
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();

      if (survey.pages) {
        for (let a = 0; a < survey.pages.length; a++) {
          const page = survey.pages[a];
          if (page.questions) {
            for (let b = 0; b < page.questions.length; b++) {
              delete surveyQuestionMap[
                survey.pages[a].questions[b].id
              ];
            }
          }
        }
      }

      return state.merge(
        fromJS({
          surveyQuestionMap
        })
      );
    }

    case UPDATE_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyQuestions } = normalized.entities;
      let surveyQuestionMap = state.get('surveyQuestionMap');

      surveyQuestionMap = surveyQuestionMap
        .merge(fromJS(surveyQuestions))
        .toJS();

      return state.merge(
        fromJS({
          surveyQuestionMap
        })
      );
    }

    case COPY_SURVEY_SUCCESS: {
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveyQuestions } = normalized.entities;
      let surveyQuestionMap = state.get('surveyQuestionMap');

      surveyQuestionMap = surveyQuestionMap
        .merge(fromJS(surveyQuestions))
        .toJS();

      return state.merge(
        fromJS({
          surveyQuestionMap
        })
      );
    }

    case DELETE_PAGE_SUCCESS: {
      const page = meta.page;
      const pageQuestions = page.questions;
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();

      pageQuestions.forEach(qId => delete surveyQuestionMap[qId]);

      return state.merge(
        fromJS({
          surveyQuestionMap
        })
      );
    }

    case UPLOAD_IMAGE_REQUEST: {
      return utils.setRequestFlag(
        state,
        'uploadingMedia',
        meta.questionId
      );
    }

    case UPLOAD_IMAGE_SUCCESS: {
      // temp
      payload.originalName = 'my_upload.jpg';
      payload.uploadKey = 'abc123-987654-xyza-500vy';

      const uploadingMedia = state.get('uploadingMedia').toJS();
      const surveyQuestionMap = state.get('surveyQuestionMap').toJS();

      const key = payload.uploadKey;
      const fileName = payload.originalName;
      const type = fileName.substr(fileName.lastIndexOf('.') + 1);
      const imageTag = `[[image key=${key} type=${type} size=${meta.mediaSize}]]`;

      delete uploadingMedia[meta.questionId];
      surveyQuestionMap[meta.questionId].text += ` ${imageTag}`;

      return state.merge(
        fromJS({
          uploadingMedia,
          surveyQuestionMap
        })
      );
    }

    case UPLOAD_IMAGE_ERROR: {
      const uploadingMedia = state.get('uploadingMedia').toJS();
      const uploadMediaErrors = state.get('uploadMediaErrors').toJS();

      delete uploadingMedia[meta.questionId];
      uploadMediaErrors[meta.questionId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          uploadingMedia,
          uploadMediaErrors
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Action Creators

// to show the proper UI for creating a question
// we need to have a question object to save to.
// This init function is for creating a question
// object with a temporary ID to use for this purpose.
// The temporary ID makes it easier to use, and it
// will be replaced with a proper ID on create succcess.
// We could just use UNIX time, but having a colon (:)
// character in the string makes it easy to sniff out.
// By stringifying new Date(), we get millis resolution and
// we also get our : character. Best of both.
export const initQuestion = (pageId, index) => ({
  type: INIT_QUESTION,
  payload: {
    id: helpers.generateTempId(),
    pageId,
    index
  }
});

export const uninitQuestion = (pageId, tempId) => ({
  type: UNINIT_QUESTION,
  payload: {
    pageId,
    tempId
  }
});

export const removeTempQuestions = () => ({
  type: REMOVE_TEMP_QUESTIONS
});

export const createQuestion = (pageId, question, index) => {
  let endpoint = `/api/questions?pageId=${pageId}`;
  if (index) {
    endpoint += `&position=${index}`;
  }

  return {
    [CALL_API]: {
      endpoint,
      method: 'POST',
      body: JSON.stringify(question),
      types: [
        {
          type: CREATE_QUESTION_REQUEST,
          meta: { tempId: question.id }
        },
        {
          type: CREATE_QUESTION_SUCCESS,
          // the question.id is that tempId that
          // we setup in initQuestion. This is
          // needed here to erase it from state.
          meta: { pageId, tempId: question.id }
        },
        {
          type: CREATE_QUESTION_ERROR,
          meta: { tempId: question.id }
        }
      ]
    }
  };
};

export const updateQuestion = (question, force) => {
  delete question.surveyId;
  delete question.created;
  delete question.lastModified;

  let endpoint = `/api/questions/${question.id}`;
  if (force) {
    endpoint += '?breakReferences=true';
  }

  return {
    [CALL_API]: {
      endpoint: endpoint,
      method: 'PUT',
      body: JSON.stringify(question),
      types: [
        {
          type: UPDATE_QUESTION_REQUEST,
          meta: { questionId: question.id }
        },
        {
          type: UPDATE_QUESTION_SUCCESS,
          meta: { questionId: question.id }
        },
        {
          type: UPDATE_QUESTION_ERROR,
          meta: { questionId: question.id }
        }
      ]
    }
  };
};

export const deleteQuestion = (pageId, questionId, force) => ({
  [CALL_API]: {
    endpoint: `/api/questions/${questionId}${force
      ? '?breakReferences=true'
      : ''}`,
    method: 'DELETE',
    types: [
      {
        type: DELETE_QUESTION_REQUEST,
        meta: { pageId, questionId }
      },
      {
        type: DELETE_QUESTION_SUCCESS,
        meta: { pageId, questionId }
      },
      {
        type: DELETE_QUESTION_ERROR,
        meta: { pageId, questionId }
      }
    ]
  }
});

export const openQuestionEditor = questionId => ({
  type: OPEN_QUESTION_EDITOR,
  payload: questionId
});

export const closeQuestionEditor = questionId => ({
  type: EXIT_QUESTION_EDITOR,
  payload: questionId
});

export const expandQuestion = questionId => ({
  type: EXPAND_QUESTION,
  payload: questionId
});

export const collapseQuestion = questionId => ({
  type: COLLAPSE_QUESTION,
  payload: questionId
});

export const expandAllQuestions = () => ({
  type: EXPAND_ALL_QUESTIONS
});

export const collapseAllQuestions = () => ({
  type: COLLAPSE_ALL_QUESTIONS
});

export const clearDeleteQuestionError = questionId => ({
  type: CLEAR_DELETE_QUESTION_ERROR,
  payload: { questionId }
});

export const uploadQuestionImage = (questionId, file, mediaSize) => {
  const payload = new FormData();
  payload.append('file', file, file.name);

  return {
    [CALL_API]: {
      endpoint: `/api/questions/${questionId}/images`,
      method: 'POST',
      body: payload,
      headers: {
        // we do not include content-type because the
        // browser will automatically add the correct
        // one and even include the boundary token.
        'Content-Type': 'IGNORE'
      },
      types: [
        {
          type: UPLOAD_IMAGE_REQUEST,
          meta: { questionId, mediaSize }
        },
        {
          type: UPLOAD_IMAGE_SUCCESS,
          meta: { questionId, mediaSize }
        },
        {
          type: UPLOAD_IMAGE_SUCCESS,
          meta: { questionId, mediaSize }
        }
      ]
    }
  };
};
