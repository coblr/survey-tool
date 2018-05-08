import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

import * as utils from '../utils';

////////////
/// Actions

export const FETCH_INTERVIEWS_REQUEST =
  'sb-ui/SurveyInterview/FETCH_INTERVIEWS_REQUEST';
export const FETCH_INTERVIEWS_SUCCESS =
  'sb-ui/SurveyInterview/FETCH_INTERVIEWS_SUCCESS';
export const FETCH_INTERVIEWS_ERROR =
  'sb-ui/SurveyInterview/FETCH_INTERVIEWS_ERROR';

export const FETCH_INTERVIEW_REQUEST =
  'sb-ui/SurveyInterview/FETCH_INTERVIEW_REQUEST';
export const FETCH_INTERVIEW_SUCCESS =
  'sb-ui/SurveyInterview/FETCH_INTERVIEW_SUCCESS';
export const FETCH_INTERVIEW_ERROR =
  'sb-ui/SurveyInterview/FETCH_INTERVIEW_ERROR';

export const FETCH_INTERVIEW_RESPONSES_REQUEST =
  'sb-ui/SurveyInterview/FETCH_INTERVIEW_RESPONSES_REQUEST';
export const FETCH_INTERVIEW_RESPONSES_SUCCESS =
  'sb-ui/SurveyInterview/FETCH_INTERVIEW_RESPONSES_SUCCESS';
export const FETCH_INTERVIEW_RESPONSES_ERROR =
  'sb-ui/SurveyInterview/FETCH_INTERVIEW_RESPONSES_ERROR';

export const UPDATE_INTERVIEW_REQUEST =
  'sb-ui/SurveyInterview/UPDATE_INTERVIEW_REQUEST';
export const UPDATE_INTERVIEW_SUCCESS =
  'sb-ui/SurveyInterview/UPDATE_INTERVIEW_SUCCESS';
export const UPDATE_INTERVIEW_ERROR =
  'sb-ui/SurveyInterview/UPDATE_INTERVIEW_ERROR';

export const DELETE_INTERVIEW_REQUEST =
  'sb-ui/SurveyInterview/DELETE_INTERVIEW_REQUEST';
export const DELETE_INTERVIEW_SUCCESS =
  'sb-ui/SurveyInterview/DELETE_INTERVIEW_SUCCESS';
export const DELETE_INTERVIEW_ERROR =
  'sb-ui/SurveyInterview/DELETE_INTERVIEW_ERROR';

export const SHOW_DELETE_ALERT =
  'sb-ui/SurveyInterview/SHOW_DELETE_ALERT';
export const HIDE_DELETE_ALERT =
  'sb-ui/SurveyInterview/HIDE_DELETE_ALERT';

////////////
/// Reducer

const initialState = fromJS({
  surveyInterviews: {},
  fetchingInterviews: {},
  fetchInterviewErrors: {},
  surveyInterviewPagination: {},
  interviewResponses: {},
  fetchingInterviewResponses: {},
  fetchInterviewResponseErrors: {},
  updatingInterviews: {},
  updateInterviewErrors: {},
  deletingInterviews: {},
  deleteInterviewErrors: {},
  showDeleteAlerts: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case FETCH_INTERVIEWS_REQUEST: {
      const fetchingInterviews = state
        .get('fetchingInterviews')
        .toJS();
      fetchingInterviews[meta.surveyId] = true;
      return state.merge(fromJS({ fetchingInterviews }));
    }

    case FETCH_INTERVIEWS_SUCCESS: {
      const interviews = payload.content;
      const surveyInterviews = state.get('surveyInterviews').toJS();
      const fetchingInterviews = state
        .get('fetchingInterviews')
        .toJS();
      const surveyInterviewPagination = state
        .get('surveyInterviewPagination')
        .toJS();

      surveyInterviews[meta.surveyId] = interviews;
      delete fetchingInterviews[meta.surveyId];
      surveyInterviewPagination[meta.surveyId] = {
        first: payload.first,
        last: payload.last,
        number: payload.number,
        numberOfElements: payload.numberOfElements,
        size: payload.size,
        totalElements: payload.totalElements,
        totalPages: payload.totalPages
      };

      return state.merge(
        fromJS({
          surveyInterviews,
          fetchingInterviews,
          surveyInterviewPagination
        })
      );
    }

    case FETCH_INTERVIEWS_ERROR: {
      const fetchInterviewErrors = state
        .get('fetchInterviewErrors')
        .toJS();
      const fetchingInterviews = state
        .get('fetchingInterviews')
        .toJS();

      delete fetchingInterviews[meta.surveyId];
      fetchInterviewErrors[meta.surveyId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          fetchInterviewErrors,
          fetchingInterviews
        })
      );
    }

    case FETCH_INTERVIEW_REQUEST: {
      return utils.setRequestFlag(
        state,
        'fetchingInterviews',
        meta.surveyId
      );
    }

    case FETCH_INTERVIEW_SUCCESS: {
      const fetchingInterviews = state
        .get('fetchingInterviews')
        .toJS();
      const surveyInterviews = state.get('surveyInterviews').toJS();
      surveyInterviews[meta.surveyId] =
        surveyInterviews[meta.surveyId] || [];
      const index = surveyInterviews[meta.surveyId].findIndex(
        interview => interview.interviewId === payload.interviewId
      );

      delete fetchingInterviews[meta.surveyId];
      if (index < 0) {
        surveyInterviews[meta.surveyId].push(payload);
      } else {
        surveyInterviews[meta.surveyId].splice(index, 1, payload);
      }

      return state.merge(
        fromJS({
          fetchingInterviews,
          surveyInterviews
        })
      );
    }

    case FETCH_INTERVIEW_ERROR: {
      const fetchingInterviews = state
        .get('fetchingInterviews')
        .toJS();
      const fetchInterviewErrors = state
        .get('fetchInterviewErrors')
        .toJS();

      delete fetchingInterviews[meta.surveyId];
      fetchInterviewErrors[meta.surveyId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          fetchingInterviews,
          fetchInterviewErrors
        })
      );
    }

    case FETCH_INTERVIEW_RESPONSES_REQUEST: {
      const fetchingInterviewResponses = state
        .get('fetchingInterviewResponses')
        .toJS();
      fetchingInterviewResponses[meta.interviewId] = true;
      return state.merge(fromJS({ fetchingInterviewResponses }));
    }

    case FETCH_INTERVIEW_RESPONSES_SUCCESS: {
      const interviewResponses = state
        .get('interviewResponses')
        .toJS();
      const fetchingInterviewResponses = state
        .get('fetchingInterviewResponses')
        .toJS();

      interviewResponses[meta.interviewId] = payload;
      delete fetchingInterviewResponses[meta.interviewId];

      return state.merge(
        fromJS({
          interviewResponses,
          fetchingInterviewResponses
        })
      );
    }

    case FETCH_INTERVIEW_RESPONSES_ERROR: {
      const fetchInterviewResponseErrors = state
        .get('fetchInterviewResponseErrors')
        .toJS();
      const fetchingInterviewResponses = state
        .get('fetchingInterviewResponses')
        .toJS();

      fetchInterviewResponseErrors[meta.interviewId] = payload.error;
      delete fetchingInterviewResponses[meta.interviewId];

      return state.merge(
        fromJS({
          fetchInterviewResponseErrors,
          fetchingInterviewResponses
        })
      );
    }

    case UPDATE_INTERVIEW_REQUEST: {
      return utils.setRequestFlag(
        state,
        'updatingInterviews',
        meta.interview.interviewId
      );
    }

    case UPDATE_INTERVIEW_SUCCESS: {
      const interviewId = meta.interview.interviewId;
      const updatingInterviews = state
        .get('updatingInterviews')
        .toJS();
      const surveyInterviews = state.get('surveyInterviews').toJS();
      const interviews = surveyInterviews[meta.surveyId];

      delete updatingInterviews[meta.interview.interviewId];
      if (interviews) {
        const interviewIndex = interviews.findIndex(
          intv => intv.interviewId === interviewId
        );
        surveyInterviews[meta.surveyId][interviewIndex] = payload;
      }

      return state.merge(
        fromJS({
          updatingInterviews,
          surveyInterviews
        })
      );
    }

    case UPDATE_INTERVIEW_ERROR: {
      const updatingInterviews = state
        .get('updatingInterviews')
        .toJS();
      const updateInterviewErrors = state
        .get('updateInterviewErrors')
        .toJS();

      delete updatingInterviews[meta.interview.interviewId];
      updateInterviewErrors[
        meta.interview.interviewId
      ] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          updatingInterviews,
          updateInterviewErrors
        })
      );
    }

    case DELETE_INTERVIEW_REQUEST: {
      return utils.setRequestFlag(
        state,
        'deletingInterviews',
        meta.interview.interviewId
      );
    }

    case DELETE_INTERVIEW_SUCCESS: {
      const { interview: { interviewId } } = meta;
      const deletingInterviews = state
        .get('deletingInterviews')
        .toJS();
      const surveyInterviews = state.get('surveyInterviews').toJS();
      const intvIndex = surveyInterviews[
        meta.surveyId
      ].findIndex(intv => {
        return intv.interviewId === interviewId;
      });

      delete deletingInterviews[interviewId];
      surveyInterviews[meta.surveyId].splice(intvIndex, 1);

      return state.merge(
        fromJS({
          deletingInterviews,
          surveyInterviews
        })
      );
    }

    case DELETE_INTERVIEW_ERROR: {
      const { interview: { interviewId } } = meta;
      const deletingInterviews = state
        .get('deletingInterviews')
        .toJS();
      const deleteInterviewErrors = state
        .get('deleteInterviewErrors')
        .toJS();

      delete deletingInterviews[interviewId];
      deleteInterviewErrors[interviewId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          deletingInterviews,
          deleteInterviewErrors
        })
      );
    }

    case SHOW_DELETE_ALERT: {
      const showDeleteAlerts = state.get('showDeleteAlerts').toJS();
      showDeleteAlerts[meta.interviewId] = true;
      return state.set('showDeleteAlerts', fromJS(showDeleteAlerts));
    }

    case HIDE_DELETE_ALERT: {
      const showDeleteAlerts = state.get('showDeleteAlerts').toJS();
      delete showDeleteAlerts[meta.interviewId];
      return state.set('showDeleteAlerts', fromJS(showDeleteAlerts));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchInterviews = (surveyId, filterId, page) => {
  const query = utils.buildQueryString({ surveyId, filterId, page });
  return {
    [CALL_API]: {
      endpoint: `/api/reports/lifecycle/interviews${query}`,
      method: 'GET',
      types: [
        {
          type: FETCH_INTERVIEWS_REQUEST,
          meta: { surveyId }
        },
        {
          type: FETCH_INTERVIEWS_SUCCESS,
          meta: { surveyId }
        },
        {
          type: FETCH_INTERVIEWS_ERROR,
          meta: { surveyId }
        }
      ]
    }
  };
};

export const fetchInterviewDetails = (surveyId, interviewId) => {
  const query = utils.buildQueryString({ surveyId });
  return {
    [CALL_API]: {
      endpoint: `/api/reports/lifecycle/interviews/${interviewId}${query}`,
      method: 'GET',
      types: [
        {
          type: FETCH_INTERVIEW_REQUEST,
          meta: { surveyId, interviewId }
        },
        {
          type: FETCH_INTERVIEW_SUCCESS,
          meta: { surveyId, interviewId }
        },
        {
          type: FETCH_INTERVIEW_ERROR,
          meta: { surveyId, interviewId }
        }
      ]
    }
  };
};

export const fetchInterviewResponses = (surveyId, interviewId) => {
  const query = utils.buildQueryString({ surveyId, interviewId });
  return {
    [CALL_API]: {
      endpoint: `/api/reports/responses${query}`,
      method: 'GET',
      types: [
        {
          type: FETCH_INTERVIEW_RESPONSES_REQUEST,
          meta: { interviewId }
        },
        {
          type: FETCH_INTERVIEW_RESPONSES_SUCCESS,
          meta: { interviewId }
        },
        {
          type: FETCH_INTERVIEW_RESPONSES_ERROR,
          meta: { interviewId }
        }
      ]
    }
  };
};

export const updateInterview = (surveyId, interview) => {
  const query = utils.buildQueryString({ surveyId });
  return {
    [CALL_API]: {
      endpoint: `/api/reports/lifecycle/interviews/${interview.interviewId}${query}`,
      method: 'PATCH',
      body: JSON.stringify(interview),
      types: [
        {
          type: UPDATE_INTERVIEW_REQUEST,
          meta: { surveyId, interview }
        },
        {
          type: UPDATE_INTERVIEW_SUCCESS,
          meta: { surveyId, interview }
        },
        {
          type: UPDATE_INTERVIEW_ERROR,
          meta: { surveyId, interview }
        }
      ]
    }
  };
};

export const deleteInterview = (surveyId, interview) => {
  const query = utils.buildQueryString({ surveyId });
  interview.deleted = true;

  return {
    [CALL_API]: {
      endpoint: `/api/reports/lifecycle/interviews/${interview.interviewId}${query}`,
      method: 'DELETE',
      types: [
        {
          type: DELETE_INTERVIEW_REQUEST,
          meta: { surveyId, interview }
        },
        {
          type: DELETE_INTERVIEW_SUCCESS,
          meta: { surveyId, interview }
        },
        {
          type: DELETE_INTERVIEW_ERROR,
          meta: { surveyId, interview }
        }
      ]
    }
  };
};

export const showDeleteAlert = interviewId => ({
  type: SHOW_DELETE_ALERT,
  meta: { interviewId }
});

export const hideDeleteAlert = interviewId => ({
  type: HIDE_DELETE_ALERT,
  meta: { interviewId }
});
