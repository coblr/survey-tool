import { fromJS } from 'immutable';

////////////
/// Actions

const OPEN_MODAL = 'sb-ui/CreateFilterModal/OPEN_MODAL';
const DISMISS_MODAL = 'sb-ui/CreateFilterModal/DISMISS_MODAL';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  filterTitle: ''
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL: {
      return state.merge(
        fromJS({
          isOpen: true,
          filterTitle: payload.title || `New Summary Report`
        })
      );
    }

    case DISMISS_MODAL: {
      return state.merge(
        fromJS({
          isOpen: false
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openCreateFilterModal = title => ({
  type: OPEN_MODAL,
  payload: { title }
});

export const dismissCreateFilterModal = () => ({
  type: DISMISS_MODAL
});
