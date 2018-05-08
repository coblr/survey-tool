import { fromJS } from 'immutable';

import reducer, * as actions from './TerminatePage';

describe('TerminatePage Module', () => {
  it('opens the editor', () => {
    const state = fromJS({
      isOpen: false
    });
    const action = actions.openEditor();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true
      })
    );
  });

  it('closes the editor', () => {
    const state = fromJS({
      isOpen: true
    });
    const action = actions.closeEditor();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false
      })
    );
  });

  it('updates single terminate page properties', () => {
    const state = fromJS({
      includeParams: false
    });
    const action = actions.updateTerminatePage('includeParams', true);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        includeParams: true
      })
    );
  });
});
