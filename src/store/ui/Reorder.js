import { fromJS } from 'immutable';

////////////
/// Actions

export const SHOW_DELETE_PAGE_ALERT =
  'sb-ui/Reorder/SHOW_DELETE_PAGE_ALERT';
export const SHOW_DELETE_QUESTION_ALERT =
  'sb-ui/Reorder/SHOW_DELETE_QUESTION_ALERT';
export const CLEAR_DELETE_PAGE_ALERT =
  'sb-ui/Reorder/CLEAR_DELETE_PAGE_ALERT';
export const CLEAR_DELETE_QUESTION_ALERT =
  'sb-ui/Reorder/CLEAR_DELETE_QUESTION_ALERT';

////////////
/// Reducer

const initialState = fromJS({
  deletePageAlerts: {},
  deleteQuestionAlerts: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case SHOW_DELETE_PAGE_ALERT: {
      const deletePageAlerts = state.get('deletePageAlerts').toJS();
      deletePageAlerts[payload.pageId] = true;
      return state.set('deletePageAlerts', fromJS(deletePageAlerts));
    }

    case CLEAR_DELETE_PAGE_ALERT: {
      const deletePageAlerts = state.get('deletePageAlerts').toJS();
      delete deletePageAlerts[payload.pageId];
      return state.set('deletePageAlerts', fromJS(deletePageAlerts));
    }

    case SHOW_DELETE_QUESTION_ALERT: {
      const deleteQuestionAlerts = state
        .get('deleteQuestionAlerts')
        .toJS();
      deleteQuestionAlerts[payload.questionId] = true;
      return state.set(
        'deleteQuestionAlerts',
        fromJS(deleteQuestionAlerts)
      );
    }

    case CLEAR_DELETE_QUESTION_ALERT: {
      const deleteQuestionAlerts = state
        .get('deleteQuestionAlerts')
        .toJS();
      delete deleteQuestionAlerts[payload.questionId];
      return state.set(
        'deleteQuestionAlerts',
        fromJS(deleteQuestionAlerts)
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const showDeletePageAlert = pageId => ({
  type: SHOW_DELETE_PAGE_ALERT,
  payload: { pageId }
});

export const clearDeletePageAlert = pageId => ({
  type: CLEAR_DELETE_PAGE_ALERT,
  payload: { pageId }
});

export const showDeleteQuestionAlert = questionId => ({
  type: SHOW_DELETE_QUESTION_ALERT,
  payload: { questionId }
});

export const clearDeleteQuestionAlert = questionId => ({
  type: CLEAR_DELETE_QUESTION_ALERT,
  payload: { questionId }
});
