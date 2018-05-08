// import {fromJS} from 'immutable';

import '../../helpers/mocks/localStorage.mock';
// import reducer, * as actions from './User';

////////////

describe('User Duck', () => {
  it('test', () => {});

  // it('registers a user', () => {
  //   const state = fromJS({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     fetching: true,
  //     isLoggedIn: false
  //   });
  //   const action = {
  //     type: actions.REGISTER_SUCCESS,
  //     payload: { data: {
  //       token: 'abc123',
  //       tokenExp: 7200,
  //       user: {
  //         firstName: 'Test',
  //         lastName: 'McTesterson',
  //         email: 'test@test.com',
  //       }
  //     }}
  //   };
  //   const nextState = reducer(state, action);
  //   expect(nextState).toEqual(fromJS({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     fetching: false,
  //     isLoggedIn: true
  //   }));
  //   expect(localStorage.getItem('auth-token')).toBe('abc123');
  //   // because reducer was called before we test this, we need
  //   // to verify that our exp is within a time range of 20ms
  //   expect(parseInt(localStorage.getItem('auth-token-exp')))
  //     .toBeLessThan(Date.now() + 7210000);
  //   expect(parseInt(localStorage.getItem('auth-token-exp')))
  //     .toBeGreaterThan(Date.now() + 7190000);
  //   expect(localStorage.getItem('user-info'))
  //     .toEqual(JSON.stringify({
  //       firstName: 'Test',
  //       lastName: 'McTesterson',
  //       email: 'test@test.com',
  //     }));
  // });

  // it('logs a user in', () => {
  //   const state = fromJS({
  //     isLoggedIn: false
  //   });
  //   const action = {
  //     type: actions.LOGIN_SUCCESS,
  //     payload: { data: {
  //       token: 'abc123',
  //       tokenExp: 4500,
  //       user: {
  //         firstName: 'Test',
  //         lastName: 'McTesterson',
  //         email: 'test@test.com',
  //       }
  //     }}
  //   };
  //   const nextState = reducer(state, action);
  //   expect(nextState).toEqual(fromJS({
  //     isLoggedIn: true,
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     fetching: false
  //   }));
  //   expect(localStorage.getItem('auth-token')).toBe('abc123');
  //   // because reducer was called before we test this, we need
  //   // to verify that our exp is within a time range of 20ms
  //   expect(parseInt(localStorage.getItem('auth-token-exp')))
  //     .toBeLessThan(Date.now() + 4501000);
  //   expect(parseInt(localStorage.getItem('auth-token-exp')))
  //     .toBeGreaterThan(Date.now() + 4409000);
  //   expect(localStorage.getItem('user-info'))
  //     .toEqual(JSON.stringify({
  //       firstName: 'Test',
  //       lastName: 'McTesterson',
  //       email: 'test@test.com',
  //     }));
  // });

  // it('handles when a user cannot be authenticated', () => {
  //   const state = fromJS({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     fetching: true,
  //     isLoggedIn: false
  //   });
  //   const action = {
  //     type: actions.LOGIN_ERROR,
  //     payload: {status:400}
  //   };
  //   const nextState = reducer(state, action);
  //   expect(nextState).toEqual(fromJS({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     fetching: false,
  //     isLoggedIn: false
  //   }));
  //   expect(localStorage.getItem('auth-token')).not.toBeDefined();
  //   expect(localStorage.getItem('auth-token-exp')).not.toBeDefined();
  //   expect(localStorage.getItem('user-info')).not.toBeDefined();
  // });

  // it('logs a user out', () => {
  //   const loggedInState = fromJS({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     fetching: true,
  //     isLoggedIn: true
  //   });
  //   const action = actions.logout();
  //   const nextState = reducer(loggedInState, action);
  //   expect(localStorage.getItem('auth-token')).not.toBeDefined();
  //   expect(localStorage.getItem('auth-token-exp')).not.toBeDefined();
  //   expect(localStorage.getItem('user-info')).not.toBeDefined();
  //   expect(nextState).toEqual(fromJS({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     fetching: false,
  //     isLoggedIn: false
  //   }));
  // });

  // it('defaults to auto logout if logout throws error', () => {
  //   const state = fromJS({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     fetching: true,
  //     isLoggedIn: true
  //   })
  //   const action = {
  //     type: actions.LOGOUT_ERROR,
  //     payload:{
  //       status: 500,
  //       statusText: 'Logout Error'
  //     }
  //   };
  //   const nextState = reducer(state, action);
  //   expect(nextState).toEqual(fromJS({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     fetching: false,
  //     isLoggedIn: true
  //   }));
  // });

  // it('hydrates user into from localstorage to state', () => {
  //   const state = fromJS({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     isLoggedIn: false,
  //     fetching: false
  //   });
  //   const action = actions.hydrateUser({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //   });
  //   const nextState = reducer(state, action);
  //   expect(nextState).toEqual(fromJS({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     isLoggedIn: true,
  //     fetching: false
  //   }))
  // });

  // it('automatically logs a user out if any response was 401', () => {
  //   localStorage.setItem('auth-token', '123');
  //   localStorage.setItem('auth-token-exp', '12345');
  //   localStorage.setItem('user-info', "{name:'test'}");
  //   const state = fromJS({
  //     firstName: 'Test',
  //     lastName: 'McTesterson',
  //     email: 'test@test.com',
  //     isLoggedIn: true,
  //     fetching: false
  //   });
  //   const action = {
  //     type: 'ANY_ERROR',
  //     payload: {
  //       status: 401
  //     }
  //   };
  //   const nextState = reducer(state, action);
  //   expect(nextState).toEqual(fromJS({
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     isLoggedIn: false,
  //     fetching: false
  //   }));
  //   expect(localStorage.getItem('auth-token')).not.toBeDefined();
  //   expect(localStorage.getItem('auth-token-exp')).not.toBeDefined();
  //   expect(localStorage.getItem('user-info')).not.toBeDefined();
  // });
});
