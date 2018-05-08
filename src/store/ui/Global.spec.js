import { fromJS } from 'immutable';

import reducer, * as actions from './Global';

describe('Global Duck', () => {
  it('sets flag to show app actions', () => {
    const state = fromJS({ showAppActions: false });
    const action = actions.showAppActions(true);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({ showAppActions: true }));
  });

  it('sets flag to show app subheader', () => {
    const state = fromJS({ showAppSubHeader: false });
    const action = actions.showAppSubHeader(true);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({ showAppSubHeader: true }));
  });

  it('configures the full layout with a config object', () => {
    const state = fromJS({
      showAppActions: false,
      showBuildNav: false,
      showEditorNav: false
    });
    const action = actions.configureLayout({
      showAppActions: true,
      showBuildNav: true,
      showEditorNav: true
    });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        showAppActions: true,
        showBuildNav: true,
        showEditorNav: true
      })
    );
  });

  it('configures part of the layout with a config object', () => {
    const state = fromJS({
      showAppActions: false,
      showBuildNav: false,
      showEditorNav: false,
      appBodyBackground: '#FFF'
    });
    const action = actions.configureLayout({
      appBodyBackground: '#F0F'
    });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        showAppActions: false,
        showBuildNav: false,
        showEditorNav: false,
        appBodyBackground: '#F0F'
      })
    );
  });
});
