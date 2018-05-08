import { fromJS } from 'immutable';

////////////
/// Actions

import { FETCH_SURVEY_SUCCESS } from '../api/Survey';
import {
  DELETE_PAGE_SUCCESS,
  DELETE_LOGIC_SUCCESS
} from '../api/SurveyPage';

export const OPEN_EDITOR = 'sb-ui/PageLogic/OPEN_EDITOR';
export const CLOSE_EDITOR = 'sb-ui/PageLogic/CLOSE_EDITOR';
export const CREATE_PAGE_LOGIC = 'sb-ui/PageLogic/CREATE_PAGE_LOGIC';
export const DELETE_PAGE_LOGIC = 'sb-ui/PageLogic/DELETE_PAGE_LOGIC';
export const SET_DEFAULT_PAGE = 'sb-ui/PageLogic/SET_DEFAULT_PAGE';
export const CREATE_BRANCH = 'sb-ui/PageLogic/CREATE_BRANCH';
export const UPDATE_BRANCH = 'sb-ui/PageLogic/UPDATE_BRANCH';
export const DELETE_BRANCH = 'sb-ui/PageLogic/DELETE_BRANCH';
export const CREATE_CONDITION = 'sb-ui/PageLogic/CREATE_CONDITION';
export const UPDATE_CONDITION = 'sb-ui/PageLogic/UPDATE_CONDITION';
export const DELETE_CONDITION = 'sb-ui/PageLogic/DELETE_CONDITION';
export const VALIDATE_LOGIC = 'sb-ui/PageLogic/VALIDATE_LOGIC';
export const RESET_PAGE_LOGIC = 'sb-ui/PageLogic/RESET_PAGE_LOGIC';

////////////
/// Reducer

const initialState = fromJS({
  isEditing: {},
  pageLogic: {},
  pageLogicErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case OPEN_EDITOR: {
      const isEditing = state.get('isEditing').toJS();
      isEditing[payload.pageId] = true;
      return state.set('isEditing', fromJS(isEditing));
    }

    case CLOSE_EDITOR: {
      const isEditing = state.get('isEditing').toJS();
      delete isEditing[payload.pageId];
      return state.set('isEditing', fromJS(isEditing));
    }

    case CREATE_PAGE_LOGIC: {
      const isEditing = state.get('isEditing').toJS();
      const pageLogic = state.get('pageLogic').toJS();

      isEditing[meta.pageId] = true;
      pageLogic[meta.pageId] = payload || {};

      return state.merge(
        fromJS({
          isEditing,
          pageLogic
        })
      );
    }

    case SET_DEFAULT_PAGE: {
      const pageLogic = state.get('pageLogic').toJS();
      pageLogic[meta.pageId].defaultPage = payload.destPageId;
      return state.set('pageLogic', fromJS(pageLogic));
    }

    case CREATE_BRANCH: {
      const pageLogic = state.get('pageLogic').toJS();

      const branchStatements =
        pageLogic[meta.pageId].branchStatements || [];
      branchStatements.push({
        destinationPageId: '',
        conditions: [
          {
            questionId: '',
            answerId: '',
            selected: true
          }
        ]
      });
      pageLogic[meta.pageId].branchStatements = branchStatements;

      return state.set('pageLogic', fromJS(pageLogic));
    }

    case UPDATE_BRANCH: {
      const pageLogic = state.get('pageLogic').toJS();
      const branchStatements =
        pageLogic[meta.pageId].branchStatements;
      branchStatements[meta.index][meta.propName] = payload;
      return state.set('pageLogic', fromJS(pageLogic));
    }

    case DELETE_BRANCH: {
      const pageLogic = state.get('pageLogic').toJS();
      const branchStatements =
        pageLogic[meta.pageId].branchStatements;
      branchStatements.splice(meta.index, 1);
      return state.set('pageLogic', fromJS(pageLogic));
    }

    case CREATE_CONDITION: {
      let pageLogic = state.get('pageLogic').toJS();
      const conditions =
        pageLogic[meta.pageId].branchStatements[meta.branchIndex]
          .conditions;

      const newCondition = {
        questionId: '',
        answerId: '',
        selected: true
      };
      if (conditions.length >= 1) {
        newCondition.operator = 'AND';
      }
      conditions.push(newCondition);

      return state.set('pageLogic', fromJS(pageLogic));
    }

    case UPDATE_CONDITION: {
      let pageLogic = state.get('pageLogic').toJS();
      const condition =
        pageLogic[meta.pageId].branchStatements[meta.branchIndex]
          .conditions[meta.conditionIndex];

      // clear answer BEFORE updating questionId
      if (
        meta.propName === 'questionId' &&
        condition.questionId !== payload
      ) {
        condition.answerId = '';
      }
      condition[meta.propName] = payload;

      return state.set('pageLogic', fromJS(pageLogic));
    }

    case DELETE_CONDITION: {
      const pageLogic = state.get('pageLogic').toJS();
      const conditions =
        pageLogic[meta.pageId].branchStatements[meta.branchIndex]
          .conditions;
      conditions.splice(meta.conditionIndex, 1);

      // remove any operator that might exist if we
      // removed the first condition.
      if (conditions[0] && conditions[0].operator) {
        delete conditions[0].operator;
      }

      return state.set('pageLogic', fromJS(pageLogic));
    }

    case VALIDATE_LOGIC: {
      const pageLogicErrors = state.get('pageLogicErrors').toJS();
      const pageLogic = state.get('pageLogic').toJS();
      const branches = pageLogic[meta.pageId].branchStatements;

      if (branches) {
        // get ready to store errors
        pageLogicErrors[meta.pageId] = { branchStatements: [] };
        const pageErrors = pageLogicErrors[meta.pageId];

        // look for errors and mirror the logic map when storing
        let hasError;
        branches.forEach((branch, i) => {
          pageErrors.branchStatements[i] = {
            conditions: []
          };
          const branchErrors = pageErrors.branchStatements[i];
          if (!branch.destinationPageId) {
            branchErrors.destinationPageId = 'required';
            hasError = true;
          }

          if (!branch.conditions.length) {
            branchErrors.conditions = 'required';
            hasError = true;
          } else {
            branch.conditions.forEach((cond, j) => {
              branchErrors.conditions[j] = {};
              const conditionErrors = branchErrors.conditions[j];
              if (!cond.questionId) {
                conditionErrors.questionId = 'required';
                hasError = true;
              }
              if (!cond.answerId) {
                conditionErrors.answerId = 'required';
                hasError = true;
              }
            });
          }
        });

        // if no errors found, delete preparations we made
        if (!hasError) {
          delete pageLogicErrors[meta.pageId];
        }
      }

      return state.set('pageLogicErrors', fromJS(pageLogicErrors));
    }

    case RESET_PAGE_LOGIC: {
      const isEditing = state.get('isEditing').toJS();
      const pageLogic = state.get('pageLogic').toJS();

      delete isEditing[meta.pageId];
      delete pageLogic[meta.pageId];

      return state.merge(
        fromJS({
          isEditing,
          pageLogic
        })
      );
    }

    ////////////
    /// Survey Side-Effects

    case FETCH_SURVEY_SUCCESS: {
      const pageLogic = state.get('pageLogic').toJS();
      const survey = payload;
      survey.pages.forEach(page => {
        if (page.branchLogic) {
          pageLogic[page.id] = page.branchLogic;
        }
      });
      return state.set('pageLogic', fromJS(pageLogic));
    }

    ////////////
    /// Survey Page Side Effects

    case DELETE_PAGE_SUCCESS: {
      const pageLogic = state.get('pageLogic').toJS();
      delete pageLogic[meta.page.id];
      return state.set('pageLogic', fromJS(pageLogic));
    }

    case DELETE_LOGIC_SUCCESS: {
      const isEditing = state.get('isEditing').toJS();
      const pageLogic = state.get('pageLogic').toJS();

      delete isEditing[meta.pageId];
      delete pageLogic[meta.pageId];

      return state.merge(
        fromJS({
          isEditing,
          pageLogic
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openEditor = pageId => ({
  type: OPEN_EDITOR,
  payload: { pageId }
});

export const closeEditor = pageId => ({
  type: CLOSE_EDITOR,
  payload: { pageId }
});

export const createPageLogic = (pageId, pageLogic) => ({
  type: CREATE_PAGE_LOGIC,
  meta: { pageId },
  payload: pageLogic
});

export const setDefaultPage = (pageId, destPageId) => ({
  type: SET_DEFAULT_PAGE,
  meta: { pageId },
  payload: { destPageId }
});

export const createBranch = pageId => ({
  type: CREATE_BRANCH,
  meta: { pageId }
});

export const updateBranch = (pageId, index, propName, value) => ({
  type: UPDATE_BRANCH,
  meta: { pageId, index, propName },
  payload: value
});

export const deleteBranch = (pageId, index) => ({
  type: DELETE_BRANCH,
  meta: { pageId, index }
});

export const createCondition = (pageId, branchIndex, condition) => ({
  type: CREATE_CONDITION,
  meta: { pageId, branchIndex },
  payload: condition
});

export const updateCondition = (
  pageId,
  branchIndex,
  conditionIndex,
  propName,
  value
) => ({
  type: UPDATE_CONDITION,
  meta: { pageId, branchIndex, conditionIndex, propName },
  payload: value
});

export const deleteCondition = (
  pageId,
  branchIndex,
  conditionIndex
) => ({
  type: DELETE_CONDITION,
  meta: { pageId, branchIndex, conditionIndex }
});

export const validateLogic = pageId => ({
  type: VALIDATE_LOGIC,
  meta: { pageId }
});

export const resetPageLogic = pageId => ({
  type: RESET_PAGE_LOGIC,
  meta: { pageId }
});
