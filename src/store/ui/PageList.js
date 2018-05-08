import { fromJS } from 'immutable';

import * as utils from '../utils';

////////////
/// Actions

export const SHOW_DELETE_ALERT = 'sb-ui/PageList/SHOW_DELETE_ALERT';
export const CLOSE_DELETE_ALERT = 'sb-ui/PageList/CLOSE_DELETE_ALERT';

////////////
/// Reducer

const initialState = fromJS({
  showingDeleteAlert: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case SHOW_DELETE_ALERT: {
      return utils.setRequestFlag(
        state,
        'showingDeleteAlert',
        payload.pageId
      );
    }

    case CLOSE_DELETE_ALERT: {
      const showingDeleteAlert = state
        .get('showingDeleteAlert')
        .toJS();
      delete showingDeleteAlert[payload.pageId];
      return state.merge(fromJS({ showingDeleteAlert }));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const showDeleteAlert = pageId => ({
  type: SHOW_DELETE_ALERT,
  payload: { pageId }
});

export const closeDeleteAlert = pageId => ({
  type: CLOSE_DELETE_ALERT,
  payload: { pageId }
});
