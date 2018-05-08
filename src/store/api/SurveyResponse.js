import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

import * as utils from '../utils';

////////////
/// Actions

import { UPDATE_INTERVIEW_SUCCESS } from './SurveyInterview';

export const FETCH_SOURCES_REQUEST =
  'sb-ui/SurveyResponse/FETCH_SOURCES_REQUEST';
export const FETCH_SOURCES_SUCCESS =
  'sb-ui/SurveyResponse/FETCH_SOURCES_SUCCESS';
export const FETCH_SOURCES_ERROR =
  'sb-ui/SurveyResponse/FETCH_SOURCES_ERROR';

export const FETCH_SURVEY_RESPONSES_REQUEST =
  'sb-ui/SurveyResponse/FETCH_SURVEY_RESPONSES_REQUEST';
export const FETCH_SURVEY_RESPONSES_SUCCESS =
  'sb-ui/SurveyResponse/FETCH_SURVEY_RESPONSES_SUCCESS';
export const FETCH_SURVEY_RESPONSES_ERROR =
  'sb-ui/SurveyResponse/FETCH_SURVEY_RESPONSES_ERROR';

export const FETCH_TEXT_RESPONSES_REQUEST =
  'sb-ui/SurveyResponse/FETCH_TEXT_RESPONSES_REQUEST';
export const FETCH_TEXT_RESPONSES_SUCCESS =
  'sb-ui/SurveyResponse/FETCH_TEXT_RESPONSES_SUCCESS';
export const FETCH_TEXT_RESPONSES_ERROR =
  'sb-ui/SurveyResponse/FETCH_TEXT_RESPONSES_ERROR';

export const FETCH_OTHER_RESPONSES_REQUEST =
  'sb-ui/SurveyResponse/FETCH_OTHER_RESPONSES_REQUEST';
export const FETCH_OTHER_RESPONSES_SUCCESS =
  'sb-ui/SurveyResponse/FETCH_OTHER_RESPONSES_SUCCESS';
export const FETCH_OTHER_RESPONSES_ERROR =
  'sb-ui/SurveyResponse/FETCH_OTHER_RESPONSES_ERROR';

////////////
/// Reducer

const initialState = fromJS({
  responseSources: {},
  fetchingSources: {},
  fetchSourceErrors: {},

  surveyResponses: {},
  fetchingSurveyResponses: {},
  fetchSurveyResponseErrors: {},

  textResponses: {},
  recentTextResponses: {},
  fetchingTextResponses: {},
  fetchTextResponseErrors: {},
  textResponsePagination: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case FETCH_SOURCES_REQUEST: {
      const fetchingSources = state.get('fetchingSources').toJS();
      fetchingSources[meta.surveyId] = true;
      return state.merge(fromJS({ fetchingSources }));
    }

    case FETCH_SOURCES_SUCCESS: {
      const responseSources = state.get('responseSources').toJS();
      const fetchingSources = state.get('fetchingSources').toJS();

      responseSources[meta.surveyId] = payload;
      delete fetchingSources[meta.surveyId];

      return state.merge(
        fromJS({
          responseSources,
          fetchingSources
        })
      );
    }

    case FETCH_SOURCES_ERROR: {
      const fetchSourceErrors = state.get('fetchSourceErrors').toJS();
      const fetchingSources = state.get('fetchingSources').toJS();

      fetchSourceErrors[meta.surveyId] = payload.error;
      delete fetchingSources[meta.surveyId];

      return state.merge(
        fromJS({
          fetchSourceErrors,
          fetchingSources
        })
      );
    }

    case FETCH_SURVEY_RESPONSES_REQUEST: {
      const fetchingSurveyResponses = state
        .get('fetchingSurveyResponses')
        .toJS();
      fetchingSurveyResponses[meta.surveyId] = true;
      return state.merge(fromJS({ fetchingSurveyResponses }));
    }

    case FETCH_SURVEY_RESPONSES_SUCCESS: {
      const surveyResponses = state.get('surveyResponses').toJS();
      const fetchingSurveyResponses = state
        .get('fetchingSurveyResponses')
        .toJS();

      surveyResponses[meta.surveyId] = payload;
      delete fetchingSurveyResponses[meta.surveyId];

      return state.merge(
        fromJS({
          surveyResponses,
          fetchingSurveyResponses
        })
      );
    }

    case FETCH_SURVEY_RESPONSES_ERROR: {
      const fetchSurveyResponseErrors = state
        .get('fetchSurveyResponseErrors')
        .toJS();
      const fetchingSurveyResponses = state
        .get('fetchingSurveyResponses')
        .toJS();

      fetchSurveyResponseErrors[meta.surveyId] = payload.error;
      delete fetchingSurveyResponses[meta.surveyId];

      return state.merge(
        fromJS({
          fetchSurveyResponseErrors,
          fetchingSurveyResponses
        })
      );
    }

    case FETCH_TEXT_RESPONSES_REQUEST: {
      const idField = meta.answerId || meta.questionId;
      const fetchingTextResponses = state
        .get('fetchingTextResponses')
        .toJS();
      fetchingTextResponses[idField] = true;
      return state.merge(fromJS({ fetchingTextResponses }));
    }

    case FETCH_TEXT_RESPONSES_SUCCESS: {
      const idField = meta.answerId || meta.questionId;
      const textResponses = state.get('textResponses').toJS();
      const recentTextResponses = state
        .get('recentTextResponses')
        .toJS();
      const fetchingTextResponses = state
        .get('fetchingTextResponses')
        .toJS();
      const textResponsePagination = state
        .get('textResponsePagination')
        .toJS();

      delete fetchingTextResponses[idField];
      textResponses[idField] = payload.content;
      textResponsePagination[idField] = {
        first: payload.first,
        last: payload.last,
        number: payload.number,
        numberOfElements: payload.numberOfElements,
        size: payload.size,
        totalElements: payload.totalElements,
        totalPages: payload.totalPages
      };

      if (!recentTextResponses[idField] || !meta.page) {
        recentTextResponses[idField] = payload.content.slice(0, 5);
      }

      return state.merge(
        fromJS({
          textResponses,
          recentTextResponses,
          textResponsePagination,
          fetchingTextResponses
        })
      );
    }

    case FETCH_TEXT_RESPONSES_ERROR: {
      const idField = meta.answerId || meta.questionId;
      const fetchTextResponseErrors = state
        .get('fetchTextResponseErrors')
        .toJS();
      const fetchingTextResponses = state
        .get('fetchingTextResponses')
        .toJS();

      fetchTextResponseErrors[idField] = utils.createErrorMap(
        payload
      );
      delete fetchingTextResponses[idField];

      return state.merge(
        fromJS({
          fetchTextResponseErrors,
          fetchingTextResponses
        })
      );
    }

    ////////////
    /// Side Effects
    /// These actions come from other parts of the store
    /// but have a direct effect on this part as well.

    case UPDATE_INTERVIEW_SUCCESS: {
      const textResponses = state.get('textResponses').toJS();

      for (let a in textResponses) {
        for (let b = textResponses[a].length - 1; b >= 0; b--) {
          const resp = textResponses[a][b];
          if (resp.interviewId === meta.interview.interviewId) {
            textResponses[a].splice(b, 1);
          }
        }
      }

      return state.merge(fromJS({ textResponses }));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchResponseSources = surveyId => ({
  [CALL_API]: {
    endpoint: `/api/reports/lifecycle/surveys/${surveyId}/sources`,
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

export const fetchTextResponses = (
  questionId,
  answerId,
  filterId,
  interviewId,
  page
) => {
  const query = utils.buildQueryString({
    questionId,
    answerId,
    filterId,
    interviewId,
    page,
    size: 10
  });
  return {
    [CALL_API]: {
      endpoint: `/api/reports/responses/raw${query}`,
      method: 'GET',
      types: [
        {
          type: FETCH_TEXT_RESPONSES_REQUEST,
          meta: { questionId, answerId, page }
        },
        {
          type: FETCH_TEXT_RESPONSES_SUCCESS,
          meta: { questionId, answerId, page }
        },
        {
          type: FETCH_TEXT_RESPONSES_ERROR,
          meta: { questionId, answerId, page }
        }
      ]
    }
  };
};
