import { fromJS } from 'immutable';

////////////
/// Actions

export const OPEN_EDITOR = 'sb-ui/TerminatePage/OPEN_EDITOR';
export const CLOSE_EDITOR = 'sb-ui/TerminatePage/CLOSE_EDITOR';
export const TOGGLE_INCLUDE_PARAMS =
  'sb-ui/TerminatePage/TOGGLE_INCLUDE_PARAMS';
export const UPDATE_TERMINATE_PAGE =
  'sb-ui/TerminatePage/UPDATE_TERMINATE_PAGE';
export const SET_ERRORS = 'sb-ui/TerminatePage/SET_ERRORS';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  terminateType: 'message',
  message:
    'Thank you for participating!\nWe greatly value your opinion.',
  redirectUrl: '',
  includeParams: true,
  editorErrors: []
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_EDITOR: {
      return state.set('isOpen', true);
    }

    case CLOSE_EDITOR: {
      return state.set('isOpen', false);
    }

    case UPDATE_TERMINATE_PAGE: {
      return state.set(payload.param, payload.value);
    }

    case SET_ERRORS: {
      return state.set('editorErrors', fromJS(payload));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openEditor = () => ({
  type: OPEN_EDITOR
});

export const closeEditor = () => ({
  type: CLOSE_EDITOR
});

export const updateTerminatePage = (param, value) => ({
  type: UPDATE_TERMINATE_PAGE,
  payload: { param, value }
});

export const setErrors = errors => ({
  type: SET_ERRORS,
  payload: errors
});
