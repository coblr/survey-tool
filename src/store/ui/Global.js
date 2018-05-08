import { fromJS } from 'immutable';

////////////
/// Actions

export const SHOW_APP_ACTIONS = 'sb-ui/Global/SHOW_APP_ACTIONS';
export const SHOW_APP_SUBHEADER = 'sb-ui/Global/SHOW_APP_SUBHEADER';
export const SHOW_BUILD_NAV = 'sb-ui/Global/SHOW_BUILD_NAV';
export const SHOW_EDITOR_NAV = 'sb-ui/Global/SHOW_EDITOR_NAV';
export const CONFIGURE_LAYOUT = 'sb-ui/Global/CONIGURE_LAYOUT';

////////////
/// Reducer

const initialState = fromJS({
  appTitle: 'Survey Builder',
  appBodyBackground: '#fff',
  showAppActions: false,
  showAppSubHeader: false,
  showBuildNav: false,
  showEditorNav: false
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case SHOW_APP_ACTIONS: {
      return state.set('showAppActions', payload);
    }

    case SHOW_APP_SUBHEADER: {
      return state.set('showAppSubHeader', payload);
    }

    case SHOW_BUILD_NAV: {
      return state.set('showBuildNav', payload);
    }

    case SHOW_EDITOR_NAV: {
      return state.set('showEditorNav', payload);
    }

    case CONFIGURE_LAYOUT: {
      const updateConfigKeys = Object.keys(state.toJS());
      const newConfig = state.toJS();

      updateConfigKeys.forEach(key => {
        if (payload[key] !== undefined) {
          newConfig[key] = payload[key];
        }
      });
      return state.merge(fromJS(newConfig));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const showAppActions = bool => ({
  type: SHOW_APP_ACTIONS,
  payload: bool
});

export const showAppSubHeader = bool => ({
  type: SHOW_APP_SUBHEADER,
  payload: bool
});

export const showBuildNav = bool => ({
  type: SHOW_BUILD_NAV,
  payload: bool
});

export const showEditorNav = bool => ({
  type: SHOW_EDITOR_NAV,
  payload: bool
});

export const configureLayout = config => ({
  type: CONFIGURE_LAYOUT,
  payload: config
});
