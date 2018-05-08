import { fromJS } from 'immutable';

import reducer, * as actions from './QuestionOptionModal';

describe('QuestionOptionModal Duck', () => {
  it('opens the question option modal', () => {
    const state = fromJS({
      isOpen: false,
      currentQuestion: {}
    });
    const action = actions.openQuestionOptionModal({
      id: '123',
      mandatory: false,
      randomizeAnswers: false
    });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        currentQuestion: {
          id: '123',
          mandatory: false,
          randomizeAnswers: false
        }
      })
    );
  });

  it('closes the question option modal and forgets question', () => {
    const state = fromJS({
      isOpen: false,
      currentQuestion: {
        id: '123',
        mandatory: false,
        randomizeAnswers: false
      }
    });
    const action = actions.dismissQuestionOptionModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false,
        currentQuestion: {}
      })
    );
  });

  it('toggles the anchored property of a question answer/row', () => {
    const state = fromJS({
      currentQuestion: {
        answers: [{ anchored: false }, { anchored: false }]
      }
    });
    const action = actions.setAnswerAnchor('answers', true, 1);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        currentQuestion: {
          answers: [{ anchored: false }, { anchored: true }]
        }
      })
    );
  });

  it('toggles the exclusive property of a question answer/column', () => {
    const state = fromJS({
      currentQuestion: {
        columns: [{ exclusive: false }, { exclusive: false }]
      }
    });
    const action = actions.setAnswerExclusive('columns', true, 1);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        currentQuestion: {
          columns: [{ exclusive: false }, { exclusive: true }]
        }
      })
    );
  });
});
