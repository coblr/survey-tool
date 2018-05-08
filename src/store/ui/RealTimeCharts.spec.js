import { fromJS } from 'immutable';

import reducer, * as actions from './RealTimeCharts';

describe('RealTimeCharts Module', () => {
  it('toggles the display of a chart for a question', () => {
    const state = fromJS({
      chartDisplayMap: {}
    });
    const action = actions.toggleChart('123', 'pie');
    let nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        chartDisplayMap: {
          '123': ['pie']
        }
      })
    );
  });
});
