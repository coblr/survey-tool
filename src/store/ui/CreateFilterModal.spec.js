import { fromJS } from 'immutable';

import reducer, * as actions from './CreateFilterModal';

////////////

describe('CreateFilterModal Module', () => {
  it('opens the modal with default title', () => {
    const state = fromJS({
      isOpen: false,
      filterTitle: ''
    });
    const action = actions.openCreateFilterModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        filterTitle: 'New Summary Report'
      })
    );
  });

  it('opens the modal with specific title', () => {
    const state = fromJS({
      isOpen: false,
      filterTitle: ''
    });
    const action = actions.openCreateFilterModal('My New Report');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        filterTitle: 'My New Report'
      })
    );
  });

  it('closes the modal and resets the fields', () => {
    const state = fromJS({
      isOpen: true
    });
    const action = actions.dismissCreateFilterModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false
      })
    );
  });
});
