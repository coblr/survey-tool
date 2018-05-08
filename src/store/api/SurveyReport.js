import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

////////////
/// Actions

export const FETCH_REPORTS_REQUEST =
  'sb-ui/SurveyReport/FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS =
  'sb-ui/SurveyReport/FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR =
  'sb-ui/SurveyReport/FETCH_REPORTS_ERROR';
export const SET_CURRENT_FILTER =
  'sb-ui/SurveyReport/SET_CURRENT_FILTER';

////////////
/// Reducer

const initialState = fromJS({
  surveyReports: {},
  fetchingSurveyReports: {},
  fetchSurveyReportErrors: {},
  currentFilters: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case FETCH_REPORTS_REQUEST: {
      const fetchingSurveyReports = state
        .get('fetchingSurveyReports')
        .toJS();
      fetchingSurveyReports[meta.surveyId] = true;
      return state.merge(fromJS({ fetchingSurveyReports }));
    }

    case FETCH_REPORTS_SUCCESS: {
      const surveyId = meta.surveyId;
      const fetchingSurveyReports = state
        .get('fetchingSurveyReports')
        .toJS();
      const surveyReports = state.get('surveyReports').toJS();

      delete fetchingSurveyReports[surveyId];
      surveyReports[surveyId] = payload;

      return state.merge(
        fromJS({
          fetchingSurveyReports,
          surveyReports
        })
      );
    }

    case FETCH_REPORTS_ERROR: {
      const surveyId = meta.surveyId;
      const fetchingSurveyReports = state
        .get('fetchingSurveyReports')
        .toJS();
      const fetchSurveyReportErrors = state
        .get('fetchSurveyReportErrors')
        .toJS();

      delete fetchingSurveyReports[surveyId];
      // for some reason the payload doesn't have
      // any error message. Not sure if problem with
      // service, or middleware.
      fetchSurveyReportErrors[surveyId] = 'Some Error'; //payload.error;

      return state.merge(
        fromJS({
          fetchingSurveyReports,
          fetchSurveyReportErrors
        })
      );
    }

    case SET_CURRENT_FILTER: {
      const currentFilters = state.get('currentFilters').toJS();
      currentFilters[payload.surveyId] =
        currentFilters[payload.surveyId] || {};
      currentFilters[payload.surveyId][payload.mappingId] =
        payload.filter;
      return state.set('currentFilters', fromJS(currentFilters));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchSurveyReport = (surveyId, filterId) => {
  const query = [];
  if (filterId) {
    query.push(`filterId=${filterId}`);
  }

  return {
    [CALL_API]: {
      endpoint: `/api/reports/realtime/${surveyId}?${query.join(
        '&'
      )}`,
      method: 'GET',
      types: [
        {
          type: FETCH_REPORTS_REQUEST,
          meta: { surveyId }
        },
        {
          type: FETCH_REPORTS_SUCCESS,
          meta: { surveyId }
        },
        {
          type: FETCH_REPORTS_ERROR,
          meta: { surveyId }
        }
      ]
    }
  };
};

export const setCurrentFilter = (surveyId, mappingId, filter) => ({
  type: SET_CURRENT_FILTER,
  payload: { surveyId, mappingId, filter }
});
