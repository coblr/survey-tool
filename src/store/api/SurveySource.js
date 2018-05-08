import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

////////////
/// Actions

export const FETCH_SOURCES_REQUEST =
  'sb-ui/SurveySource/FETCH_SOURCES_REQUEST';
export const FETCH_SOURCES_SUCCESS =
  'sb-ui/SurveySource/FETCH_SOURCES_SUCCESS';
export const FETCH_SOURCES_ERROR =
  'sb-ui/SurveySource/FETCH_SOURCES_ERROR';

export const UPDATE_SOURCE_REQUEST =
  'sb-ui/SurveySource/UPDATE_SOURCE_REQUEST';
export const UPDATE_SOURCE_SUCCESS =
  'sb-ui/SurveySource/UPDATE_SOURCE_SUCCESS';
export const UPDATE_SOURCE_ERROR =
  'sb-ui/SurveySource/UPDATE_SOURCE_ERROR';

////////////
/// Reducer

const initialState = fromJS({
  surveySources: {},
  fetchingSources: {},
  fetchingSourceErr: {},
  savingSources: {},
  savingSourceErr: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;

  switch (action.type) {
    case FETCH_SOURCES_REQUEST: {
      const fetchingSources = state.get('fetchingSources').toJS();

      fetchingSources[meta.surveyId] = true;

      return state.set('fetchingSources', fromJS(fetchingSources));
    }

    case FETCH_SOURCES_ERROR: {
      const fetchingSources = state.get('fetchingSources').toJS();
      const fetchingSourceErr = state.get('fetchingSourceErr').toJS();

      delete fetchingSources[meta.surveyId];
      fetchingSourceErr[meta.surveyId] = payload.error;

      return state.merge(
        fromJS({
          fetchingSources,
          fetchingSourceErr
        })
      );
    }

    case FETCH_SOURCES_SUCCESS: {
      const surveySources = state.get('surveySources').toJS();
      const fetchingSources = state.get('fetchingSources').toJS();

      surveySources[meta.surveyId] = payload.content;
      delete fetchingSources[meta.surveyId];

      return state.merge(
        fromJS({
          surveySources,
          fetchingSources
        })
      );
    }

    case UPDATE_SOURCE_REQUEST: {
      const savingSources = state.get('savingSources').toJS();

      savingSources[meta.sourceId] = true;

      return state.set('savingSources', fromJS(savingSources));
    }

    case UPDATE_SOURCE_ERROR: {
      const savingSources = state.get('savingSources').toJS();
      const savingSourceErr = state.get('savingSourceErr').toJS();

      delete savingSources[meta.sourceId];
      savingSourceErr[meta.sourceId] = payload.error;

      return state.merge(
        fromJS({
          savingSources,
          savingSourceErr
        })
      );
    }

    case UPDATE_SOURCE_SUCCESS: {
      let surveySources = state.get('surveySources').toJS();
      const savingSources = state.get('savingSources').toJS();

      const sources = surveySources[meta.surveyId].map(
        source => (source.id !== payload.id ? source : payload)
      );

      surveySources[meta.surveyId] = sources;
      delete savingSources[meta.sourceId];

      return state.merge(
        fromJS({
          surveySources,
          savingSources
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchSurveySources = surveyId => ({
  [CALL_API]: {
    endpoint: `/api/interviewSources?surveyId=${surveyId}`,
    method: 'GET',
    types: [
      {
        type: FETCH_SOURCES_REQUEST,
        meta: { surveyId }
      },
      {
        type: FETCH_SOURCES_SUCCESS,
        meta: { surveyId }
      },
      {
        type: FETCH_SOURCES_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const updateSurveySource = (surveyId, source) => ({
  [CALL_API]: {
    endpoint: `/api/interviewSources/${source.id}`,
    method: 'PATCH',
    body: JSON.stringify(source),
    types: [
      {
        type: UPDATE_SOURCE_REQUEST,
        meta: {
          surveyId,
          sourceId: source.id
        }
      },
      {
        type: UPDATE_SOURCE_SUCCESS,
        meta: {
          surveyId,
          sourceId: source.id
        }
      },
      {
        type: UPDATE_SOURCE_ERROR,
        meta: {
          surveyId,
          sourceId: source.id
        }
      }
    ]
  }
});

export const toggleSourceProp = (surveyId, source, prop) => {
  // do the toggling before sending update
  if (typeof source[prop] === 'boolean') {
    source[prop] = !source[prop];
  }

  return {
    [CALL_API]: {
      endpoint: `/api/interviewSources/${source.id}`,
      method: 'PATCH',
      body: JSON.stringify(source),
      types: [
        {
          type: UPDATE_SOURCE_REQUEST,
          meta: {
            surveyId,
            sourceId: source.id
          }
        },
        {
          type: UPDATE_SOURCE_SUCCESS,
          meta: {
            surveyId,
            sourceId: source.id
          }
        },
        {
          type: UPDATE_SOURCE_ERROR,
          meta: {
            surveyId,
            sourceId: source.id
          }
        }
      ]
    }
  };
};
