import { fromJS } from 'immutable';

////////////
/// Actions

export const SET_ANSWER_TYPE = 'sb-ui/QuestionEditor/SET_ANSWER_TYPE';
export const PROPOSE_QUESTION_TYPE =
  'sb-ui/QuestionEditor/PROPOSE_QUESTION_TYPE';
export const CONFIRM_QUESTION_TYPE =
  'sb-ui/QuestionEditor/CONFIRM_QUESTION_TYPE';
export const CLEAR_TYPE_CHANGE_WARN =
  'sb-ui/QuestionEditor/CLEAR_TYPE_CHANGE_WARN';
export const SHOW_MEDIA_UPLOADER =
  'sb-ui/QuestionEditor/SHOW_MEDIA_UPLOADER';
export const HIDE_MEDIA_UPLOADER =
  'sb-ui/QuestionEditor/HIDE_MEDIA_UPLOADER';

////////////
/// Reducer

const initialState = fromJS({
  answerTypes: {},
  proposedQuestionTypes: {},
  typeChangeWarnings: {},
  openUploaders: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case SET_ANSWER_TYPE: {
      const answerTypes = state.get('answerTypes').toJS();
      answerTypes[meta.questionId] = payload.type;
      return state.set('answerTypes', fromJS(answerTypes));
    }

    case PROPOSE_QUESTION_TYPE: {
      const proposedQuestionTypes = state
        .get('proposedQuestionTypes')
        .toJS();
      const typeChangeWarnings = state
        .get('typeChangeWarnings')
        .toJS();

      proposedQuestionTypes[meta.questionId] = payload.type;
      typeChangeWarnings[meta.questionId] = true;

      return state.merge(
        fromJS({
          proposedQuestionTypes,
          typeChangeWarnings
        })
      );
    }

    case CONFIRM_QUESTION_TYPE: {
      const proposedQuestionTypes = state
        .get('proposedQuestionTypes')
        .toJS();
      const typeChangeWarnings = state
        .get('typeChangeWarnings')
        .toJS();

      delete proposedQuestionTypes[meta.questionId];
      delete typeChangeWarnings[meta.questionId];

      return state.merge(
        fromJS({
          proposedQuestionTypes,
          typeChangeWarnings
        })
      );
    }

    case CLEAR_TYPE_CHANGE_WARN: {
      const typeChangeWarnings = state
        .get('typeChangeWarnings')
        .toJS();
      const proposedQuestionTypes = state
        .get('proposedQuestionTypes')
        .toJS();

      delete typeChangeWarnings[payload.questionId];
      delete proposedQuestionTypes[payload.questionId];

      return state.merge(
        fromJS({
          typeChangeWarnings,
          proposedQuestionTypes
        })
      );
    }

    case SHOW_MEDIA_UPLOADER: {
      const openUploaders = state.get('openUploaders').toJS();
      openUploaders[payload.questionId] = true;
      return state.set('openUploaders', fromJS(openUploaders));
    }

    case HIDE_MEDIA_UPLOADER: {
      const openUploaders = state.get('openUploaders').toJS();
      delete openUploaders[payload.questionId];
      return state.set('openUploaders', fromJS(openUploaders));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const setAnswerType = (questionId, type) => ({
  type: SET_ANSWER_TYPE,
  meta: { questionId },
  payload: { type }
});

export const proposeQuestionType = (questionId, type) => ({
  type: PROPOSE_QUESTION_TYPE,
  meta: { questionId },
  payload: { type }
});

export const confirmQuestionType = questionId => ({
  type: CONFIRM_QUESTION_TYPE,
  meta: { questionId }
});

export const clearTypeChangeWarning = questionId => ({
  type: CLEAR_TYPE_CHANGE_WARN,
  payload: { questionId }
});

export const showMediaUploader = questionId => ({
  type: SHOW_MEDIA_UPLOADER,
  payload: { questionId }
});

export const hideMediaUploader = questionId => ({
  type: HIDE_MEDIA_UPLOADER,
  payload: { questionId }
});
