import { fromJS } from 'immutable';

import reducer, * as actions from './ReportFilterModal';

describe('ReportFilterModal Module', () => {
  it('opens the modal', () => {
    const state = fromJS({ isOpen: false });
    const action = actions.openReportFilterModal({ id: 'f123' });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        filter: {
          id: 'f123'
        }
      })
    );
  });

  it('dismisses the modal and resets the state', () => {
    const state = fromJS({
      isOpen: true,
      filter: {
        id: '123',
        title: 'My Filter'
      },
      expandedSection: 'statuses'
      // appliedFilters: {
      // statuses: ['COMPLETED', 'TERMINATED']
      // }
    });
    const action = actions.dismissReportFilterModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false,
        filter: {},
        expandedSection: ''
        // appliedFilters: {}
      })
    );
  });

  it('sets which section should be exanded', () => {
    const state = fromJS({ expandedSection: '' });
    const action = actions.setExpandedSection('foo');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        expandedSection: 'foo'
      })
    );
  });

  it('toggles a boolean filter value', () => {
    const state = fromJS({
      filter: { id: '123' }
    });
    const onAction = actions.toggleFilterParam(
      'statuses',
      'completed'
    );
    const onState = reducer(state, onAction);
    expect(onState).toEqual(
      fromJS({
        filter: {
          id: '123',
          statuses: ['completed']
        }
      })
    );
    const offAction = actions.toggleFilterParam(
      'statuses',
      'completed'
    );
    const offState = reducer(onState, offAction);
    expect(offState).toEqual(
      fromJS({
        filter: {
          id: '123',
          statuses: []
        }
      })
    );
  });

  it('sets filter values', () => {
    const state = fromJS({
      filter: {
        id: '234'
      }
    });
    const action = actions.setFilterParam('startDate', '2017-01-23');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        filter: {
          id: '234',
          startDate: '2017-01-23'
        }
      })
    );
  });

  it('unapplies filters (all filters in section are off)', () => {
    const state = fromJS({
      filter: {
        id: '123',
        sources: ['ABANDONED', 'TERMINATED']
      }
    });
    const action = actions.clearFilter('sources');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        filter: { id: '123' }
      })
    );
  });
});
