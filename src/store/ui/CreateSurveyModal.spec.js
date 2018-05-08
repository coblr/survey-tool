import { fromJS } from 'immutable';

import reducer, * as actions from './CreateSurveyModal';

////////////

describe('CreateSurveyModal Duck', () => {
  it('opens the modal by setting active to true', () => {
    const state = fromJS({ isOpen: false });
    const action = actions.openCreateSurveyModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(fromJS({ isOpen: true }));
  });

  it('closes the modal and resets the fields', () => {
    const state = fromJS({
      isOpen: true,
      title: {
        value: 'Dirty Title',
        dirty: true,
        touched: true
      }
    });
    const action = actions.dismissCreateSurveyModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false,
        title: {
          value: '',
          dirty: false,
          touched: false
        }
      })
    );
  });

  it('updates modal fields and marks field as untouched and dirty', () => {
    const state = fromJS({
      title: {
        value: '',
        dirty: false,
        touched: false
      }
    });
    const action = actions.updateField({
      name: 'title',
      value: 'Test'
    });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        title: {
          value: 'Test',
          dirty: true,
          touched: false
        }
      })
    );
  });

  it('marks fields as "touched" when field is blurred', () => {
    const state = fromJS({
      title: {
        value: 'Test',
        dirty: true,
        touched: false
      }
    });
    const action = actions.blurField({ name: 'title' });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        title: {
          value: 'Test',
          dirty: true,
          touched: true
        }
      })
    );
  });
});
