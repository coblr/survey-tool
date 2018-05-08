import { fromJS } from 'immutable';

import reducer, * as actions from './SourceDashboard';

describe('SourceDashboard Module', () => {
  it('toggles an alert for disabling a source', () => {
    const state = fromJS({
      sourceAlerts: {}
    });
    const action = actions.toggleDisableAlert('WEB');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        sourceAlerts: {
          WEB: true
        }
      })
    );
  });
});
