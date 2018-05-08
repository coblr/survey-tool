import { fromJS } from 'immutable';

import reducer, * as actions from './SurveyReportFilter';

describe('SurveyReportFilter Module', () => {
  describe('Creating Filters', () => {
    it('sets a flag when creating a filter', () => {
      const state = fromJS({
        creatingSurveyFilters: {}
      });
      const action = {
        type: actions.CREATE_FILTER_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingSurveyFilters: { '123': true }
        })
      );
    });

    it('saves new filter and removes the flag', () => {
      const state = fromJS({
        creatingSurveyFilters: { '123': true },
        surveyFilters: {}
      });
      const action = {
        type: actions.CREATE_FILTER_SUCCESS,
        meta: { surveyId: '123' },
        payload: { filterProp: true }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingSurveyFilters: {},
          surveyFilters: {
            '123': [{ filterProp: true }]
          }
        })
      );
    });

    it('stores any create errors and removes the flag', () => {
      const state = fromJS({
        creatingSurveyFilters: { '123': true },
        surveyFilterErrors: {}
      });
      const action = {
        type: actions.CREATE_FILTER_ERROR,
        meta: { surveyId: '123' },
        payload: { error: 'Some Error' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingSurveyFilters: {},
          surveyFilterErrors: {
            '123': 'Some Error'
          }
        })
      );
    });
  });

  describe('Updating Filters', () => {
    it('sets a flag when updating a filter', () => {
      const state = fromJS({
        updatingSurveyFilters: {}
      });
      const action = {
        type: actions.UPDATE_FILTER_REQUEST,
        meta: { filterId: 'filter123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingSurveyFilters: { filter123: true }
        })
      );
    });

    it('updates the filter and removes the flag', () => {
      const state = fromJS({
        updatingSurveyFilters: { filter123: true },
        surveyFilters: {
          '123': [
            {
              id: 'filter123',
              title: 'My Filter One'
            }
          ]
        }
      });
      const action = {
        type: actions.UPDATE_FILTER_SUCCESS,
        meta: {
          surveyId: '123',
          filterId: 'filter123'
        },
        payload: {
          id: 'filter123',
          title: 'My Filter Two'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingSurveyFilters: {},
          surveyFilters: {
            '123': [
              {
                id: 'filter123',
                title: 'My Filter Two'
              }
            ]
          }
        })
      );
    });

    it('stores any update errors and removes the flag', () => {
      const state = fromJS({
        updatingSurveyFilters: { filter123: true },
        surveyFilterErrors: {}
      });
      const action = {
        type: actions.UPDATE_FILTER_ERROR,
        meta: { filterId: 'filter123' },
        payload: { error: 'Some Error' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingSurveyFilters: {},
          surveyFilterErrors: {
            filter123: 'Some Error'
          }
        })
      );
    });
  });

  describe('Deleting Filters', () => {
    it('sets a flag when deleting a filter', () => {
      const state = fromJS({
        deletingSurveyFilters: {}
      });
      const action = {
        type: actions.DELETE_FILTER_REQUEST,
        meta: { filterId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingSurveyFilters: { '123': true }
        })
      );
    });

    it('deletes the filter and removes the flag', () => {
      const state = fromJS({
        deletingSurveyFilters: { filter123: true },
        surveyFilters: {
          '123': [
            {
              id: 'filter123',
              title: 'My New Filter'
            }
          ]
        }
      });
      const action = {
        type: actions.DELETE_FILTER_SUCCESS,
        meta: {
          surveyId: '123',
          filterId: 'filter123'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingSurveyFilters: {},
          surveyFilters: {
            '123': []
          }
        })
      );
    });

    it('stores any delete errors and removes the flag', () => {
      const state = fromJS({
        deletingSurveyFilters: { '123': true },
        surveyFilterErrors: {}
      });
      const action = {
        type: actions.DELETE_FILTER_ERROR,
        meta: { filterId: '123' },
        payload: { error: 'Some Error' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingSurveyFilters: {},
          surveyFilterErrors: {
            '123': 'Some Error'
          }
        })
      );
    });
  });

  describe('Fetch Survey Filters', () => {
    it('sets a flag when fetching survey filters', () => {
      const state = fromJS({
        fetchingSurveyFilters: {}
      });
      const action = {
        type: actions.FETCH_FILTERS_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveyFilters: { '123': true }
        })
      );
    });

    it('stores the fetched list of filters for this survey', () => {
      const state = fromJS({
        fetchingSurveyFilters: { '123': true },
        surveyFilters: {}
      });
      const action = {
        type: actions.FETCH_FILTERS_SUCCESS,
        meta: { surveyId: '123' },
        payload: [
          { id: 'filter1', filterProp: true },
          { id: 'filter2', filterProp: false }
        ]
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveyFilters: {},
          surveyFilters: {
            '123': [
              { id: 'filter1', filterProp: true },
              { id: 'filter2', filterProp: false }
            ]
          }
        })
      );
    });

    it('stores any filter fetch error and removes the flag', () => {
      const state = fromJS({
        fetchingSurveyFilters: { '123': true },
        surveyFilterErrors: {}
      });
      const action = {
        type: actions.FETCH_FILTERS_ERROR,
        meta: { surveyId: '123' },
        payload: { error: 'Some Error' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveyFilters: {},
          surveyFilterErrors: {
            '123': 'Some Error'
          }
        })
      );
    });
  });

  describe('Fetching Survey Filter Mapping', () => {
    it('sets a flag when fetching mapping', () => {
      const state = fromJS({
        fetchingFilterMappings: {}
      });
      const action = {
        type: actions.FETCH_MAPPING_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingFilterMappings: { '123': true }
        })
      );
    });

    it('stores the fetched the map between survey and filters', () => {
      const state = fromJS({
        fetchingFilterMappings: { '123': true },
        filterMappings: {}
      });
      const action = {
        type: actions.FETCH_MAPPING_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          id: '123',
          surveyId: '123',
          mappings: {
            realtime: 'filter1',
            individual: 'filter2'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingFilterMappings: {},
          filterMappings: {
            '123': {
              realtime: 'filter1',
              individual: 'filter2'
            }
          }
        })
      );
    });

    it('stores any map fetch error and removes the flag', () => {
      const state = fromJS({
        fetchingFilterMappings: { '123': true },
        filterMappingErrors: {}
      });
      const action = {
        type: actions.FETCH_MAPPING_ERROR,
        meta: { surveyId: '123' },
        payload: { error: 'Some Error' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingFilterMappings: {},
          filterMappingErrors: {
            '123': 'Some Error'
          }
        })
      );
    });
  });

  describe('Updating Filter Mapping', () => {
    it('sets a flag when updating filter mapping', () => {
      const state = fromJS({
        updatingFilterMappings: {}
      });
      const action = {
        type: actions.UPDATE_MAPPING_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingFilterMappings: { '123': true }
        })
      );
    });

    it('stores the updated map', () => {
      const state = fromJS({
        updatingFilterMappings: { '123': true },
        filterMappings: {
          '123': {
            realtime: 'f12',
            individual: 'f24'
          }
        }
      });
      const action = {
        type: actions.UPDATE_MAPPING_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          id: '123',
          surveyId: '123',
          mappings: {
            realtime: 'f22',
            individual: 'f24'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingFilterMappings: {},
          filterMappings: {
            '123': {
              realtime: 'f22',
              individual: 'f24'
            }
          }
        })
      );
    });

    it('stores any update error and removes the flag', () => {
      const state = fromJS({
        updatingFilterMappings: { '123': true },
        filterMappingErrors: {}
      });
      const action = {
        type: actions.UPDATE_MAPPING_ERROR,
        meta: { surveyId: '123' },
        payload: { error: 'Some Error' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingFilterMappings: {},
          filterMappingErrors: {
            '123': 'Some Error'
          }
        })
      );
    });
  });
});
