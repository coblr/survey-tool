import { fromJS } from 'immutable';

////////////
/// Actions

const OPEN_MODAL = 'sb-ui/TextResponseModal/OPEN_MODAL';
const DISMISS_MODAL = 'sb-ui/TextResponseModal/DISMISS_MODAL';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  question: {},
  answer: {},
  filterId: ''
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL: {
      return state.merge(
        fromJS({
          isOpen: true,
          question: payload.question,
          answer: payload.answer,
          filterId: payload.filterId
        })
      );
    }

    case DISMISS_MODAL: {
      return initialState;
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openTextResponseModal = (
  question,
  answer,
  filterId
) => ({
  type: OPEN_MODAL,
  payload: { question, answer, filterId }
});

export const dismissTextResponseModal = () => ({
  type: DISMISS_MODAL
});
