import { fromJS } from 'immutable';

////////////
/// Actions

export const TOGGLE_CATEGORY = 'sb-ui/SourceSelector/TOGGLE_CATEGORY';
export const SET_EMBED_SIZE = 'sb-ui/SourceSelector/SET_EMBED_SIZE';
export const SET_EMBED_WIDTH = 'sb-ui/SourceSelector/SET_EMBED_WIDTH';
export const SET_EMBED_HEIGHT =
  'sb-ui/SourceSelector/SET_EMBED_HEIGHT';

////////////
/// Reducer

const initialState = fromJS({
  selectedCategory: 'web',
  embedSize: 'medium',
  embedWidth: '300',
  embedHeight: 'AUTO'
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case TOGGLE_CATEGORY: {
      let sc = state.get('selectedCategory');
      sc = sc !== payload.id ? payload.id : '';

      return state.set('selectedCategory', sc);
    }

    case SET_EMBED_SIZE: {
      const size = payload.size;
      let embedSize = state.get('embedSize');
      let embedWidth = state.get('embedWidth');
      // setting preset size, defaults height to auto
      let embedHeight = 'AUTO';

      embedSize = size;
      switch (embedSize) {
        case 'narrow':
          embedWidth = '160';
          break;
        case 'medium':
          embedWidth = '300';
          break;
        case 'wide':
          embedWidth = '630';
          break;
        // no default
      }

      return state.merge({
        embedSize,
        embedWidth,
        embedHeight
      });
    }

    case SET_EMBED_WIDTH: {
      return state.set('embedWidth', payload.width);
    }

    case SET_EMBED_HEIGHT: {
      return state.set('embedHeight', payload.height);
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const toggleCategory = id => ({
  type: TOGGLE_CATEGORY,
  payload: { id }
});

export const setEmbedSize = size => ({
  type: SET_EMBED_SIZE,
  payload: { size }
});

export const setEmbedWidth = width => ({
  type: SET_EMBED_WIDTH,
  payload: { width }
});

export const setEmbedHeight = height => ({
  type: SET_EMBED_HEIGHT,
  payload: { height }
});
