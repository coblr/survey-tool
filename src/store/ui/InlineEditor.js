import { fromJS } from 'immutable';

////////////
/// Actions

export const errorText = {
  notEmpty: `This field cannot be empty. Press esc to revert changes.`,
  notSpaces: `This field cannot be empty, spaces don't count.`,
  tooLong: `The max length for this field is %MAX_LENGTH% characters.`
};

export const SHOW_EDITOR = 'sb-ui/InlineEditor/SHOW_EDITOR';
export const HIDE_EDITOR = 'sb-ui/InlineEditor/HIDE_EDITOR';
export const UPDATE_VALUE = 'sb-ui/InlineEditor/UPDATE_VALUE';
export const VALIDATE_VALUE = 'sb-ui/InlineEditor/VALIDATE_VALUE';

////////////
/// Reducer

const initialState = fromJS({
  isEditing: {},
  updatedValues: {},
  editorErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case SHOW_EDITOR: {
      const isEditing = state.get('isEditing').toJS();
      isEditing[payload.editorId] = true;
      return state.set('isEditing', fromJS(isEditing));
    }

    case HIDE_EDITOR: {
      const isEditing = state.get('isEditing').toJS();
      const editorErrors = state.get('editorErrors').toJS();
      const updatedValues = state.get('updatedValues').toJS();

      delete editorErrors[payload.editorId];
      delete isEditing[payload.editorId];
      delete updatedValues[payload.editorId];

      return state.merge(
        fromJS({
          isEditing,
          editorErrors,
          updatedValues
        })
      );
    }

    case UPDATE_VALUE: {
      const { value } = payload;
      const { editorId } = meta;
      const updatedValues = state.get('updatedValues').toJS();
      const editorErrors = state.get('editorErrors').toJS();

      updatedValues[editorId] = value;
      delete editorErrors[editorId];

      return state.merge(fromJS({ updatedValues }));
    }

    case VALIDATE_VALUE: {
      const { editorId } = meta;
      const { rules } = payload;
      const updatedValues = state.get('updatedValues').toJS();
      const editorErrors = state.get('editorErrors').toJS();
      const updatedValue = updatedValues[editorId];

      const isEmpty = updatedValue === '';
      const isOnlySpaces = updatedValue.match(/^[\s]+$/);
      const valueLength = updatedValue.length;

      // start with a clean slate
      editorErrors[editorId] = [];
      if (!rules.allowEmpty && isEmpty) {
        editorErrors[editorId].push(errorText.notEmpty);
      }
      if (!rules.allowEmpty && isOnlySpaces) {
        editorErrors[editorId].push(errorText.notSpaces);
      }
      if (rules.maxLength && valueLength > rules.maxLength) {
        editorErrors[editorId].push(
          errorText.tooLong.replace('%MAX_LENGTH%', rules.maxLength)
        );
      }

      // if no errors resulted, clear all error data
      if (!editorErrors[editorId].length) {
        delete editorErrors[editorId];
      }

      return state.merge(
        fromJS({
          editorErrors
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const showEditor = editorId => ({
  type: SHOW_EDITOR,
  payload: { editorId }
});

export const hideEditor = editorId => ({
  type: HIDE_EDITOR,
  payload: { editorId }
});

export const updateValue = (editorId, value) => ({
  type: UPDATE_VALUE,
  payload: { value },
  meta: { editorId }
});

export const validateValue = (editorId, rules) => ({
  type: VALIDATE_VALUE,
  payload: { rules },
  meta: { editorId }
});
