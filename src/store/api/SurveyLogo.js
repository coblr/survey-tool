import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

import * as utils from '../utils';

////////////
/// Actions

export const UPLOAD_LOGO_REQUEST =
  'sb-ui/SurveyLogo/UPLOAD_LOGO_REQUEST';
export const UPLOAD_LOGO_SUCCESS =
  'sb-ui/SurveyLogo/UPLOAD_LOGO_SUCCESS';
export const UPLOAD_LOGO_ERROR = 'sb-ui/SurveyLogo/UPLOAD_LOGO_ERROR';
export const REMOVE_LOGO = 'sb-ui/SurveyLogo/REMOVE_LOGO';

////////////
/// Reducer

const initialState = fromJS({
  uploadingLogo: false,
  uploadLogoError: {},
  logo: ''
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case UPLOAD_LOGO_REQUEST: {
      return state.set('uploadingLogo', true);
    }

    case UPLOAD_LOGO_SUCCESS: {
      return state.merge(
        fromJS({
          uploadingLogo: false,
          logo: payload.logoUrl
        })
      );
    }

    case UPLOAD_LOGO_ERROR: {
      return state.merge(
        fromJS({
          uploadingLogo: false,
          uploadLogoError: utils.createErrorMap(payload)
        })
      );
    }

    case REMOVE_LOGO: {
      return state.set('logo', '');
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const uploadLogo = (surveyId, file) => {
  const payload = new FormData();
  payload.append('file', file, file.name);

  return {
    [CALL_API]: {
      endpoint: `/api/surveys/${surveyId}/logo`,
      method: 'POST',
      body: payload,
      headers: {
        // we do not include content-type because the
        // browser will automatically add the correct
        // one and even include the boundary token.
        'Content-Type': 'IGNORE'
      },
      types: [
        UPLOAD_LOGO_REQUEST,
        UPLOAD_LOGO_SUCCESS,
        UPLOAD_LOGO_ERROR
      ]
    }
  };
};

export const removeLogo = () => ({
  type: REMOVE_LOGO
});
