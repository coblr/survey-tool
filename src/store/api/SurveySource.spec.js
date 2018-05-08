import { fromJS } from 'immutable';

import reducer, * as actions from './SurveySource';

describe('SurveySource Module', () => {
  describe('Survey Sources (plural)', () => {
    it('sets a flag for the survey when fetching sources', () => {
      const state = fromJS({
        fetchingSources: {}
      });
      const action = {
        type: actions.FETCH_SOURCES_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSources: {
            '123': true
          }
        })
      );
    });

    it('stores fetched sources and clears fetching marker', () => {
      const state = fromJS({
        surveySources: {},
        fetchingSources: {
          '123': true
        }
      });
      const action = {
        type: actions.FETCH_SOURCES_SUCCESS,
        meta: {
          surveyId: '123'
        },
        payload: {
          content: ['stuff']
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveySources: { '123': ['stuff'] },
          fetchingSources: {}
        })
      );
    });

    it('handles errors from fetching surveys', () => {
      const state = fromJS({
        fetchingSources: {
          '123': true
        },
        fetchingSourceErr: {}
      });
      const action = {
        type: actions.FETCH_SOURCES_ERROR,
        meta: { surveyId: '123' },
        payload: {
          error: 'Error fetching survey sources'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSources: {},
          fetchingSourceErr: {
            '123': 'Error fetching survey sources'
          }
        })
      );
    });
  });
});
