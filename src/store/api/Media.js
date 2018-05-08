import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

import * as utils from '../utils';

////////////
/// Actions

export const FETCH_MEDIA_REQUEST = 'sb-ui/Media/FETCH_MEDIA_REQUEST';
export const FETCH_MEDIA_SUCCESS = 'sb-ui/Media/FETCH_MEDIA_SUCCESS';
export const FETCH_MEDIA_ERROR = 'sb-ui/Media/FETCH_MEDIA_ERROR';
export const UPLOAD_MEDIA_REQUEST =
  'sb-ui/Media/UPLOAD_MEDIA_REQUEST';
export const UPLOAD_MEDIA_SUCCESS =
  'sb-ui/Media/UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_ERROR = 'sb-ui/Media/UPLOAD_MEDIA_ERROR';
export const REMOVE_MEDIA = 'sb-ui/Media/REMOVE_MEDIA';
export const CLEAR_MEDIA_ERRORS = 'sb-ui/Media/CLEAR_MEDIA_ERRORS';

////////////
/// Reducer

const initialState = fromJS({
  media: {},
  fetchingMedia: false,
  fetchMediaError: {},
  uploadingMedia: false,
  uploadMediaError: {},
  uploads: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case FETCH_MEDIA_REQUEST: {
      return state.set('fetchingMedia', true);
    }

    case FETCH_MEDIA_SUCCESS: {
      const media = state.get('media').toJS();
      payload.forEach(m => (media[m.id] = m));

      return state.merge(
        fromJS({
          fetchingMedia: false,
          media
        })
      );
    }

    case FETCH_MEDIA_ERROR: {
      return state.merge(
        fromJS({
          fetchingMedia: false,
          fetchMediaError: utils.createErrorMap(payload)
        })
      );
    }

    // ---

    case UPLOAD_MEDIA_REQUEST: {
      return state.set('uploadingMedia', true);
    }

    case UPLOAD_MEDIA_SUCCESS: {
      const media = state.get('media').toJS();
      media[payload.id] = payload;

      return state.merge(
        fromJS({
          uploadingMedia: false,
          media: media
        })
      );
    }

    case UPLOAD_MEDIA_ERROR: {
      return state.merge(
        fromJS({
          uploadingMedia: false,
          uploadMediaError: utils.createErrorMap(payload)
        })
      );
    }

    // ---

    case REMOVE_MEDIA: {
      let media = state.get('media').toJS();
      media = media.filter(m => m.id !== payload.mediaId);
      return state.merge(fromJS({ media }));
    }

    // ---

    case CLEAR_MEDIA_ERRORS: {
      return state.set(
        'uploadMediaError',
        initialState.get('uploadMediaError')
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchMedia = () => ({
  [CALL_API]: {
    endpoint: `/api/uploads/images`,
    method: 'GET',
    types: [
      FETCH_MEDIA_REQUEST,
      FETCH_MEDIA_SUCCESS,
      FETCH_MEDIA_ERROR
    ]
  }
});

export const uploadMedia = file => {
  const payload = new FormData();
  payload.append('file', file, file.name);

  return {
    [CALL_API]: {
      endpoint: `/api/uploads/images`,
      method: 'POST',
      body: payload,
      headers: {
        // we do not include content-type because the
        // browser will automatically add the correct
        // one and even include the boundary token.
        'Content-Type': 'IGNORE'
      },
      types: [
        UPLOAD_MEDIA_REQUEST,
        UPLOAD_MEDIA_SUCCESS,
        UPLOAD_MEDIA_ERROR
      ]
    }
  };
};

export const removeMedia = mediaId => ({
  type: REMOVE_MEDIA,
  payload: { mediaId }
});

export const clearMediaErrors = () => ({
  type: CLEAR_MEDIA_ERRORS
});
