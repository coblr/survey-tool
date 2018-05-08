import { fromJS } from 'immutable';

////////////
/// Actions

export const TOGGLE_DISABLE_ALERT =
  'sb-ui/SourceDashboard/TOGGLE_DISABLE_ALERT';

////////////
/// Reducer

const initialState = fromJS({
  sourceAlerts: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case TOGGLE_DISABLE_ALERT: {
      const sourceId = payload.sourceId;
      const sourceAlerts = state.get('sourceAlerts').toJS();

      if (!sourceAlerts[sourceId]) {
        sourceAlerts[sourceId] = true;
      } else {
        delete sourceAlerts[sourceId];
      }

      return state.merge({ sourceAlerts });
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const toggleDisableAlert = sourceId => ({
  type: TOGGLE_DISABLE_ALERT,
  payload: { sourceId }
});
