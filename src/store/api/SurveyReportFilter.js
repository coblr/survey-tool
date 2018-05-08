import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

////////////
/// Actions

export const CREATE_FILTER_REQUEST =
  'sb-ui/SurveyReportFilter/CREATE_FILTER_REQUEST';
export const CREATE_FILTER_SUCCESS =
  'sb-ui/SurveyReportFilter/CREATE_FILTER_SUCCESS';
export const CREATE_FILTER_ERROR =
  'sb-ui/SurveyReportFilter/CREATE_FILTER_ERROR';
export const UPDATE_FILTER_REQUEST =
  'sb-ui/SurveyReportFilter/UPDATE_FILTER_REQUEST';
export const UPDATE_FILTER_SUCCESS =
  'sb-ui/SurveyReportFilter/UPDATE_FILTER_SUCCESS';
export const UPDATE_FILTER_ERROR =
  'sb-ui/SurveyReportFilter/UPDATE_FILTER_ERROR';
export const DELETE_FILTER_REQUEST =
  'sb-ui/SurveyReportFilter/DELETE_FILTER_REQUEST';
export const DELETE_FILTER_SUCCESS =
  'sb-ui/SurveyReportFilter/DELETE_FILTER_SUCCESS';
export const DELETE_FILTER_ERROR =
  'sb-ui/SurveyReportFilter/DELETE_FILTER_ERROR';
export const FETCH_FILTERS_REQUEST =
  'sb-ui/SurveyReportFilter/FETCH_FILTERS_REQUEST';
export const FETCH_FILTERS_SUCCESS =
  'sb-ui/SurveyReportFilter/FETCH_FILTERS_SUCCESS';
export const FETCH_FILTERS_ERROR =
  'sb-ui/SurveyReportFilter/FETCH_FILTERS_ERROR';
export const FETCH_MAPPING_REQUEST =
  'sb-ui/SurveyReportFilter/FETCH_MAPPING_REQUEST';
export const FETCH_MAPPING_SUCCESS =
  'sb-ui/SurveyReportFilter/FETCH_MAPPING_SUCCESS';
export const FETCH_MAPPING_ERROR =
  'sb-ui/SurveyReportFilter/FETCH_MAPPING_ERROR';
export const UPDATE_MAPPING_REQUEST =
  'sb-ui/SurveyReportFilter/UPDATE_MAPPING_REQUEST';
export const UPDATE_MAPPING_SUCCESS =
  'sb-ui/SurveyReportFilter/UPDATE_MAPPING_SUCCESS';
export const UPDATE_MAPPING_ERROR =
  'sb-ui/SurveyReportFilter/UPDATE_MAPPING_ERROR';

////////////
/// Reducer

const initialState = fromJS({
  surveyFilters: {},
  creatingSurveyFilters: {},
  fetchingSurveyFilters: {},
  updatingSurveyFilters: {},
  deletingSurveyFilters: {},
  surveyFilterErrors: {},
  filterMappings: {},
  fetchingFilterMappings: {},
  updatingFilterMappings: {},
  filterMappingErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case CREATE_FILTER_REQUEST: {
      const surveyId = meta.surveyId;
      const creatingSurveyFilters = state
        .get('creatingSurveyFilters')
        .toJS();
      creatingSurveyFilters[surveyId] = true;
      return state.merge(fromJS({ creatingSurveyFilters }));
    }

    case CREATE_FILTER_SUCCESS: {
      const surveyId = meta.surveyId;
      const creatingSurveyFilters = state
        .get('creatingSurveyFilters')
        .toJS();
      const surveyFilters = state.get('surveyFilters').toJS();

      delete creatingSurveyFilters[surveyId];
      surveyFilters[surveyId] = surveyFilters[surveyId] || [];
      surveyFilters[surveyId].push(payload);

      return state.merge(
        fromJS({
          creatingSurveyFilters,
          surveyFilters
        })
      );
    }

    case CREATE_FILTER_ERROR: {
      const surveyId = meta.surveyId;
      const creatingSurveyFilters = state
        .get('creatingSurveyFilters')
        .toJS();
      const surveyFilterErrors = state
        .get('surveyFilterErrors')
        .toJS();

      delete creatingSurveyFilters[surveyId];
      surveyFilterErrors[surveyId] = payload.error;

      return state.merge(
        fromJS({
          creatingSurveyFilters,
          surveyFilterErrors
        })
      );
    }

    case UPDATE_FILTER_REQUEST: {
      const filterId = meta.filterId;
      const updatingSurveyFilters = state
        .get('updatingSurveyFilters')
        .toJS();
      updatingSurveyFilters[filterId] = true;
      return state.merge(fromJS({ updatingSurveyFilters }));
    }

    case UPDATE_FILTER_SUCCESS: {
      const filterId = meta.filterId;
      const surveyId = meta.surveyId;
      const updatingSurveyFilters = state
        .get('updatingSurveyFilters')
        .toJS();
      const surveyFilters = state.get('surveyFilters').toJS();

      delete updatingSurveyFilters[filterId];
      surveyFilters[surveyId].forEach((f, i) => {
        if (f.id === filterId) {
          surveyFilters[surveyId][i] = payload;
        }
      });

      return state.merge(
        fromJS({
          updatingSurveyFilters,
          surveyFilters
        })
      );
    }

    case UPDATE_FILTER_ERROR: {
      const filterId = meta.filterId;
      const updatingSurveyFilters = state
        .get('updatingSurveyFilters')
        .toJS();
      const surveyFilterErrors = state
        .get('surveyFilterErrors')
        .toJS();

      delete updatingSurveyFilters[filterId];
      surveyFilterErrors[filterId] = payload.error;

      return state.merge(
        fromJS({
          updatingSurveyFilters,
          surveyFilterErrors
        })
      );
    }

    case DELETE_FILTER_REQUEST: {
      const filterId = meta.filterId;
      const deletingSurveyFilters = state
        .get('deletingSurveyFilters')
        .toJS();
      deletingSurveyFilters[filterId] = true;
      return state.merge(fromJS({ deletingSurveyFilters }));
    }

    case DELETE_FILTER_SUCCESS: {
      const filterId = meta.filterId;
      const surveyId = meta.surveyId;
      const deletingSurveyFilters = state
        .get('deletingSurveyFilters')
        .toJS();
      const surveyFilters = state.get('surveyFilters').toJS();

      delete deletingSurveyFilters[filterId];
      surveyFilters[surveyId] = surveyFilters[surveyId].filter(
        f => f.id !== filterId
      );

      return state.merge(
        fromJS({
          deletingSurveyFilters,
          surveyFilters
        })
      );
    }

    case DELETE_FILTER_ERROR: {
      const filterId = meta.filterId;
      const deletingSurveyFilters = state
        .get('deletingSurveyFilters')
        .toJS();
      const surveyFilterErrors = state
        .get('surveyFilterErrors')
        .toJS();

      delete deletingSurveyFilters[filterId];
      surveyFilterErrors[filterId] = payload.error;

      return state.merge(
        fromJS({
          deletingSurveyFilters,
          surveyFilterErrors
        })
      );
    }

    case FETCH_FILTERS_REQUEST: {
      const surveyId = meta.surveyId;
      const fetchingSurveyFilters = state
        .get('fetchingSurveyFilters')
        .toJS();
      fetchingSurveyFilters[surveyId] = true;
      return state.merge(fromJS({ fetchingSurveyFilters }));
    }

    case FETCH_FILTERS_SUCCESS: {
      const surveyId = meta.surveyId;
      const fetchingSurveyFilters = state
        .get('fetchingSurveyFilters')
        .toJS();
      const surveyFilters = state.get('surveyFilters').toJS();

      delete fetchingSurveyFilters[surveyId];
      surveyFilters[surveyId] = payload;

      return state.merge(
        fromJS({
          fetchingSurveyFilters,
          surveyFilters
        })
      );
    }

    case FETCH_FILTERS_ERROR: {
      const surveyId = meta.surveyId;
      const fetchingSurveyFilters = state
        .get('fetchingSurveyFilters')
        .toJS();
      const surveyFilterErrors = state
        .get('surveyFilterErrors')
        .toJS();

      delete fetchingSurveyFilters[surveyId];
      surveyFilterErrors[surveyId] = payload.error;

      return state.merge(
        fromJS({
          fetchingSurveyFilters,
          surveyFilterErrors
        })
      );
    }

    case FETCH_MAPPING_REQUEST: {
      const surveyId = meta.surveyId;
      const fetchingFilterMappings = state
        .get('fetchingFilterMappings')
        .toJS();
      fetchingFilterMappings[surveyId] = true;
      return state.merge(fromJS({ fetchingFilterMappings }));
    }

    case FETCH_MAPPING_SUCCESS: {
      const surveyId = meta.surveyId;
      const fetchingFilterMappings = state
        .get('fetchingFilterMappings')
        .toJS();
      const filterMappings = state.get('filterMappings').toJS();

      delete fetchingFilterMappings[surveyId];
      filterMappings[surveyId] = payload.mappings;

      return state.merge(
        fromJS({
          fetchingFilterMappings,
          filterMappings
        })
      );
    }

    case FETCH_MAPPING_ERROR: {
      const surveyId = meta.surveyId;
      const fetchingFilterMappings = state
        .get('fetchingFilterMappings')
        .toJS();
      const filterMappingErrors = state
        .get('filterMappingErrors')
        .toJS();

      delete fetchingFilterMappings[surveyId];
      filterMappingErrors[surveyId] = payload.error;

      return state.merge(
        fromJS({
          fetchingFilterMappings,
          filterMappingErrors
        })
      );
    }

    case UPDATE_MAPPING_REQUEST: {
      const surveyId = meta.surveyId;
      const updatingFilterMappings = state
        .get('updatingFilterMappings')
        .toJS();
      updatingFilterMappings[surveyId] = true;
      return state.merge(fromJS({ updatingFilterMappings }));
    }

    case UPDATE_MAPPING_SUCCESS: {
      const surveyId = meta.surveyId;
      const updatingFilterMappings = state
        .get('updatingFilterMappings')
        .toJS();
      const filterMappings = state.get('filterMappings').toJS();

      delete updatingFilterMappings[surveyId];
      filterMappings[surveyId] = payload.mappings;

      return state.merge(
        fromJS({
          updatingFilterMappings,
          filterMappings
        })
      );
    }

    case UPDATE_MAPPING_ERROR: {
      const surveyId = meta.surveyId;
      const updatingFilterMappings = state
        .get('updatingFilterMappings')
        .toJS();
      const filterMappingErrors = state
        .get('filterMappingErrors')
        .toJS();

      delete updatingFilterMappings[surveyId];
      filterMappingErrors[surveyId] = payload.error;

      return state.merge(
        fromJS({
          updatingFilterMappings,
          filterMappingErrors
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const createFilter = (surveyId, filter) => ({
  [CALL_API]: {
    endpoint: '/api/filter',
    method: 'POST',
    body: JSON.stringify(filter),
    types: [
      {
        type: CREATE_FILTER_REQUEST,
        meta: { surveyId }
      },
      {
        type: CREATE_FILTER_SUCCESS,
        meta: { surveyId }
      },
      {
        type: CREATE_FILTER_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const updateFilter = (surveyId, filterId, filter) => ({
  [CALL_API]: {
    endpoint: `/api/filter/${filterId}`,
    method: 'PUT',
    body: JSON.stringify(filter),
    types: [
      {
        type: UPDATE_FILTER_REQUEST,
        meta: { surveyId, filterId }
      },
      {
        type: UPDATE_FILTER_SUCCESS,
        meta: { surveyId, filterId }
      },
      {
        type: UPDATE_FILTER_ERROR,
        meta: { surveyId, filterId }
      }
    ]
  }
});

export const deleteFilter = (surveyId, filterId) => ({
  [CALL_API]: {
    endpoint: `/api/filter/${filterId}`,
    method: 'DELETE',
    types: [
      {
        type: DELETE_FILTER_REQUEST,
        meta: { surveyId, filterId }
      },
      {
        type: DELETE_FILTER_SUCCESS,
        meta: { surveyId, filterId }
      },
      {
        type: DELETE_FILTER_ERROR,
        meta: { surveyId, filterId }
      }
    ]
  }
});

export const fetchSurveyFilters = surveyId => ({
  [CALL_API]: {
    endpoint: `/api/filter?surveyId=${surveyId}`,
    method: 'GET',
    types: [
      {
        type: FETCH_FILTERS_REQUEST,
        meta: { surveyId }
      },
      {
        type: FETCH_FILTERS_SUCCESS,
        meta: { surveyId }
      },
      {
        type: FETCH_FILTERS_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const fetchFilterMappings = surveyId => ({
  [CALL_API]: {
    endpoint: `/api/report_filter_mapping/${surveyId}`,
    method: 'GET',
    types: [
      {
        type: FETCH_MAPPING_REQUEST,
        meta: { surveyId }
      },
      {
        type: FETCH_MAPPING_SUCCESS,
        meta: { surveyId }
      },
      {
        type: FETCH_MAPPING_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const updateFilterMapping = (surveyId, mapping) => ({
  [CALL_API]: {
    endpoint: `/api/report_filter_mapping/${surveyId}`,
    method: 'PATCH',
    body: JSON.stringify(mapping),
    types: [
      {
        type: UPDATE_MAPPING_REQUEST,
        meta: { surveyId }
      },
      {
        type: UPDATE_MAPPING_SUCCESS,
        meta: { surveyId }
      },
      {
        type: UPDATE_MAPPING_ERROR,
        meta: { surveyId }
      }
    ]
  }
});
