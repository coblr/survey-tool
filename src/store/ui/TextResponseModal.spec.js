import { fromJS } from 'immutable';

import reducer, * as actions from './TextResponseModal';

////////////

describe('TextResponseModal Duck', () => {
  it('opens the modal, sets question and fieldId', () => {
    const state = fromJS({
      isOpen: false,
      question: {},
      answer: {},
      filterId: ''
    });
    const action = actions.openTextResponseModal(
      { questionId: '123' },
      { id: 'a123' },
      'f345'
    );
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        question: {
          questionId: '123'
        },
        answer: {
          id: 'a123'
        },
        filterId: 'f345'
      })
    );
  });

  it('closes the modal, clears the question and fieldId', () => {
    const state = fromJS({
      isOpen: true,
      question: {
        questionId: '123'
      },
      answer: {
        id: 'a123'
      },
      filterId: 'f345'
    });
    const action = actions.dismissTextResponseModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false,
        question: {},
        answer: {},
        filterId: ''
      })
    );
  });
});
