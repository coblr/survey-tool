import { fromJS } from 'immutable';

import reducer, * as actions from './ProjectAudience';

describe('ProjectAudience Module', () => {
  describe('Fetching Audience Status', () => {
    it('sets a request flag for the audience being fetched', () => {
      const state = fromJS({
        fetchingAudienceStatus: {}
      });
      const action = {
        type: actions.FETCH_STATUS_REQUEST,
        meta: {
          projectId: 'p123',
          audienceId: 'a111'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingAudienceStatus: { a111: true }
        })
      );
    });

    it('fetches status for a single audience', () => {
      const state = fromJS({
        fetchingAudienceStatus: { a111: true },
        audienceStatus: {}
      });
      const action = {
        type: actions.FETCH_STATUS_SUCCESS,
        meta: {
          projectId: 'p123',
          audienceId: 'a111'
        },
        payload: {
          data: {
            status: 'NOT_STARTED',
            metrics: {
              started: 0,
              completed: 0
            }
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingAudienceStatus: {},
          audienceStatus: {
            a111: {
              status: 'NOT_STARTED',
              metrics: {
                started: 0,
                completed: 0
              }
            }
          }
        })
      );
    });

    it('stores any error from fetching and removes request flag', () => {
      const state = fromJS({
        fetchingAudienceStatus: { a111: true },
        fetchAudienceStatusErrors: {}
      });
      const action = {
        type: actions.FETCH_STATUS_ERROR,
        meta: {
          projectId: '123',
          audienceId: 'a111'
        },
        payload: {
          status: 404,
          response: {
            errorMessage: 'Could not find Audience a111'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingAudienceStatus: {},
          fetchAudienceStatusErrors: {
            a111: {
              status: 404,
              message: 'Could not find Audience a111'
            }
          }
        })
      );
    });
  });
});
