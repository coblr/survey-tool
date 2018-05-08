import { fromJS } from 'immutable';

import reducer, * as actions from './Notifications';

import { UPDATE_SURVEY_SUCCESS } from '../api/Survey';

describe('Notifications Module', () => {
  it('stores a success message after update', () => {
    const state = fromJS({ notifications: [] });
    const action = {
      type: UPDATE_SURVEY_SUCCESS
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        notifications: [
          {
            section: 'global',
            type: 'success',
            duration: 2500,
            text: 'survey successfully updated.'
          }
        ]
      })
    );
  });

  it('removes notifications by index', () => {
    const state = fromJS({
      notifications: [
        { section: 'global', type: 'error', text: 'test error' },
        { section: 'global', type: 'success', text: 'test success' },
        { section: 'global', type: 'error', text: 'test error' }
      ]
    });
    const action = actions.dismissNotification(1);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        notifications: [
          { section: 'global', type: 'error', text: 'test error' },
          { section: 'global', type: 'error', text: 'test error' }
        ]
      })
    );
  });
});
