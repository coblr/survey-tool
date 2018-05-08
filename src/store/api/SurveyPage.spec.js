import { fromJS } from 'immutable';

import reducer, * as PageActions from './SurveyPage';
import * as SurveyActions from './Survey';
import * as QuestionActions from './SurveyQuestion';

const actions = Object.assign(
  {},
  PageActions,
  SurveyActions,
  QuestionActions
);

////////////

describe('SurveyPage Store', () => {
  describe('Creating Pages', () => {
    it('sets a request flag when creating a page', () => {
      const state = fromJS({
        creatingPages: {}
      });
      const action = {
        type: actions.CREATE_PAGE_REQUEST,
        meta: { index: 2 }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingPages: { '2': true }
        })
      );
    });

    it('creates new pages and removes the request flag', () => {
      const state = fromJS({
        creatingPages: { '2': true },
        surveyPageMap: {}
      });
      const action = {
        type: actions.CREATE_PAGE_SUCCESS,
        meta: { surveyId: '123', index: 2 },
        payload: {
          id: '58bf5412acbff30001df3593',
          lastModified: 1488933906114,
          created: 1488933906114,
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
          creatingPages: {},
          surveyPageMap: {
            '58bf5412acbff30001df3593': {
              id: '58bf5412acbff30001df3593',
              lastModified: 1488933906114,
              created: 1488933906114,
              questions: [],
              logic: {
                'page:skip': {
                  predicates: {}
                }
              }
            }
          }
        })
      );
    });

    it('creates a new page at a specific point in the survey', () => {
      const state = fromJS({
        creatingPages: { '2': true },
        surveyPageMap: {}
      });
      const action = {
        type: actions.CREATE_PAGE_SUCCESS,
        meta: {
          surveyId: '123',
          index: 2
        },
        payload: {
          id: '58bf5412acbff30001df3593',
          lastModified: 1488933906114,
          created: 1488933906114,
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
          creatingPages: {},
          surveyPageMap: {
            '58bf5412acbff30001df3593': {
              id: '58bf5412acbff30001df3593',
              lastModified: 1488933906114,
              created: 1488933906114,
              questions: [],
              logic: {
                'page:skip': {
                  predicates: {}
                }
              }
            }
          }
        })
      );
    });
  });

  describe('Updating Pages', () => {
    it('sets a request flag when updating a page', () => {
      const state = fromJS({
        updatingPages: {}
      });
      const action = {
        type: actions.UPDATE_PAGE_REQUEST,
        meta: { pageId: 'p123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingPages: {
            p123: true
          }
        })
      );
    });

    it('updates the page and removes the request flag', () => {
      const state = fromJS({
        updatingPages: {
          p123: true
        },
        surveyPageMap: {
          p111: {
            id: 'p111',
            someField: 'original value',
            questions: ['111', '222']
          },
          p123: {
            id: 'p123',
            someField: 'original 123 value',
            questions: ['333', '444']
          }
        }
      });
      const action = {
        type: actions.UPDATE_PAGE_SUCCESS,
        meta: { pageId: 'p123' },
        payload: {
          id: 'p123',
          someField: 'new 123 value',
          questions: [
            { id: '333', text: 'question3' },
            { id: '444', text: 'question4' }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingPages: {},
          surveyPageMap: {
            p111: {
              id: 'p111',
              someField: 'original value',
              questions: ['111', '222']
            },
            p123: {
              id: 'p123',
              someField: 'new 123 value',
              questions: ['333', '444']
            }
          }
        })
      );
    });

    it('stores any update error and removes the request flag', () => {
      const state = fromJS({
        updatingPages: { p123: true },
        updatePageErrors: {}
      });
      const action = {
        type: actions.UPDATE_PAGE_ERROR,
        meta: { pageId: 'p123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem updating page'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingPages: {},
          updatePageErrors: {
            p123: {
              status: 400,
              message: 'Problem updating page'
            }
          }
        })
      );
    });
  });

  describe('Deleting Pages', () => {
    it('sets a request flag for deleting pages', () => {
      const state = fromJS({
        deletingPages: {}
      });
      const action = {
        type: actions.DELETE_PAGE_REQUEST,
        meta: { pageId: 'p123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingPages: { p123: true }
        })
      );
    });

    it('removes deleted pages and removes request flag', () => {
      const state = fromJS({
        deletingPages: { p1231: true },
        surveyPageMap: {
          p234: { id: 'p234' },
          p1231: { id: 'p1231' },
          p345: { id: 'p345' }
        },
        deletePageErrors: {
          p1231: {
            status: 409,
            message: 'Some Error'
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
          deletingPages: {},
          surveyPageMap: {
            p234: { id: 'p234' },
            p345: { id: 'p345' }
          },
          deletePageErrors: {}
        })
      );
    });

    it('stores any delete error and removes the request flag', () => {
      const state = fromJS({
        deletingPages: { p123: true },
        deletePageErrors: {}
      });
      const action = {
        type: actions.DELETE_PAGE_ERROR,
        meta: { pageId: 'p123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem deleting page'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingPages: {},
          deletePageErrors: {
            p123: {
              status: 400,
              message: 'Problem deleting page'
            }
          }
        })
      );
    });
  });

  describe('Deleting Page Logic', () => {
    it('sets a request flag when deleting page logic', () => {
      const state = fromJS({
        deletingLogic: {}
      });
      const action = {
        type: actions.DELETE_LOGIC_REQUEST,
        meta: { pageId: 'p123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingLogic: {
            p123: true
          }
        })
      );
    });

    it('removes the branchLogic from the page and removes request flag', () => {
      const state = fromJS({
        deletingLogic: { p123: true },
        surveyPageMap: {
          p123: {
            id: 'p123',
            branchLogic: {},
            questions: []
          }
        }
      });
      const action = {
        type: actions.DELETE_LOGIC_SUCCESS,
        meta: { pageId: 'p123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingLogic: {},
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: []
            }
          }
        })
      );
    });

    it('store any delete logic error and removes the request flag', () => {
      const state = fromJS({
        deletingLogic: { p123: true },
        deleteLogicErrors: {}
      });
      const action = {
        type: actions.DELETE_LOGIC_ERROR,
        meta: { pageId: 'p123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem deleting logic'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingLogic: {},
          deleteLogicErrors: {
            p123: {
              status: 400,
              message: 'Problem deleting logic'
            }
          }
        })
      );
    });
  });

  describe('Reording Questions', () => {
    it('sets a request flag when reordering questions', () => {
      const state = fromJS({
        reorderingQuestions: {}
      });
      const action = {
        type: actions.QUESTION_ORDER_REQUEST,
        meta: { pageId: 'p123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          reorderingQuestions: { p123: true }
        })
      );
    });

    it('reorders questions within a page', () => {
      const state = fromJS({
        reorderingQuestions: { p123: true },
        surveyPageMap: {
          p123: {
            id: 'p123',
            questions: ['q1', 'q2', 'q3']
          }
        }
      });
      const action = {
        type: actions.QUESTION_ORDER_SUCCESS,
        meta: { pageId: 'p123' },
        payload: {
          questionOrder: ['q2', 'q1', 'q3']
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          reorderingQuestions: {},
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['q2', 'q1', 'q3']
            }
          }
        })
      );
    });

    it('stores any reorder errors and removes the flag', () => {});
  });

  describe('Moving Questions', () => {
    it('sets a request flag when moving questions', () => {
      const state = fromJS({
        movingQuestions: {}
      });
      const action = {
        type: actions.QUESTION_MOVE_REQUEST,
        meta: {
          fromPageId: 'p123',
          toPageId: 'p234'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          movingQuestions: {
            p123: true,
            p234: true
          }
        })
      );
    });

    it('moves questions from page to page', () => {
      const state = fromJS({
        movingQuestions: { p123: true, p234: true },
        surveyPageMap: {
          p123: {
            id: 'p123',
            questions: ['q1', 'q2', 'q3']
          },
          p234: {
            id: 'p234',
            questions: ['qq1', 'qq2', 'qq3']
          }
        }
      });
      const action = {
        type: actions.QUESTION_MOVE_SUCCESS,
        meta: {
          fromPageId: 'p123',
          toPageId: 'p234',
          position: 1
        },
        payload: {
          questionIds: ['q1', 'q2']
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          movingQuestions: {},
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['q3']
            },
            p234: {
              id: 'p234',
              questions: ['qq1', 'q1', 'q2', 'qq2', 'qq3']
            }
          }
        })
      );
    });

    it('stores any move errors and removes the flag', () => {
      const state = fromJS({
        movingQuestions: { p123: true, p234: true },
        moveQuestionErrors: {}
      });
      const action = {
        type: actions.QUESTION_MOVE_ERROR,
        meta: {
          fromPageId: 'p123',
          toPageId: 'p234'
        },
        payload: {
          status: 409,
          response: {
            errorMessage: 'Some Error'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          movingQuestions: {},
          moveQuestionErrors: {
            p123: {
              status: 409,
              message: 'Some Error'
            }
          }
        })
      );
    });
  });

  describe('Clearing Errors', () => {
    it('clears page delete errors for a given page', () => {
      const state = fromJS({
        deletePageErrors: {
          p123: {
            status: 409,
            message: 'Some Error'
          }
        }
      });
      const action = actions.clearDeletePageError('p123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletePageErrors: {}
        })
      );
    });
  });

  describe('Survey Side Effects', () => {
    it('stores pages from a fetched list of surveys', () => {
      const state = fromJS({
        surveyPageMap: {},
        fetching: true
      });
      const action = {
        type: actions.FETCH_SURVEYS_SUCCESS,
        payload: {
          content: [
            {
              id: '123',
              title: 's1',
              pages: [
                {
                  id: 'p1231',
                  questions: [
                    {
                      id: 'q123p1234',
                      questionText: 'test question',
                      questionType: 'SINGLE_SELECT_LIST',
                      answers: []
                    }
                  ]
                }
              ]
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
          surveyPageMap: {
            p1231: { id: 'p1231', questions: ['q123p1234'] },
            p2341: { id: 'p2341' }
          },
          fetching: false
        })
      );
    });

    it('stores pages from a single survey', () => {
      const state = fromJS({
        fetching: true,
        surveyPageMap: {}
      });
      const action = {
        type: actions.FETCH_SURVEY_SUCCESS,
        payload: {
          id: '123',
          title: 's1',
          pages: [
            {
              id: 'p1231',
              questions: [
                {
                  id: 'q123p1234',
                  questionText: 'test question',
                  questionType: 'SINGLE_SELECT_LIST',
                  answers: []
                }
              ]
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetching: false,
          surveyPageMap: {
            p1231: { id: 'p1231', questions: ['q123p1234'] }
          }
        })
      );
    });

    it('deletes survey pages when a survey is deleted', () => {
      const state = fromJS({
        surveyPageMap: {
          p123: { id: 'p123' },
          p234: { id: 'p234' },
          p345: { id: 'p345' }
        },
        fetching: true
      });
      const action = {
        type: actions.DELETE_SURVEY_SUCCESS,
        meta: {
          survey: {
            id: '123',
            pages: ['p123', 'p234']
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyPageMap: {
            p345: { id: 'p345' }
          },
          fetching: false
        })
      );
    });

    it('stores survey pages when a survey is copied', () => {
      const state = fromJS({
        surveyPageMap: {}
      });
      const action = {
        type: actions.COPY_SURVEY_SUCCESS,
        meta: { origSurveyId: '234' },
        payload: {
          id: '123',
          title: 's1',
          pages: [
            {
              id: 'p1231',
              questions: [
                {
                  id: 'q123p1234',
                  questionText: 'test question',
                  questionType: 'SINGLE_SELECT_LIST',
                  answers: []
                }
              ]
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyPageMap: {
            p1231: { id: 'p1231', questions: ['q123p1234'] }
          }
        })
      );
    });

    it('makes sure to carry over temp pages when survey is updated', () => {
      const state = fromJS({
        surveyPageMap: {
          p123: {
            id: 'p123',
            questions: ['temp123']
          }
        }
      });
      const action = {
        type: actions.UPDATE_SURVEY_SUCCESS,
        payload: {
          id: '123',
          title: 's1',
          pages: [
            {
              id: 'p123'
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['temp123']
            }
          },
          fetching: false
        })
      );
    });
  });

  describe('Question Side Effects', () => {
    describe('Initializing Questions', () => {
      // because of the nature of the temporary IDs, which
      // are timestamp based, I can't really call the
      // initQuestion method and create a timeStamp, and run
      // the assertions within the same millisecond. I'm going
      // to have to just assume that the initQuestion method
      // runs correctly, and mock the action that it would return.
      // This way I can control the tempId better and run a proper test.
      // const action = actions.initQuestion('p123', 1);
      const timeStamp = JSON.stringify(new Date());

      it('initializes a temp question after last question in a page', () => {
        const state = fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: []
            }
          }
        });
        const action = {
          type: actions.INIT_QUESTION,
          payload: {
            id: timeStamp,
            pageId: 'p123',
            index: 0
          }
        };
        const nextState = reducer(state, action);
        expect(nextState).toEqual(
          fromJS({
            surveyPageMap: {
              p123: {
                id: 'p123',
                questions: [timeStamp]
              }
            }
          })
        );
      });

      it('initializes a temp question at a specific index in a page', () => {
        const state = fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['111', '222', '333']
            }
          }
        });
        const action = {
          type: actions.INIT_QUESTION,
          payload: {
            id: timeStamp,
            pageId: 'p123',
            index: 1
          }
        };
        const nextState = reducer(state, action);
        expect(nextState).toEqual(
          fromJS({
            surveyPageMap: {
              p123: {
                id: 'p123',
                questions: ['111', timeStamp, '222', '333']
              }
            }
          })
        );
      });

      it('uninitializes an initialized question', () => {
        const state = fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['111', timeStamp, '222', '333']
            }
          }
        });
        const action = {
          type: actions.UNINIT_QUESTION,
          payload: {
            tempId: timeStamp,
            pageId: 'p123'
          }
        };
        const nextState = reducer(state, action);
        expect(nextState).toEqual(
          fromJS({
            surveyPageMap: {
              p123: {
                id: 'p123',
                questions: ['111', '222', '333']
              }
            }
          })
        );
      });

      it('removes temporary questions from pages', () => {
        const state = fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['111', '2017-08-03T18:17:49.241Z']
            },
            p234: {
              id: 'p234',
              questions: ['2017-08-03T18:17:49.241Z', '222']
            }
          }
        });
        const action = actions.removeTempQuestions();
        const nextState = reducer(state, action);
        expect(nextState).toEqual(
          fromJS({
            surveyPageMap: {
              p123: {
                id: 'p123',
                questions: ['111']
              },
              p234: {
                id: 'p234',
                questions: ['222']
              }
            }
          })
        );
      });
    });

    describe('Creating Questions', () => {
      it('adds newly created questions to the respective page', () => {
        const state = fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['tempId123']
            }
          },
          fetching: true
        });
        const action = {
          type: actions.CREATE_QUESTION_SUCCESS,
          meta: { pageId: 'p123', tempId: 'tempId123' },
          payload: {
            id: '58c041c8acbff30001df3594',
            lastModified: 1488994760685,
            created: 1488994760685,
            text: 'new question?',
            answers: [],
            rows: [],
            columns: [],
            randomizeAnswers: false,
            mandatory: false,
            hidden: false,
            type: 'SINGLE_SELECT_LIST'
          }
        };
        const nextState = reducer(state, action);
        expect(nextState).toEqual(
          fromJS({
            surveyPageMap: {
              p123: {
                id: 'p123',
                questions: ['58c041c8acbff30001df3594']
              }
            },
            fetching: false
          })
        );
      });
    });

    describe('Deleting Questions', () => {
      it('removes deleted questions from the respective page', () => {
        const state = fromJS({
          surveyPageMap: {
            p123: {
              id: 'p123',
              questions: ['q1231', 'q1232']
            }
          },
          fetching: true
        });
        const action = {
          type: actions.DELETE_QUESTION_SUCCESS,
          meta: {
            pageId: 'p123',
            questionId: 'q1231'
          }
        };
        const nextState = reducer(state, action);
        expect(nextState).toEqual(
          fromJS({
            surveyPageMap: {
              p123: {
                id: 'p123',
                questions: ['q1232']
              }
            },
            fetching: false
          })
        );
      });
    });
  });
});
