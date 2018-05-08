import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

import * as utils from '../utils';
import Environment from '../../helpers/Environment';

let selfServeHost;
switch (Environment) {
  case 'ci':
    selfServeHost = 'qa-us-api-selfservesample.surveysampling.com';
    break;
  case 'qa':
    selfServeHost = 'qa-us-api-selfservesample.surveysampling.com';
    break;
  case 'stage':
    selfServeHost = 'qa-us-api-selfservesample.surveysampling.com';
    break;
  case 'prod':
    selfServeHost = 'us-api-selfservesample.surveysampling.com';
    break;
  // no default
}

////////////
/// Actions

export const FETCH_STATUS_REQUEST =
  'sb-ui/ProjectAudience/FETCH_STATUS_REQUEST';
export const FETCH_STATUS_SUCCESS =
  'sb-ui/ProjectAudience/FETCH_STATUS_SUCCESS';
export const FETCH_STATUS_ERROR =
  'sb-ui/ProjectAudience/FETCH_STATUS_ERROR';

////////////
/// Reducer

const initialState = fromJS({
  audienceStatus: {},
  fetchingAudienceStatus: {},
  fetchAudienceStatusErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case FETCH_STATUS_REQUEST: {
      return utils.setRequestFlag(
        state,
        'fetchingAudienceStatus',
        meta.audienceId
      );
    }

    case FETCH_STATUS_SUCCESS: {
      const fetchingAudienceStatus = state
        .get('fetchingAudienceStatus')
        .toJS();
      const audienceStatus = state.get('audienceStatus').toJS();

      delete fetchingAudienceStatus[meta.audienceId];
      audienceStatus[meta.audienceId] = payload.data;

      return state.merge(
        fromJS({
          fetchingAudienceStatus,
          audienceStatus
        })
      );
    }

    case FETCH_STATUS_ERROR: {
      const fetchingAudienceStatus = state
        .get('fetchingAudienceStatus')
        .toJS();
      const fetchAudienceStatusErrors = state
        .get('fetchAudienceStatusErrors')
        .toJS();

      delete fetchingAudienceStatus[meta.audienceId];
      fetchAudienceStatusErrors[
        meta.audienceId
      ] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          fetchingAudienceStatus,
          fetchAudienceStatusErrors
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchAudienceStatus = (projectId, audienceId) => ({
  [CALL_API]: {
    endpoint: `https://${selfServeHost}/ASProjectControl/v1/projects/${projectId}/audiences/${audienceId}/status`,
    method: 'GET',
    types: [
      {
        type: FETCH_STATUS_REQUEST,
        meta: { projectId, audienceId }
      },
      {
        type: FETCH_STATUS_SUCCESS,
        meta: { projectId, audienceId }
      },
      {
        type: FETCH_STATUS_ERROR,
        meta: { projectId, audienceId }
      }
    ]
  }
});
