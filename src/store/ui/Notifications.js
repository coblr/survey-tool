import { fromJS } from 'immutable';

import { UPDATE_SURVEY_SUCCESS } from '../api/Survey';

////////////
/// Action Types
export const DISMISS_NOTIFICATION =
  'sb-ui/Notifications/DISMISS_NOTIFICATION';

////////////
/// Reducer

const initialState = fromJS({
  notifications: []
});

export default (state = initialState, action) => {
  const payload = action.payload;

  // this can only come AFTER we've handled any specific _ERROR cases
  if (action.type.match(/_ERROR$/)) {
    const notifications = state.get('notifications').toJS();
    const hasExpNotice = notifications.find(
      n => n.text.indexOf('expired') > -1
    );

    // Some pages will try to make multiple fetches which will all fail here.
    // Make sure we're not duplicating this message. Without the check, it
    // will create a session expired notification for each failed API call.
    if (payload.status === 401 && !hasExpNotice) {
      notifications.push({
        section: 'login',
        type: 'error',
        text: 'Your session has expired. Please log in again.'
      });
      return state.set('notifications', fromJS(notifications));
    }
  }

  // we're basically going to take the action type and covert
  // it to a string we can use as a success message to the user.
  // if(action.type.match(/(CREATE|UPDATE|DELETE)_[A-Z_]+_SUCCESS$/)){
  //
  // actually, it's probably best just to do it on survey update.
  // the other actions update the UI and the notification there is
  // just overkill. It's also not consistent at all with SB1.0 UX.
  if (action.type === UPDATE_SURVEY_SUCCESS) {
    const notifications = state.get('notifications').toJS();
    const realType = action.type.substr(
      action.type.lastIndexOf('/') + 1
    );
    const firstIndex = realType.indexOf('_');
    const lastIndex = realType.lastIndexOf('_');
    let actionType = realType.substr(0, firstIndex);
    let subject = realType.substring(firstIndex + 1, lastIndex);

    actionType = actionType.toLowerCase() + 'd';
    subject = subject.toLowerCase().replace(/_/g, ' ');

    notifications.push({
      section: 'global',
      type: 'success',
      duration: 2500,
      text: `${subject} successfully ${actionType}.`
    });

    return state.set('notifications', fromJS(notifications));
  }

  switch (action.type) {
    case DISMISS_NOTIFICATION: {
      const index = payload;
      const notifications = state.get('notifications').toJS();
      notifications.splice(index, 1);
      return state.set('notifications', fromJS(notifications));
    }

    // no default
  }

  return state;
};

////////////
/// Action Creators

export const dismissNotification = index => ({
  type: DISMISS_NOTIFICATION,
  payload: index
});
