import { fromJS } from 'immutable';

import reducer, * as actions from './PageList';

describe('PageList Module', () => {
  it('sets a flag to show the delete alert', () => {
    const state = fromJS({
      showingDeleteAlert: {}
    });
    const action = actions.showDeleteAlert('p123');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        showingDeleteAlert: { p123: true }
      })
    );
  });

  it('removes a flag to close the delete alert', () => {
    const state = fromJS({
      showingDeleteAlert: { p123: true }
    });
    const action = actions.closeDeleteAlert('p123');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        showingDeleteAlert: {}
      })
    );
  });
});
