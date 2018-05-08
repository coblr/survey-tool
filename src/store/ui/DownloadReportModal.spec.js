import { fromJS } from 'immutable';

import reducer, * as actions from './DownloadReportModal';

describe('DownloadReportModal Module', () => {
  it('opens the modal', () => {
    const state = fromJS({
      isOpen: false,
      downloadParams: {}
    });
    const action = actions.openDownloadReportModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        downloadParams: {}
      })
    );
  });

  it('opens the modal with a filter ID', () => {
    const state = fromJS({
      isOpen: false,
      filterId: '',
      downloadParams: {}
    });
    const action = actions.openDownloadReportModal('123');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        filterId: '123',
        downloadParams: {
          filterId: '123'
        }
      })
    );
  });

  it('closes the modal and resets state', () => {
    const state = fromJS({
      isOpen: true,
      downloadParams: { thing: true },
      filterId: '123'
    });
    const action = actions.dismissDownloadReportModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false,
        downloadParams: {},
        filterId: ''
      })
    );
  });

  it('sets download parameters', () => {
    const state = fromJS({
      downloadParams: {}
    });
    const action = actions.setDownloadParam('test', '123');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        downloadParams: {
          test: '123'
        }
      })
    );
  });

  it('removes download parameter if false', () => {
    const state = fromJS({
      downloadParams: {
        test: true
      }
    });
    const action = actions.setDownloadParam('test', false);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        downloadParams: {}
      })
    );
  });
});
