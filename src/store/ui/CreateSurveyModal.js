import { fromJS } from 'immutable';

////////////
/// Actions

export const OPEN_MODAL = 'sb-ui/CreateSurveyModal/OPEN_MODAL';
export const DISMISS_MODAL = 'sb-ui/CreateSurveyModal/DISMISS_MODAL';
export const SET_NEXT_PATH = 'sb-ui/CreateSurveyModal/SET_NEXT_PATH';
export const UPDATE_FIELD = 'sb-ui/CreateSurveyModal/UPDATE_FIELD';
export const BLUR_FIELD = 'sb-ui/CreateSurveyModal/BLUR_FIELD';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  nextPath: '/build',
  title: {
    value: '',
    dirty: false,
    touched: false,
    pattern: /^.{1,}$/gi,
    error: ''
  }
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL: {
      return state.set('isOpen', true);
    }

    case DISMISS_MODAL: {
      return state.merge(
        fromJS({
          isOpen: false,
          title: {
            ...state.get('title').toJS(),
            value: '',
            dirty: false,
            touched: false
          }
        })
      );
    }

    case SET_NEXT_PATH: {
      return state.set('nextPath', payload);
    }

    case UPDATE_FIELD: {
      return state.set(
        payload.name,
        fromJS({
          ...state.get(payload.name).toJS(),
          value: payload.value,
          dirty: true,
          touched: false
        })
      );
    }

    case BLUR_FIELD: {
      return state.set(
        payload.name,
        fromJS({
          ...state.get(payload.name).toJS(),
          touched: true
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Action Creators

export const openCreateSurveyModal = () => ({
  type: OPEN_MODAL
});

export const dismissCreateSurveyModal = () => ({
  type: DISMISS_MODAL
});

export const setNextPath = path => ({
  type: SET_NEXT_PATH,
  payload: path
});

export const updateField = field => ({
  type: UPDATE_FIELD,
  payload: field
});

export const blurField = field => ({
  type: BLUR_FIELD,
  payload: field
});
