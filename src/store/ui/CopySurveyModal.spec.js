import { fromJS } from 'immutable';

import reducer, * as actions from './CopySurveyModal';

////////////

describe('CopySurveyModal Duck', () => {
  it('opens the modal', () => {
    const state = fromJS({
      isOpen: false,
      surveyTitle: ''
    });
    const action = actions.openCopySurveyModal('My Survey');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: true,
        surveyTitle: 'Copy of My Survey'
      })
    );
  });

  it('closes the modal', () => {
    const state = fromJS({
      isOpen: true
    });
    const action = actions.dismissCopySurveyModal();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isOpen: false
      })
    );
  });
});
