import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import { normalize } from 'normalizr';
import _ from 'lodash';

import * as schemas from '../../schemas';
import * as utils from '../utils';

////////////
/// Actions

import {
  CREATE_PAGE_REQUEST,
  CREATE_PAGE_SUCCESS,
  DELETE_PAGE_SUCCESS
} from './SurveyPage';

export const FETCH_SURVEYS_REQUEST =
  'sb-ui/Survey/FETCH_SURVEYS_REQUEST';
export const FETCH_SURVEYS_SUCCESS =
  'sb-ui/Survey/FETCH_SURVEYS_SUCCESS';
export const FETCH_SURVEYS_ERROR = 'sb-ui/Survey/FETCH_SURVEYS_ERROR';
export const FETCH_SURVEY_REQUEST =
  'sb-ui/Survey/FETCH_SURVEY_REQUST';
export const FETCH_SURVEY_SUCCESS =
  'sb-ui/Survey/FETCH_SURVEY_SUCCESS';
export const FETCH_SURVEY_ERROR = 'sb-ui/Survey/FETCH_SURVEY_ERROR';
export const CREATE_SURVEY_REQUEST =
  'sb-ui/Survey/CREATE_SURVEY_REQUEST';
export const CREATE_SURVEY_SUCCESS =
  'sb-ui/Survey/CREATE_SURVEY_SUCCESS';
export const CREATE_SURVEY_ERROR = 'sb-ui/Survey/CREATE_SURVEY_ERROR';
export const UPDATE_SURVEY_REQUEST =
  'sb-ui/Survey/UPDATE_SURVEY_REQUEST';
export const UPDATE_SURVEY_SUCCESS =
  'sb-ui/Survey/UPDATE_SURVEY_SUCCESS';
export const UPDATE_SURVEY_ERROR = 'sb-ui/Survey/UPDATE_SURVEY_ERROR';
export const DELETE_SURVEY_REQUEST =
  'sb-ui/Survey/DELETE_SURVEY_REQUEST';
export const DELETE_SURVEY_SUCCESS =
  'sb-ui/Survey/DELETE_SURVEY_SUCCESS';
export const DELETE_SURVEY_ERROR = 'sb-ui/Survey/DELETE_SURVEY_ERROR';
export const COPY_SURVEY_REQUEST = 'sb-ui/Survey/COPY_SURVEY_REQUEST';
export const COPY_SURVEY_SUCCESS = 'sb-ui/Survey/COPY_SURVEY_SUCCESS';
export const COPY_SURVEY_ERROR = 'sb-ui/Survey/COPY_SURVEY_ERROR';
export const SELECT_SURVEY = 'sb-ui/Survey/SELECT_SURVEY';
export const FILTER_SURVEYS = 'sb-ui/Survey/FILTER_SURVEYS';
export const RESET_SURVEY_FILTERS =
  'sb-ui/Survey/RESET_SURVEY_FILTERS';
export const UPDATE_PAGE_ORDER_REQUEST =
  'sb-ui/Survey/UPDATE_PAGE_ORDER_REQUEST';
export const UPDATE_PAGE_ORDER_SUCCESS =
  'sb-ui/Survey/UPDATE_PAGE_ORDER_SUCCESS';
export const UPDATE_PAGE_ORDER_ERROR =
  'sb-ui/Survey/UPDATE_PAGE_ORDER_ERROR';
export const FETCH_OWNER_REQUEST = 'sb-ui/Survey/FETCH_OWNER_REQUEST';
export const FETCH_OWNER_SUCCESS = 'sb-ui/Survey/FETCH_OWNER_SUCCESS';
export const FETCH_OWNER_ERROR = 'sb-ui/Survey/FETCH_OWNER_ERROR';
export const CLEAR_OWNER = 'sb-ui/Survey/CLEAR_OWNER';
export const RESET_SURVEY_ERRORS = 'sb-ui/Survey/RESET_SURVEY_ERRORS';

////////////
/// Reducer

const initialState = fromJS({
  surveys: [],
  surveyMap: {},
  currentSurveyId: '',
  creatingSurvey: false,
  createSurveyError: {},
  fetchingAllSurveys: false,
  fetchAllSurveysError: '',
  fetchingSurveys: {},
  fetchSurveyErrors: {},
  updatingSurveys: {},
  updateSurveyErrors: {},
  deletingSurveys: {},
  deleteSurveyErrors: {},
  copyingSurveys: {},
  copySurveyErrors: {},
  filterKeywords: '',
  filterKeywordRegex: /^[.]$/gi,
  filteredSurveys: [],
  surveyOwners: {},
  fetchingOwners: {},
  fetchOwnerErrors: {},
  reorderingPages: {},
  reorderPageErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;

  switch (action.type) {
    case FETCH_SURVEYS_REQUEST: {
      return state.set('fetchingAllSurveys', true);
    }

    case FETCH_SURVEYS_SUCCESS: {
      const normalized = normalize(payload.content, [
        schemas.surveySchema
      ]);
      const { surveys: surveyMap } = normalized.entities;
      const surveys = normalized.result;

      return state.merge(
        fromJS({
          surveys,
          surveyMap: surveyMap || {},
          fetchingAllSurveys: false
        })
      );
    }

    case FETCH_SURVEYS_ERROR: {
      return state.merge(
        fromJS({
          fetchingAllSurveys: false,
          fetchAllSurveysError: utils.createErrorMap(payload)
        })
      );
    }

    case FETCH_SURVEY_REQUEST: {
      return utils.setRequestFlag(
        state,
        'fetchingSurveys',
        meta.surveyId
      );
    }

    case FETCH_SURVEY_SUCCESS: {
      const fetchingSurveys = state.get('fetchingSurveys').toJS();
      let surveys = state.get('surveys').toJS();
      let surveyMap = state.get('surveyMap').toJS();
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveys: newSurveyMap } = normalized.entities;
      const newSurveys = [normalized.result];

      delete fetchingSurveys[meta.surveyId];
      surveys = _.uniq(surveys.concat(newSurveys));
      surveyMap = Object.assign({}, surveyMap, newSurveyMap);

      return state.merge(
        fromJS({
          fetchingSurveys,
          surveys,
          surveyMap
        })
      );
    }

    case FETCH_SURVEY_ERROR: {
      const fetchingSurveys = state.get('fetchingSurveys').toJS();
      const fetchSurveyErrors = state.get('fetchSurveyErrors').toJS();

      delete fetchingSurveys[meta.surveyId];
      fetchSurveyErrors[meta.surveyId] = utils.createErrorMap(
        payload
      );

      return state.merge(
        fromJS({
          fetchingSurveys,
          fetchSurveyErrors
        })
      );
    }

    case CREATE_SURVEY_REQUEST: {
      return state.set('creatingSurvey', true);
    }

    case CREATE_SURVEY_SUCCESS: {
      const survey = payload;
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveys: createdSurveys } = normalized.entities;
      const surveys = state.get('surveys').toJS();
      const surveyMap = state.get('surveyMap').toJS();

      surveys.push(survey.id);
      surveyMap[survey.id] = createdSurveys[survey.id];

      return state.merge(
        fromJS({
          creatingSurvey: false,
          surveys,
          surveyMap
        })
      );
    }

    case CREATE_SURVEY_ERROR: {
      return state.merge({
        creatingSurvey: false,
        createSurveyError: utils.createErrorMap(payload)
      });
    }

    case UPDATE_SURVEY_REQUEST: {
      return utils.setRequestFlag(
        state,
        'updatingSurveys',
        meta.surveyId
      );
    }

    case UPDATE_SURVEY_SUCCESS: {
      const updatingSurveys = state.get('updatingSurveys').toJS();
      const surveyMap = state.get('surveyMap').toJS();
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveys } = normalized.entities;

      delete updatingSurveys[meta.surveyId];
      surveyMap[meta.surveyId] = surveys[meta.surveyId];

      return state.merge(
        fromJS({
          updatingSurveys,
          surveyMap
        })
      );
    }

    case UPDATE_SURVEY_ERROR: {
      const updatingSurveys = state.get('updatingSurveys').toJS();
      const updateSurveyErrors = state
        .get('updateSurveyErrors')
        .toJS();

      delete updatingSurveys[meta.surveyId];
      updateSurveyErrors[meta.surveyId] = utils.createErrorMap(
        payload
      );

      return state.merge({
        updatingSurveys,
        updateSurveyErrors
      });
    }

    case DELETE_SURVEY_REQUEST: {
      return utils.setRequestFlag(
        state,
        'deletingSurveys',
        meta.survey.id
      );
    }

    case DELETE_SURVEY_SUCCESS: {
      const surveyId = meta.survey.id;
      const surveys = state.get('surveys').toJS();
      const surveyMap = state.get('surveyMap').toJS();
      const filteredSurveys = state.get('filteredSurveys').toJS();
      const deletingSurveys = state.get('deletingSurveys').toJS();

      const surveyIndex = surveys.indexOf(surveyId);
      const filterIndex = filteredSurveys.indexOf(surveyId);

      delete surveyMap[surveyId];
      delete deletingSurveys[surveyId];
      surveys.splice(surveyIndex, 1);
      filteredSurveys.splice(filterIndex, 1);

      return state.merge({
        deletingSurveys,
        surveys,
        surveyMap,
        filteredSurveys,
        currentSurveyId: ''
      });
    }

    case DELETE_SURVEY_ERROR: {
      const deletingSurveys = state.get('deletingSurveys').toJS();
      const deleteSurveyErrors = state
        .get('deleteSurveyErrors')
        .toJS();

      delete deletingSurveys[meta.survey.id];
      deleteSurveyErrors[meta.survey.id] = utils.createErrorMap(
        payload
      );

      return state.merge({
        deletingSurveys,
        deleteSurveyErrors
      });
    }

    case COPY_SURVEY_REQUEST: {
      const origSurveyId = meta.origSurveyId;
      const copyingSurveys = state.get('copyingSurveys').toJS();
      copyingSurveys[origSurveyId] = true;
      return state.set('copyingSurveys', fromJS(copyingSurveys));
    }

    case COPY_SURVEY_SUCCESS: {
      const origSurveyId = meta.origSurveyId;
      const survey = payload;
      const normalized = normalize(payload, schemas.surveySchema);
      const { surveys } = normalized.entities;
      const surveyMap = state.get('surveyMap').toJS();
      const copyingSurveys = state.get('copyingSurveys').toJS();

      surveyMap[survey.id] = surveys[survey.id];
      delete copyingSurveys[origSurveyId];

      return state.merge(
        fromJS({
          surveyMap,
          copyingSurveys
        })
      );
    }

    case COPY_SURVEY_ERROR: {
      const origSurveyId = meta.origSurveyId;
      const copyingSurveys = state.get('copyingSurveys').toJS();
      const copySurveyErrors = state.get('copySurveyErrors').toJS();

      delete copyingSurveys[origSurveyId];
      copySurveyErrors[origSurveyId] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          copyingSurveys,
          copySurveyErrors
        })
      );
    }

    case SELECT_SURVEY: {
      // can use empty payload to clear the survey
      const surveyId = payload || '';
      return state.set('currentSurveyId', fromJS(surveyId));
    }

    case FILTER_SURVEYS: {
      const surveys = state.get('surveys').toJS();
      const surveyMap = state.get('surveyMap').toJS();
      let keywords = payload.keywords;
      let regex = /^[.]$/gi;

      // escape any non-word characters before using
      // in the main regular expression.
      if (keywords) {
        if (keywords.match(/[\W]/)) {
          keywords = keywords.replace(/([\W_])/g, '\\$1');
        }
        regex = new RegExp(`(${keywords})`, 'gi');
      }

      const filtered = surveys.filter(s => {
        const survey = surveyMap[s];
        const titleMatch = survey.title && survey.title.match(regex);
        const idMatch = survey.id && survey.id.match(regex);
        return titleMatch || idMatch;
      });

      return state.merge({
        filterKeywords: payload.keywords,
        filterKeywordRegex: regex,
        filteredSurveys: filtered
      });
    }

    case RESET_SURVEY_FILTERS: {
      return state.merge(
        fromJS({
          filteredSurveys: [],
          filterKeywords: '',
          filterKeywordRegex: /^[.]$/gi
        })
      );
    }

    case FETCH_OWNER_REQUEST: {
      return utils.setRequestFlag(
        state,
        'fetchingOwners',
        meta.surveyId
      );
    }

    case FETCH_OWNER_SUCCESS: {
      const fetchingOwners = state.get('fetchingOwners').toJS();
      const surveyOwners = state.get('surveyOwners').toJS();

      delete fetchingOwners[meta.surveyId];
      surveyOwners[meta.surveyId] = payload.ownerId;

      return state.merge(
        fromJS({
          fetchingOwners,
          surveyOwners
        })
      );
    }

    case FETCH_OWNER_ERROR: {
      const fetchingOwners = state.get('fetchingOwners').toJS();
      const fetchOwnerErrors = state.get('fetchOwnerErrors').toJS();

      delete fetchingOwners[meta.surveyId];
      fetchOwnerErrors[meta.surveyId] = utils.createErrorMap(payload);

      return state.merge(
        fromJS({
          fetchingOwners,
          fetchOwnerErrors
        })
      );
    }

    case CLEAR_OWNER: {
      const surveyOwners = state.get('surveyOwners').toJS();
      delete surveyOwners[meta.surveyId];
      return state.merge(fromJS({ surveyOwners }));
    }

    case UPDATE_PAGE_ORDER_REQUEST: {
      return utils.setRequestFlag(
        state,
        'reorderingPages',
        meta.surveyId
      );
    }

    case UPDATE_PAGE_ORDER_SUCCESS: {
      const reorderingPages = state.get('reorderingPages').toJS();
      const surveyMap = state.get('surveyMap').toJS();

      delete reorderingPages[meta.surveyId];
      surveyMap[meta.surveyId].pages = payload.pageOrder;

      return state.merge(
        fromJS({
          reorderingPages,
          surveyMap
        })
      );
    }

    case UPDATE_PAGE_ORDER_ERROR: {
      const reorderingPages = state.get('reorderingPages').toJS();
      const reorderPageErrors = state.get('reorderPageErrors').toJS();

      delete reorderingPages[meta.surveyId];
      reorderPageErrors[meta.surveyId] = utils.createErrorMap(
        payload
      );

      return state.merge({
        reorderingPages,
        reorderPageErrors
      });
    }

    case RESET_SURVEY_ERRORS: {
      const field = payload.errorField;
      return state.set(field, initialState.get(field));
    }

    ////////////
    /// SIDE EFFECTS FROM EXTERNAL ACTIONS
    /// These actions are actually dispatched by other branches
    /// in the state tree, but this branch also needs to make
    /// some updates when they occur.

    // add a temporary page so that the user
    // can see a "creating page" loader.
    case CREATE_PAGE_REQUEST: {
      const surveyMap = state.get('surveyMap').toJS();

      if (meta.index) {
        surveyMap[meta.surveyId].pages.splice(meta.index, 0, 'temp');
      } else {
        surveyMap[meta.surveyId].pages.push('temp');
      }

      return state.merge(fromJS({ surveyMap }));
    }

    case CREATE_PAGE_SUCCESS: {
      const page = payload;
      const surveyMap = state.get('surveyMap').toJS();
      const pages = surveyMap[meta.surveyId].pages;
      const tempIndex = pages.indexOf('temp');

      pages.splice(tempIndex, 1, page.id);

      return state.merge(fromJS({ surveyMap }));
    }

    case DELETE_PAGE_SUCCESS: {
      const pageId = meta.page.id;
      const surveyId = meta.surveyId;
      const surveyMap = state.get('surveyMap').toJS();
      const pgIndex = surveyMap[surveyId].pages.indexOf(pageId);

      surveyMap[surveyId].pages.splice(pgIndex, 1);

      return state.merge(
        fromJS({
          surveyMap
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Action Creators

export const fetchSurveyList = () => ({
  [CALL_API]: {
    endpoint: `/api/surveys?view=summary`,
    method: 'GET',
    types: [
      FETCH_SURVEYS_REQUEST,
      FETCH_SURVEYS_SUCCESS,
      FETCH_SURVEYS_ERROR
    ]
  }
});

export const fetchSurvey = surveyId => ({
  [CALL_API]: {
    endpoint: `/api/surveys/${surveyId}`,
    method: 'GET',
    types: [
      {
        type: FETCH_SURVEY_REQUEST,
        meta: { surveyId }
      },
      {
        type: FETCH_SURVEY_SUCCESS,
        meta: { surveyId }
      },
      {
        type: FETCH_SURVEY_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const createSurvey = surveyInfo => ({
  [CALL_API]: {
    endpoint: `/api/surveys`,
    method: 'POST',
    body: JSON.stringify({ ...surveyInfo }),
    types: [
      CREATE_SURVEY_REQUEST,
      CREATE_SURVEY_SUCCESS,
      CREATE_SURVEY_ERROR
    ]
  }
});

export const deleteSurvey = survey => ({
  [CALL_API]: {
    endpoint: `/api/surveys/${survey.id}`,
    method: 'DELETE',
    types: [
      {
        type: DELETE_SURVEY_REQUEST,
        meta: { survey }
      },
      {
        type: DELETE_SURVEY_SUCCESS,
        meta: { survey }
      },
      {
        type: DELETE_SURVEY_ERROR,
        meta: { survey }
      }
    ]
  }
});

export const updateSurvey = (surveyId, info) => ({
  [CALL_API]: {
    endpoint: `/api/surveys/${surveyId}`,
    method: 'PATCH',
    body: JSON.stringify({ ...info }),
    types: [
      {
        type: UPDATE_SURVEY_REQUEST,
        meta: { surveyId }
      },
      {
        type: UPDATE_SURVEY_SUCCESS,
        meta: { surveyId }
      },
      {
        type: UPDATE_SURVEY_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const copySurvey = (origSurveyId, survey) => ({
  [CALL_API]: {
    endpoint: `/api/surveys/${origSurveyId}/copy`,
    method: 'POST',
    body: JSON.stringify({ ...survey }),
    types: [
      {
        type: COPY_SURVEY_REQUEST,
        meta: { origSurveyId }
      },
      {
        type: COPY_SURVEY_SUCCESS,
        meta: { origSurveyId }
      },
      {
        type: COPY_SURVEY_ERROR,
        meta: { origSurveyId }
      }
    ]
  }
});

export const selectSurvey = surveyId => ({
  type: SELECT_SURVEY,
  payload: surveyId
});

export const filterSurveys = keywords => ({
  type: FILTER_SURVEYS,
  payload: { keywords }
});

export const resetSurveyFilters = () => ({
  type: RESET_SURVEY_FILTERS
});

export const updatePageOrder = (surveyId, pageOrder, force) => {
  let endPoint = `/api/surveys/${surveyId}/pageOrder`;
  if (force) {
    endPoint += '?breakReferences=true';
  }
  return {
    [CALL_API]: {
      endpoint: endPoint,
      method: 'POST',
      body: JSON.stringify({ ids: pageOrder }),
      types: [
        {
          type: UPDATE_PAGE_ORDER_REQUEST,
          meta: { surveyId }
        },
        {
          type: UPDATE_PAGE_ORDER_SUCCESS,
          meta: { surveyId },
          // API returns 204 so we provide payload
          payload: { pageOrder }
        },
        {
          type: UPDATE_PAGE_ORDER_ERROR,
          meta: { surveyId }
        }
      ]
    }
  };
};

export const fetchSurveyOwner = surveyId => ({
  [CALL_API]: {
    endpoint: `/api/surveys/${surveyId}`,
    method: 'GET',
    types: [
      {
        type: FETCH_OWNER_REQUEST,
        meta: { surveyId }
      },
      {
        type: FETCH_OWNER_SUCCESS,
        meta: { surveyId }
      },
      {
        type: FETCH_OWNER_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const clearOwner = surveyId => ({
  type: CLEAR_OWNER,
  meta: { surveyId }
});

export const resetErrors = errorField => ({
  type: RESET_SURVEY_ERRORS,
  payload: { errorField }
});
