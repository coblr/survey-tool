import { fromJS } from 'immutable';
// import {CALL_API} from 'redux-api-middleware';

////////////
/// Actions

// export const LOGOUT_REQUEST = 'sb-ui/User/LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'sb-ui/User/LOGOUT_SUCCESS';
// export const LOGOUT_ERROR = 'sb-ui/User/LOGOUT_ERROR';
// export const UPDATE_REQUEST = 'sb-ui/User/UPDATE_REQUEST';
// export const UPDATE_SUCCESS = 'sb-ui/User/UPDATE_SUCCESS';
// export const UPDATE_ERROR = 'sb-ui/User/UPDATE_ERROR';
export const HYDRATE_USER = 'sb-ui/User/HYDRATE_USER';
// export const FETCH_TOKEN_REQUEST = 'sb-ui/User/FETCH_TOKEN_REQUEST';
// export const FETCH_TOKEN_SUCCESS = 'sb-ui/User/FETCH_TOKEN_SUCCESS';
// export const FETCH_TOKEN_ERROR = 'sb-ui/User/FETCH_TOKEN_ERROR';

////////////
/// Reducer

const initialState = fromJS({
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  fetching: false,
  isLoggedIn: false,
  accessToken: '',
  idToken: '',
  refreshToken: '',
  accessTokenExp: 0,
  tokenExp: 0,
  refreshTokenExp: 0,
  sessionState: '',
  tokenType: '',
  realmAccess: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;

  // This will actually match ANY error from any
  // reducer in the ENTIRE application. If for some
  // reason, ANY request is met with a 401, the user
  // should be immediately logged out for security.
  if (action.type.match(/_ERROR$/)) {
    if (payload.status === 401) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('auth-token-exp');
      localStorage.removeItem('user-info');
      return state.merge({
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        fetching: false,
        isLoggedIn: false
      });
    }
    // if the error was something other than 401
    // then just let the state be mutated below.
    // meaning, don't return anything here.
  }

  switch (action.type) {
    // case LOGOUT_REQUEST:
    // case UPDATE_REQUEST: {
    //   return state.set('fetching', true);
    // }

    // case UPDATE_ERROR: {
    //   localStorage.removeItem('auth-token');
    //   localStorage.removeItem('auth-token-exp');
    //   localStorage.removeItem('refresh-token');
    //   localStorage.removeItem('refresh-token-exp');
    //   localStorage.removeItem('user-info');
    //   return state.merge(fromJS({fetching: false}));
    // }

    case LOGOUT_SUCCESS: {
      return state.merge(initialState);
    }

    // case UPDATE_SUCCESS: {
    //   return state.merge(fromJS({
    //     fetching: false,
    //     ...payload
    //   }));
    // }

    case HYDRATE_USER: {
      return state.merge(
        fromJS({
          isLoggedIn: true,
          ...payload
        })
      );
    }

    // case FETCH_TOKEN_REQUEST: {
    //   return state;
    // }

    // case FETCH_TOKEN_SUCCESS: {
    //   const token = payload.access_token;
    //   const tokenExp = Date.now() + (payload.expires_in * 1000);
    //   const refreshToken = payload.refresh_token;
    //   const refreshExp = Date.now() + (payload.refresh_expires_in * 1000);
    //   const tokenInfo = JSON.parse(atob(token.split('.')[1]));

    //   const userInfo = {
    //     id: tokenInfo.sub,
    //     firstName: tokenInfo.given_name,
    //     lastName: tokenInfo.family_name,
    //     email: tokenInfo.email,
    //     access: tokenInfo.resource_access
    //   };

    //   localStorage.setItem('auth-token', token);
    //   localStorage.setItem('auth-token-exp', tokenExp);
    //   localStorage.setItem('refresh-token', refreshToken);
    //   localStorage.setItem('refresh-token-exp', refreshExp);
    //   localStorage.setItem('user-info', JSON.stringify(userInfo));

    //   return state.merge({
    //     accessToken: token,
    //     idToken: payload.id_token,
    //     tokenExp: tokenExp,
    //     refreshToken: payload.refresh_token,
    //     refreshTokenExp: refreshExp,
    //     sessionState: payload.session_state,
    //     tokenType: payload.token_type
    //   });
    // }

    // case FETCH_TOKEN_ERROR: {
    //   const error = payload.response.error;
    //   const desc = payload.response.error_description;
    //   console.error(`Error Fetching Token: (${error}) ${desc}`);
    //   return state;
    // }

    default:
      return state;
  }
};

////////////
/// Action Creators

export const logout = () => ({
  type: LOGOUT_SUCCESS
});

// export const updateUser = (info) => ({
//   [CALL_API]: {
//     endpoint: `/api/user`,
//     method: 'POST',
//     headers: {'Content-Type':'application/json'},
//     body: JSON.stringify(info),
//     types: [UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_ERROR]
//   }
// });

export const hydrateUser = userInfo => ({
  type: HYDRATE_USER,
  payload: { ...userInfo }
});

// export const fetchToken = code => {
//   const url = '/auth/realms/SSI-PLATFORM/protocol/openid-connect/token';
//   const params = [
//     'client_id=surveybuilder-ui',
//     'redirect_uri=%2F',
//     'grant_type=authorization_code',
//     `code=${code}`,
//   ];

//   return {
//     [CALL_API]: {
//       endpoint: `${url}`,
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: params.join('&'),
//       types: [FETCH_TOKEN_REQUEST, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_ERROR]
//     }
//   }
// };
