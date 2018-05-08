import { fromJS } from 'immutable';

import {
  UPDATE_QUESTION_REQUEST,
  UPDATE_QUESTION_SUCCESS
} from '../api/SurveyQuestion';

////////////
/// Actions

export const OPEN_MODAL = 'sb-ui/QuestionOptionModal/OPEN_MODAL';
export const DISMISS_MODAL =
  'sb-ui/QuestionOptionModal DISMISS_MODAL';

export const SET_ANSWER_ANCHOR =
  'sb-ui/QuestionOptionModal/SET_ANSWER_ANCHOR';
export const SET_ANSWER_EXCLUSIVE =
  'sb-ui/QuestionOptionModal/SET_ANSWER_EXCLUSIVE';
export const UPDATE_QUESTION_OPTION =
  'sb-ui/QuestionOptionModal/UPDATE_QUESTION_OPTION';

////////////
/// Reducer

const initialState = fromJS({
  saving: false,
  isOpen: false,
  currentQuestion: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL: {
      return state.merge(
        fromJS({
          isOpen: true,
          currentQuestion: payload
        })
      );
    }

    case DISMISS_MODAL: {
      return state.merge(
        fromJS({
          isOpen: false,
          currentQuestion: {}
        })
      );
    }

    case SET_ANSWER_ANCHOR: {
      const { prop, value, index } = payload;
      const currentQuestion = state.get('currentQuestion').toJS();
      currentQuestion[prop][index].anchored = value;
      return state.merge(fromJS({ currentQuestion }));
    }

    case SET_ANSWER_EXCLUSIVE: {
      const { prop, value, index } = payload;
      const currentQuestion = state.get('currentQuestion').toJS();
      currentQuestion[prop][index].exclusive = value;
      return state.merge(fromJS({ currentQuestion }));
    }

    case UPDATE_QUESTION_OPTION: {
      const { option, value } = payload;
      const question = state.get('currentQuestion').toJS();

      return state.merge(
        fromJS({
          currentQuestion: {
            ...question,
            [option]: value
          }
        })
      );
    }

    case UPDATE_QUESTION_REQUEST: {
      return state.set('saving', true);
    }

    case UPDATE_QUESTION_SUCCESS: {
      return state.merge(
        fromJS({
          saving: false,
          isOpen: false,
          currentQuestion: {}
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openQuestionOptionModal = question => ({
  type: OPEN_MODAL,
  payload: question
});

export const dismissQuestionOptionModal = () => ({
  type: DISMISS_MODAL
});

export const setAnswerAnchor = (prop, value, index) => ({
  type: SET_ANSWER_ANCHOR,
  payload: { prop, value, index }
});

export const setAnswerExclusive = (prop, value, index) => ({
  type: SET_ANSWER_EXCLUSIVE,
  payload: { prop, value, index }
});

export const updateQuestionOption = (option, value) => ({
  type: UPDATE_QUESTION_OPTION,
  payload: { option, value }
});
