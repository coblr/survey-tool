import { fromJS } from 'immutable';

import reducer, * as SurveyActions from './Survey';
import * as PageActions from './SurveyPage';
import * as QuestionActions from './SurveyQuestion';

const actions = Object.assign(
  {},
  SurveyActions,
  PageActions,
  QuestionActions
);

////////////

describe('Survey Store', () => {
  describe('Fetching All Surveys', () => {
    it('sets a request flag when fetching all surveys', () => {
      const state = fromJS({
        fetchingAllSurveys: false
      });
      const action = {
        type: actions.FETCH_SURVEYS_REQUEST
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingAllSurveys: true
        })
      );
    });

    it('stores all surveys and removes the request flag', () => {
      const state = fromJS({
        surveys: [],
        surveyMap: {},
        fetchingAllSurveys: true
      });
      const action = {
        type: actions.FETCH_SURVEYS_SUCCESS,
        payload: {
          content: [
            {
              id: '123',
              title: 's1',
              pages: [{ id: 'p1231' }]
            },
            {
              id: '234',
              title: 's2',
              pages: [{ id: 'p2341' }]
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveys: ['123', '234'],
          surveyMap: {
            '123': { id: '123', title: 's1', pages: ['p1231'] },
            '234': { id: '234', title: 's2', pages: ['p2341'] }
          },
          fetchingAllSurveys: false
        })
      );
    });

    it('sets an empty object if no surveys are returned', () => {
      const state = fromJS({
        surveys: [],
        surveyMap: {},
        fetchingAllSurveys: true
      });
      const action = {
        type: actions.FETCH_SURVEYS_SUCCESS,
        payload: {
          content: []
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveys: [],
          surveyMap: {},
          fetchingAllSurveys: false
        })
      );
    });

    it('handles errors when fetching survey list fails', () => {
      const state = fromJS({
        fetchingAllSurveys: true,
        fetchAllSurveysError: ''
      });
      const action = {
        type: actions.FETCH_SURVEYS_ERROR,
        payload: {
          status: 400,
          response: {
            errorMessage: 'Cannot fetch all surveys'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingAllSurveys: false,
          fetchAllSurveysError: {
            status: 400,
            message: 'Cannot fetch all surveys'
          }
        })
      );
    });
  });

  describe('Fetching Single Surveys', () => {
    it('sets a request flag for the survey being fetched', () => {
      const state = fromJS({
        fetchingSurveys: {}
      });
      const action = {
        type: actions.FETCH_SURVEY_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveys: { '123': true }
        })
      );
    });

    it('fetches a single survey and adds to list', () => {
      const state = fromJS({
        fetchingSurveys: { '123': true },
        surveys: ['ogSurvey'],
        surveyMap: {
          ogSurvey: { id: 'ogSurvey', title: 'OG Survey' }
        }
      });
      const action = {
        type: actions.FETCH_SURVEY_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          id: '123',
          title: 'survey 123'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveys: {},
          surveys: ['ogSurvey', '123'],
          surveyMap: {
            ogSurvey: { id: 'ogSurvey', title: 'OG Survey' },
            '123': { id: '123', title: 'survey 123' }
          }
        })
      );
    });

    it('stores any error from fetching a single survey', () => {
      const state = fromJS({
        fetchingSurveys: { '123': true },
        fetchSurveyErrors: {}
      });
      const action = {
        type: actions.FETCH_SURVEY_ERROR,
        meta: { surveyId: '123' },
        payload: {
          status: 404,
          response: {
            errorMessage: 'Could not find Survey 123'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveys: {},
          fetchSurveyErrors: {
            '123': {
              status: 404,
              message: 'Could not find Survey 123'
            }
          }
        })
      );
    });
  });

  describe('Creating Surveys', () => {
    it('sets a request flag when creating a survey', () => {
      const state = fromJS({
        creatingSurvey: false
      });
      const action = {
        type: actions.CREATE_SURVEY_REQUEST
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingSurvey: true
        })
      );
    });

    it('adds created survey to list, sets as current and removes flag', () => {
      const state = fromJS({
        creatingSurvey: true,
        surveys: ['234'],
        surveyMap: {
          '234': {}
        }
      });
      const action = {
        type: actions.CREATE_SURVEY_SUCCESS,
        payload: {
          id: '123',
          title: 'new survey',
          pages: [{ id: 'p123' }]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingSurvey: false,
          surveys: ['234', '123'],
          surveyMap: {
            '234': {},
            '123': {
              id: '123',
              title: 'new survey',
              pages: ['p123']
            }
          }
        })
      );
    });

    it('stores any error for creating surveys and removes request flag', () => {
      const state = fromJS({
        creatingSurvey: true,
        createSurveyError: ''
      });
      const action = {
        type: actions.CREATE_SURVEY_ERROR,
        payload: {
          status: 400,
          response: {
            errorMessage: 'Cannot create survey',
            fieldName: 'surveyField'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingSurvey: false,
          createSurveyError: {
            status: 400,
            field: 'surveyField',
            message: 'Cannot create survey'
          }
        })
      );
    });
  });

  describe('Updating Surveys', () => {
    it('sets a request flag when updating a survey', () => {
      const state = fromJS({
        updatingSurveys: {}
      });
      const action = {
        type: actions.UPDATE_SURVEY_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingSurveys: { '123': true }
        })
      );
    });

    it('updates the survey and removes the request flag', () => {
      const state = fromJS({
        updatingSurveys: { '123': true },
        surveyMap: {
          '123': {
            id: '123',
            title: 'survey 1',
            pages: ['p123']
          }
        }
      });
      const action = {
        type: actions.UPDATE_SURVEY_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          id: '123',
          title: 'survey ONE',
          pages: [{ id: 'p123' }]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingSurveys: {},
          surveyMap: {
            '123': {
              id: '123',
              title: 'survey ONE',
              pages: ['p123']
            }
          }
        })
      );
    });

    it('stores any error for updating and removes request flag', () => {
      const state = fromJS({
        updatingSurveys: { '123': true },
        updateSurveyErrors: {}
      });
      const action = {
        type: actions.UPDATE_SURVEY_ERROR,
        meta: { surveyId: '123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Cannot update survey',
            fieldName: 'surveyField'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingSurveys: {},
          updateSurveyErrors: {
            '123': {
              status: 400,
              field: 'surveyField',
              message: 'Cannot update survey'
            }
          }
        })
      );
    });
  });

  describe('Deleting Surveys', () => {
    it('sets a request flag when updating a survey', () => {
      const state = fromJS({
        deletingSurveys: {}
      });
      const action = {
        type: actions.DELETE_SURVEY_REQUEST,
        meta: { survey: { id: '123' } }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingSurveys: { '123': true }
        })
      );
    });

    it('deletes the survey and removes the request flag', () => {
      const state = fromJS({
        deletingSurveys: { '123': true },
        surveys: ['123', '234'],
        surveyMap: {
          '123': { id: '123', title: 'survey 1' },
          '234': { id: '234', title: 'survey 2' }
        },
        filteredSurveys: ['234'],
        currentSurveyId: '234'
      });
      const action = {
        type: actions.DELETE_SURVEY_SUCCESS,
        meta: { survey: { id: '123', title: 'survey 1' } }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingSurveys: {},
          surveys: ['234'],
          surveyMap: {
            '234': { id: '234', title: 'survey 2' }
          },
          filteredSurveys: [],
          currentSurveyId: ''
        })
      );
    });

    it('stores any delete errors and removes request flag', () => {
      const state = fromJS({
        deletingSurveys: { '123': true },
        deleteSurveyErrors: {}
      });
      const action = {
        type: actions.DELETE_SURVEY_ERROR,
        meta: { survey: { id: '123' } },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Cannot delete survey'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingSurveys: {},
          deleteSurveyErrors: {
            '123': {
              status: 400,
              message: 'Cannot delete survey'
            }
          }
        })
      );
    });
  });

  describe('Selecting Surveys', () => {
    it('selects surveys', () => {
      const state = fromJS({
        surveys: ['123'],
        surveyMap: { '123': { id: '123', title: 'survey 1' } },
        currentSurveyId: ''
      });
      const action = actions.selectSurvey('123');
      const nextState = reducer(state, action);
      expect(nextState.get('currentSurveyId')).toEqual('123');
    });

    it('clears current survey', () => {
      const state = fromJS({
        surveyMap: { '123': { id: '123', title: 'survey 1' } },
        currentSurveyId: '123'
      });
      const action = actions.selectSurvey();
      const nextState = reducer(state, action);
      expect(nextState.get('currentSurveyId')).toEqual('');
    });
  });

  describe('Survey Owner', () => {
    it('sets a request flag when fetching a survey owner', () => {
      const state = fromJS({
        fetchingOwners: {}
      });
      const action = {
        type: actions.FETCH_OWNER_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingOwners: { '123': true }
        })
      );
    });

    it('fetches the ownerId of a survey', () => {
      const state = fromJS({
        fetchingOwners: {},
        surveyOwners: {}
      });
      const action = {
        type: actions.FETCH_OWNER_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          id: 'werPr',
          lastModified: 1496247834808,
          created: 1496247817761,
          title: 'Survey With Logo',
          ownerId: '8ddfd21d-8db6-420e-a551-4369b26e94f4',
          allowBacktrack: false,
          allowMultipleFinishes: true,
          pages: [],
          conclusion: {},
          uid: 'werPr'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingOwners: {},
          surveyOwners: {
            '123': '8ddfd21d-8db6-420e-a551-4369b26e94f4'
          }
        })
      );
    });

    it('stores any owner fetch errors and removes request flag', () => {
      const state = fromJS({
        fetchingOwners: { '123': true },
        fetchOwnerErrors: {}
      });
      const action = {
        type: actions.FETCH_OWNER_ERROR,
        meta: { surveyId: '123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Cannot fetch owner'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingOwners: {},
          fetchOwnerErrors: {
            '123': {
              status: 400,
              message: 'Cannot fetch owner'
            }
          }
        })
      );
    });

    it('clears the owner for a specific survey', () => {
      const state = fromJS({
        surveyOwners: {
          '123': 'ownerId123333',
          '234': '234owner'
        }
      });
      const action = actions.clearOwner('123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyOwners: {
            '234': '234owner'
          }
        })
      );
    });
  });

  describe('Copying Surveys', () => {
    it('sets a flag when the survey is being copied', () => {
      const state = fromJS({
        copyingSurveys: {}
      });
      const action = {
        type: actions.COPY_SURVEY_REQUEST,
        meta: { origSurveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          copyingSurveys: { '123': true }
        })
      );
    });

    it('stores the copied survey, removes the flag, selects survey', () => {
      const state = fromJS({
        copyingSurveys: { '123': true },
        surveyMap: {}
      });
      const action = {
        type: actions.COPY_SURVEY_SUCCESS,
        meta: { origSurveyId: '123' },
        payload: {
          id: 'bbKCF',
          lastModified: 1498163109570,
          created: 1498110653751,
          title: 'swagger test',
          deleted: false,
          ownerId: '7e4aa6cc-20ef-471e-a34e-0eaf1cfcf5e2',
          allowBacktrack: false,
          allowMultipleFinishes: true,
          pages: []
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          copyingSurveys: {},
          surveyMap: {
            bbKCF: {
              id: 'bbKCF',
              lastModified: 1498163109570,
              created: 1498110653751,
              title: 'swagger test',
              deleted: false,
              ownerId: '7e4aa6cc-20ef-471e-a34e-0eaf1cfcf5e2',
              allowBacktrack: false,
              allowMultipleFinishes: true,
              pages: []
            }
          }
        })
      );
    });

    it('stores any error resulting from a bady copy', () => {
      const state = fromJS({
        copyingSurveys: { '123': true },
        copySurveyErrors: {}
      });
      const action = {
        type: actions.COPY_SURVEY_ERROR,
        meta: { origSurveyId: '123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Some Error'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          copyingSurveys: {},
          copySurveyErrors: {
            '123': {
              status: 400,
              message: 'Some Error'
            }
          }
        })
      );
    });
  });

  describe('Survey Filtering', () => {
    it('keyword filters surveys on survey title', () => {
      const state = fromJS({
        surveys: ['123', '234'],
        surveyMap: {
          '123': { id: '123', title: 'survey one' },
          '234': { id: '234', title: 'survey two' }
        },
        filterKeywords: '',
        filterKeywordRegex: /^.$/,
        filteredSurveys: []
      });
      const action = actions.filterSurveys('one');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveys: ['123', '234'],
          surveyMap: {
            '123': { id: '123', title: 'survey one' },
            '234': { id: '234', title: 'survey two' }
          },
          filterKeywords: 'one',
          filterKeywordRegex: /(one)/gi,
          filteredSurveys: ['123']
        })
      );
    });

    it('keyword filters surveys on survey ID', () => {
      const state = fromJS({
        surveys: ['123', '234'],
        surveyMap: {
          '123': { id: '123', title: 'survey one' },
          '234': { id: '234', title: 'survey two' }
        },
        filterKeywords: '',
        filterKeywordRegex: /^.$/,
        filteredSurveys: []
      });
      const action = actions.filterSurveys('123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveys: ['123', '234'],
          surveyMap: {
            '123': { id: '123', title: 'survey one' },
            '234': { id: '234', title: 'survey two' }
          },
          filterKeywords: '123',
          filterKeywordRegex: /(123)/gi,
          filteredSurveys: ['123']
        })
      );
    });

    it('resets the keyword filtering', () => {
      const state = fromJS({
        filteredSurveys: [],
        filterKeywords: 'test',
        filterKeywordRegex: /^test$/gi
      });
      const action = actions.resetSurveyFilters();
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          filteredSurveys: [],
          filterKeywords: '',
          filterKeywordRegex: /^[.]$/gi
        })
      );
    });
  });

  describe('Page Reordering', () => {
    it('sets a request flag when updating survey page order', () => {
      const state = fromJS({
        reorderingPages: {}
      });
      const action = {
        type: actions.UPDATE_PAGE_ORDER_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          reorderingPages: { '123': true }
        })
      );
    });

    it('updates the ordering of pages and removes the request flag', () => {
      const state = fromJS({
        reorderingPages: { '123': true },
        surveyMap: {
          '123': {
            id: '123',
            pages: ['111', '222', '333']
          }
        }
      });
      const action = {
        type: actions.UPDATE_PAGE_ORDER_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          pageOrder: ['222', '111', '333']
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          reorderingPages: {},
          surveyMap: {
            '123': {
              id: '123',
              pages: ['222', '111', '333']
            }
          }
        })
      );
    });

    it('stores any error for page ordering and removes request flag', () => {
      const state = fromJS({
        reorderingPages: { '123': true },
        reorderPageErrors: {}
      });
      const action = {
        type: actions.UPDATE_PAGE_ORDER_ERROR,
        meta: { surveyId: '123' },
        payload: {
          status: 409,
          response: {
            errorMessage: 'Cannot Reorder',
            fieldName: 'surveyField'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          reorderingPages: {},
          reorderPageErrors: {
            '123': {
              status: 409,
              field: 'surveyField',
              message: 'Cannot Reorder'
            }
          }
        })
      );
    });
  });

  describe('Survey Page CRUD', () => {
    it('sets a temporary page while the real page is created (end of page)', () => {
      const state = fromJS({
        surveyMap: {
          '123': {
            id: '123',
            title: 'survey one',
            pages: ['111', '222', '333']
          }
        }
      });
      const action = {
        type: actions.CREATE_PAGE_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyMap: {
            '123': {
              id: '123',
              title: 'survey one',
              pages: ['111', '222', '333', 'temp']
            }
          }
        })
      );
    });

    it('sets a temporary page while real page is created (between pages)', () => {
      const state = fromJS({
        surveyMap: {
          '123': {
            id: '123',
            title: 'survey one',
            pages: ['111', '222', '333']
          }
        }
      });
      const action = {
        type: actions.CREATE_PAGE_REQUEST,
        meta: { surveyId: '123', index: 1 }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyMap: {
            '123': {
              id: '123',
              title: 'survey one',
              pages: ['111', 'temp', '222', '333']
            }
          }
        })
      );
    });

    it('adds created pages to the end of the survey by default', () => {
      const state = fromJS({
        surveyMap: {
          '123': {
            id: '123',
            title: 'survey one',
            pages: ['111', 'temp']
          }
        }
      });
      const action = {
        type: actions.CREATE_PAGE_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          id: '58bf5412acbff30001df3593',
          questions: [],
          logic: {
            'page:skip': {
              predicates: {}
            }
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyMap: {
            '123': {
              id: '123',
              title: 'survey one',
              pages: ['111', '58bf5412acbff30001df3593']
            }
          }
        })
      );
    });

    it('creates a new page at a specific point in the survey', () => {
      const state = fromJS({
        surveyMap: {
          '123': {
            id: '123',
            title: 'survey one',
            pages: ['111', '222', 'temp', '333']
          }
        }
      });
      const action = {
        type: actions.CREATE_PAGE_SUCCESS,
        meta: { surveyId: '123', index: 2 },
        payload: {
          id: '58bf5412acbff30001df3593',
          questions: []
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyMap: {
            '123': {
              id: '123',
              title: 'survey one',
              pages: ['111', '222', '58bf5412acbff30001df3593', '333']
            }
          }
        })
      );
    });

    it('removes pages from surveys when pages are deleted', () => {
      const state = fromJS({
        surveyMap: {
          '123': {
            id: '123',
            pages: ['p234', 'p1231', 'p345']
          }
        }
      });
      const action = {
        type: actions.DELETE_PAGE_SUCCESS,
        meta: {
          surveyId: '123',
          page: { id: 'p1231' }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyMap: {
            '123': {
              id: '123',
              pages: ['p234', 'p345']
            }
          }
        })
      );
    });
  });
});
