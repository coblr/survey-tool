import { fromJS } from 'immutable';
import _ from 'lodash';

export const setRequestFlag = (state, flagProp, id) => {
  const requestFlags = state.get(flagProp).toJS();
  requestFlags[id] = true;
  return state.set(flagProp, fromJS(requestFlags));
};

export const createErrorMap = payload => {
  const { status } = payload;
  const errorMap = { status };

  // 404s will not have any response data because
  // there was nothing to respond from
  if (status === 404) {
    errorMap.message = payload.message;
  }

  // API error responses will have a mix of these properties.
  if (payload.response) {
    const {
      response: {
        errorCode: code,
        fieldName: field,
        errorMessage: message
      }
    } = payload;

    if (code) {
      errorMap.code = code;
    }
    if (field) {
      errorMap.field = field;
    }
    if (message) {
      errorMap.message = message;
    }
  }

  return errorMap;
};

export const buildQueryString = params => {
  const query = [];
  _.forEach(params, (param, key) => {
    // allow `0` and `false` as param values
    if (param !== undefined && param !== null) {
      query.push(`${key}=${param}`);
    }
  });
  return query.length ? `?${query.join('&')}` : '';
};
