import { fromJS } from 'immutable';

import reducer, * as actions from './InlineEditor';

describe('InlineEditor Module', () => {
  it('switches an editor from view mode to edit mode', () => {
    const state = fromJS({
      isEditing: {}
    });
    const action = actions.showEditor('testEditorId');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isEditing: { testEditorId: true }
      })
    );
  });

  it('removes editing flags, errors and values when going back to view mode', () => {
    const state = fromJS({
      isEditing: { testEditorId: true },
      editorErrors: { testEditorId: 'some error' },
      updatedValues: { testEditorId: 'taco' }
    });
    const action = actions.hideEditor('testEditorId');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isEditing: {},
        editorErrors: {},
        updatedValues: {}
      })
    );
  });

  it('does not cause chaos when hiding an editor that is not showing', () => {
    const state = fromJS({
      isEditing: { otherEditorId: true },
      updatedValues: {
        otherEditorId: 'test'
      },
      editorErrors: {
        otherEditorId: 'some error'
      }
    });
    const action = actions.hideEditor('hiddenEditorId');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        isEditing: { otherEditorId: true },
        updatedValues: {
          otherEditorId: 'test'
        },
        editorErrors: {
          otherEditorId: 'some error'
        }
      })
    );
  });

  it('validates a value is not empty or sets an error', () => {
    const state = fromJS({
      updatedValues: {
        testEditorId: ''
      },
      editorErrors: {}
    });
    const rules = {
      notEmpty: true
    };
    const action = actions.validateValue('testEditorId', rules);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        updatedValues: {
          testEditorId: ''
        },
        editorErrors: {
          testEditorId: [actions.errorText.notEmpty]
        }
      })
    );
  });

  it('validates a value is not empty or sets an error', () => {
    const state = fromJS({
      updatedValues: {
        testEditorId: '   '
      },
      editorErrors: {}
    });
    const rules = {
      notEmpty: true
    };
    const action = actions.validateValue('testEditorId', rules);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        updatedValues: {
          testEditorId: '   '
        },
        editorErrors: {
          testEditorId: [actions.errorText.notSpaces]
        }
      })
    );
  });

  it('validates a value is not too long or sets an error', () => {
    const state = fromJS({
      updatedValues: {
        testEditorId: 'Is this too long?'
      },
      editorErrors: {}
    });
    const rules = {
      maxLength: 10
    };
    const action = actions.validateValue('testEditorId', rules);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        updatedValues: {
          testEditorId: 'Is this too long?'
        },
        editorErrors: {
          testEditorId: [
            actions.errorText.tooLong.replace('%MAX_LENGTH%', 10)
          ]
        }
      })
    );
  });
});
