import { CALL_API } from 'redux-api-middleware';

/**
 * This middlware function adds the auth and content type headers
 * to each Survey Builder API call. It should go before the Redux
 * API Middlware when applying middlware to the redux store.
 */
export default () => next => action => {
  if (action[CALL_API]) {
    const headers = action[CALL_API].headers || {};
    headers['Authorization'] = localStorage.getItem('auth-token');

    // for media uploads, we don't want any content type included.
    if (
      !headers['Content-Type'] ||
      headers['Content-Type'] !== 'IGNORE'
    ) {
      headers['Content-Type'] = 'application/json';
    }

    if (headers['Content-Type'] === 'IGNORE') {
      delete headers['Content-Type'];
    }

    action[CALL_API].headers = headers;
  }
  return next(action);
};
