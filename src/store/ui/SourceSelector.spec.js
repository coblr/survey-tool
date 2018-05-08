import { fromJS } from 'immutable';

import reducer, * as actions from './SourceSelector';

describe('SourceSelector Module', () => {
  describe('Source Categories', () => {
    it('toggles source categories to expand/collapse accordion', () => {
      const state = fromJS({
        selectedCategory: ''
      });
      const action = actions.toggleCategory('link');
      const onState = reducer(state, action);
      expect(onState).toEqual(
        fromJS({
          selectedCategory: 'link'
        })
      );

      const offState = reducer(onState, action);
      expect(offState).toEqual(
        fromJS({
          selectedCategory: ''
        })
      );
    });
  });

  describe('Embedding Survey', () => {
    it('sets and uses embed size to determine width and height', () => {
      const state = fromJS({
        embedSize: '',
        embedWidth: '',
        embedHeight: ''
      });
      const action = actions.setEmbedSize('medium');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          embedSize: 'medium',
          embedWidth: '300',
          embedHeight: 'AUTO'
        })
      );
    });

    it('sets the embed width', () => {
      const state = fromJS({
        embedWidth: ''
      });
      const action = actions.setEmbedWidth('300');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          embedWidth: '300'
        })
      );
    });

    it('sets the embed height', () => {
      const state = fromJS({
        embedHeight: 'AUTO'
      });
      const action = actions.setEmbedHeight('200');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          embedHeight: '200'
        })
      );
    });
  });
});
