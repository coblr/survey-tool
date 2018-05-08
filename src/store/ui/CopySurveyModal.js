import { fromJS } from 'immutable';

////////////
/// Actions

const OPEN_MODAL = 'sb-ui/CopySurveyModal/OPEN_MODAL';
const DISMISS_MODAL = 'sb-ui/CopySurveyModal/DISMISS_MODAL';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  surveyTitle: ''
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL: {
      return state.merge(
        fromJS({
          isOpen: true,
          surveyTitle: `Copy of ${payload.title}`
        })
      );
    }

    case DISMISS_MODAL: {
      return state.set('isOpen', false);
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openCopySurveyModal = title => ({
  type: OPEN_MODAL,
  payload: { title }
});

export const dismissCopySurveyModal = () => ({
  type: DISMISS_MODAL
});
