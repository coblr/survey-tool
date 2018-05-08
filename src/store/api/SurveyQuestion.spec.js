import { fromJS } from 'immutable';

import reducer, * as QuestionActions from './SurveyQuestion';
import * as PageActions from './SurveyPage';
import * as SurveyActions from './Survey';

const actions = Object.assign(
  {},
  QuestionActions,
  PageActions,
  SurveyActions
);

////////////

describe('SurveyQuestion Store', () => {
  describe('Fetching Questions', () => {
    it('stores questions from a fetched list of surveys', () => {
      const state = fromJS({
        surveyQuestionMap: {}
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
                      answers: [
                        {
                          id: 'a234',
                          answerText: 'answer 1'
                        },
                        {
                          id: 'a235',
                          answerText: 'answer 2'
                        }
                      ]
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
          surveyQuestionMap: {
            q123p1234: {
              id: 'q123p1234',
              questionText: 'test question',
              questionType: 'SINGLE_SELECT_LIST',
              answers: [
                { id: 'a234', answerText: 'answer 1' },
                { id: 'a235', answerText: 'answer 2' }
              ]
            }
          }
        })
      );
    });

    it('stores questions from a single fetched survey', () => {
      const state = fromJS({
        surveyQuestionMap: {}
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
                  answers: [
                    {
                      id: 'a234',
                      answerText: 'answer 1'
                    },
                    {
                      id: 'a235',
                      answerText: 'answer 2'
                    }
                  ]
                }
              ]
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            q123p1234: {
              id: 'q123p1234',
              questionText: 'test question',
              questionType: 'SINGLE_SELECT_LIST',
              answers: [
                { id: 'a234', answerText: 'answer 1' },
                { id: 'a235', answerText: 'answer 2' }
              ]
            }
          }
        })
      );
    });
  });

  describe('Initializing Questions', () => {
    // because of the nature of the temporary IDs, which
    // are timestamp based, I can't really call the
    // initQuestion method and create a timeStamp, AND run
    // the assertions within the same millisecond. I'm going
    // to have to just assume that the initQuestion method
    // runs correctly, and mock the action that it would return.
    // This way I can control the tempId better and run a proper test.
    const timeStamp = JSON.stringify(new Date());

    it('creates an empty question that can be filled out for creation', () => {
      const state = fromJS({
        surveyQuestionMap: {},
        editingQuestions: {}
      });
      // see disclaimer in this describe block
      // const action = actions.initQuestion('p123', 1);
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
          surveyQuestionMap: {
            [timeStamp]: {
              id: timeStamp,
              pageId: 'p123'
            }
          },
          editingQuestions: { [timeStamp]: true }
        })
      );
    });

    it('automatically puts new initialized questions in edit mode', () => {
      const state = fromJS({
        surveyQuestionMap: {},
        editingQuestions: {}
      });
      // see disclaimer in this describe block
      // const action = actions.initQuestion('p123', 1);
      const action = {
        type: actions.INIT_QUESTION,
        payload: {
          id: timeStamp,
          pageId: '123',
          index: 0
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            [timeStamp]: {
              id: timeStamp,
              pageId: '123'
            }
          },
          editingQuestions: { [timeStamp]: true }
        })
      );
    });

    it('uninitializes an initialized question', () => {
      const state = fromJS({
        surveyQuestionMap: {
          '111': {},
          '222': {},
          [timeStamp]: {
            id: timeStamp,
            pageId: '123'
          }
        }
      });
      const action = actions.uninitQuestion('p123', timeStamp);
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            '111': {},
            '222': {}
          }
        })
      );
    });

    it('will only initialize one question per page (most recent init kept)', () => {
      const state = fromJS({
        editingQuestions: {
          [timeStamp]: true
        },
        surveyQuestionMap: {
          [timeStamp]: {
            id: timeStamp,
            pageId: '123'
          }
        }
      });
      const timeStamp2 = JSON.stringify(new Date());
      const action = {
        type: actions.INIT_QUESTION,
        payload: {
          id: timeStamp2,
          pageId: '123',
          index: 0
        }
      };
      const failState = reducer(state, action);
      expect(failState).toEqual(
        fromJS({
          editingQuestions: {
            [timeStamp2]: true
          },
          surveyQuestionMap: {
            [timeStamp2]: {
              id: timeStamp2,
              pageId: '123'
            }
          }
        })
      );
    });

    it('removes all the temporary questions', () => {
      const state = fromJS({
        surveyQuestionMap: {
          '123': {
            id: '123',
            pageId: '111',
            text: 'question 1'
          },
          '2017-08-03T18:01:48.943Z': {
            id: '2017-08-03T18:01:48.943Z',
            pageId: '222'
          }
        },
        editingQuestions: {
          '2017-08-03T18:01:48.943Z': true
        }
      });
      const action = actions.removeTempQuestions();
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            '123': {
              id: '123',
              pageId: '111',
              text: 'question 1'
            }
          },
          editingQuestions: {}
        })
      );
    });
  });

  describe('Creating Questions', () => {
    it('sets a request flag when a question is being created', () => {
      const state = fromJS({
        creatingQuestions: {}
      });
      const action = {
        type: actions.CREATE_QUESTION_REQUEST,
        meta: { tempId: 'temp123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          creatingQuestions: {
            temp123: true
          }
        })
      );
    });

    it('creates questions and removes the request flag', () => {
      const state = fromJS({
        editingQuestions: { temp123: true },
        creatingQuestions: { temp123: true },
        surveyQuestionMap: {
          temp123: {
            id: 'temp123',
            text: 'new question?'
          }
        }
      });
      const action = {
        type: actions.CREATE_QUESTION_SUCCESS,
        meta: { pageId: 'p123', tempId: 'temp123' },
        payload: {
          id: '58c041c8acbff30001df3594',
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
          editingQuestions: {},
          creatingQuestions: {},
          surveyQuestionMap: {
            '58c041c8acbff30001df3594': {
              id: '58c041c8acbff30001df3594',
              text: 'new question?',
              answers: [],
              rows: [],
              columns: [],
              randomizeAnswers: false,
              mandatory: false,
              hidden: false,
              type: 'SINGLE_SELECT_LIST'
            }
          }
        })
      );
    });

    it('stores any create error and removes the request flag', () => {
      const state = fromJS({
        editingQuestions: { temp123: true },
        creatingQuestions: { temp123: true },
        createQuestionErrors: {}
      });
      const action = {
        type: actions.CREATE_QUESTION_ERROR,
        meta: { tempId: 'temp123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem creating question',
            fieldName: 'questionField'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          editingQuestions: { temp123: true },
          creatingQuestions: {},
          createQuestionErrors: {
            temp123: {
              status: 400,
              field: 'questionField',
              message: 'Problem creating question'
            }
          }
        })
      );
    });
  });

  describe('Updating Questions', () => {
    it('sets a request flag when question is being updated', () => {
      const state = fromJS({
        updatingQuestions: {}
      });
      const action = {
        type: actions.UPDATE_QUESTION_REQUEST,
        meta: { questionId: 'q123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingQuestions: { q123: true }
        })
      );
    });

    it('updates the question and removes the request flag', () => {
      const state = fromJS({
        editingQuestions: { q1231: true },
        updatingQuestions: { q1231: true },
        surveyQuestionMap: {
          q1231: {
            id: 'q1231',
            text: 'question 1'
          },
          q2342: {
            id: 'q2342',
            text: 'question 2'
          }
        },
        updateQuestionErrors: {
          q1231: {
            status: 409,
            message: 'Some Error'
          }
        }
      });
      const action = {
        type: actions.UPDATE_QUESTION_SUCCESS,
        meta: { questionId: 'q1231' },
        payload: {
          id: 'q1231',
          text: 'question ONE'
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          editingQuestions: {},
          updatingQuestions: {},
          surveyQuestionMap: {
            q1231: {
              id: 'q1231',
              text: 'question ONE'
            },
            q2342: {
              id: 'q2342',
              text: 'question 2'
            }
          },
          updateQuestionErrors: {}
        })
      );
    });

    it('stores any update error and removes the request flag', () => {
      const state = fromJS({
        editingQuestions: { q123: true },
        updatingQuestions: { q123: true },
        updateQuestionErrors: {}
      });
      const action = {
        type: actions.UPDATE_QUESTION_ERROR,
        meta: { questionId: 'q123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem updating question',
            fieldName: 'questionField'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          editingQuestions: { q123: true },
          updatingQuestions: {},
          updateQuestionErrors: {
            q123: {
              status: 400,
              field: 'questionField',
              message: 'Problem updating question'
            }
          }
        })
      );
    });
  });

  describe('Deleting Questions', () => {
    it('sets a request flag when question is being deleted', () => {
      const state = fromJS({
        deletingQuestions: {}
      });
      const action = {
        type: actions.DELETE_QUESTION_REQUEST,
        meta: { questionId: 'q123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingQuestions: { q123: true }
        })
      );
    });

    it('deletes a question and removes the request flag', () => {
      const state = fromJS({
        deletingQuestions: { q1231: true },
        surveyQuestionMap: {
          q1231: {
            id: 'q1231',
            text: 'question 1'
          },
          q1232: {
            id: 'q1232',
            text: 'question 2'
          }
        },
        deleteQuestionErrors: {
          q1231: {
            status: 409,
            message: 'SomeError'
          }
        }
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
          deletingQuestions: {},
          surveyQuestionMap: {
            q1232: {
              id: 'q1232',
              text: 'question 2'
            }
          },
          deleteQuestionErrors: {}
        })
      );
    });

    it('stores any delete errors and removes the request flag', () => {
      const state = fromJS({
        deletingQuestions: { q123: true },
        deleteQuestionErrors: {}
      });
      const action = {
        type: actions.DELETE_QUESTION_ERROR,
        meta: { pageId: 'p123', questionId: 'q123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem deleting question'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deletingQuestions: {},
          deleteQuestionErrors: {
            q123: {
              status: 400,
              message: 'Problem deleting question'
            }
          }
        })
      );
    });
  });

  describe('Question Editing', () => {
    it('stores IDs of questions being edited', () => {
      const state = fromJS({
        editingQuestions: {}
      });
      const action = actions.openQuestionEditor('q123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          editingQuestions: { q123: true }
        })
      );
    });

    it('forgets IDs of questions no longer being edited', () => {
      const state = fromJS({
        editingQuestions: { q123: true }
      });
      const action = actions.closeQuestionEditor('q123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          editingQuestions: {}
        })
      );
    });
  });

  describe('Question Expand/Collapse', () => {
    it('collapses a single question', () => {
      const state = fromJS({
        collapsedQuestions: {
          '123': true,
          '234': true,
          '345': true
        }
      });
      const action = actions.collapseQuestion('456');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          collapsedQuestions: {
            '123': true,
            '234': true,
            '345': true,
            '456': true
          }
        })
      );
    });

    it('expands a single question', () => {
      const state = fromJS({
        collapsedQuestions: {
          '123': true,
          '234': true,
          '345': true
        }
      });
      const action = actions.expandQuestion('234');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          collapsedQuestions: {
            '123': true,
            '345': true
          }
        })
      );
    });

    it('expands all the questions', () => {
      const state = fromJS({
        surveyQuestionMap: {
          '123': {},
          '234': {},
          '345': {}
        },
        collapsedQuestions: {
          '123': true,
          '234': true,
          '345': true
        }
      });
      const action = actions.expandAllQuestions();
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            '123': {},
            '234': {},
            '345': {}
          },
          collapsedQuestions: {}
        })
      );
    });

    it('collapses all the questions', () => {
      const state = fromJS({
        surveyQuestionMap: {
          '123': {},
          '234': {},
          '345': {}
        },
        collapsedQuestions: {}
      });
      const action = actions.collapseAllQuestions();
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            '123': {},
            '234': {},
            '345': {}
          },
          collapsedQuestions: {
            '123': true,
            '234': true,
            '345': true
          }
        })
      );
    });
  });

  describe('Clearing Errors', () => {
    it('clears question delete errors for a given question', () => {
      const state = fromJS({
        deleteQuestionErrors: {
          q123: {
            status: 409,
            message: 'Some Error'
          }
        }
      });
      const action = actions.clearDeleteQuestionError('q123');
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          deleteQuestionErrors: {}
        })
      );
    });
  });

  describe('Survey Side Effects', () => {
    it('updates questionMap when a survey is updated', () => {
      const state = fromJS({
        surveyQuestionMap: {
          q123: {
            id: 'q123',
            text: 'question 1'
          }
        }
      });
      const action = {
        type: actions.UPDATE_SURVEY_SUCCESS,
        payload: {
          id: '123',
          title: 'survey ONE',
          pages: [
            {
              id: 'p123',
              questions: [
                {
                  id: 'q123',
                  text: 'question 1'
                }
              ]
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            q123: {
              id: 'q123',
              text: 'question 1'
            }
          }
        })
      );
    });

    it('deletes questions from surveys that have been deleted', () => {
      const state = fromJS({
        surveyQuestionMap: {
          q123: {
            id: 'q123',
            text: 'Question 1'
          },
          q234: {
            id: 'q234',
            text: 'Question 2'
          }
        }
      });
      const action = {
        type: actions.DELETE_SURVEY_SUCCESS,
        meta: {
          survey: {
            id: '123',
            title: 'survey 1',
            pages: [
              {
                id: 'p123',
                questions: [
                  {
                    id: 'q123',
                    text: 'Question 1'
                  }
                ]
              }
            ]
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            q234: {
              id: 'q234',
              text: 'Question 2'
            }
          }
        })
      );
    });

    it('gracefully handles when a deleted survey had no questions', () => {
      const state = fromJS({
        surveyQuestionMap: {
          q123: {
            id: 'q123',
            text: 'Question 1'
          },
          q234: {
            id: 'q234',
            text: 'Question 2'
          }
        }
      });
      const action = {
        type: actions.DELETE_SURVEY_SUCCESS,
        meta: {
          survey: {
            id: '123',
            title: 'survey 1',
            pages: [
              {
                id: 'p123'
              }
            ]
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            q123: {
              id: 'q123',
              text: 'Question 1'
            },
            q234: {
              id: 'q234',
              text: 'Question 2'
            }
          }
        })
      );
    });

    it('updates questionMap when a survey is copied', () => {
      const state = fromJS({
        surveyQuestionMap: {
          q123: {
            id: 'q123',
            text: 'question 1'
          }
        }
      });
      const action = {
        type: actions.COPY_SURVEY_SUCCESS,
        payload: {
          id: '123',
          title: 'survey ONE',
          pages: [
            {
              id: 'p123',
              questions: [
                {
                  id: 'q123',
                  text: 'question 1'
                }
              ]
            }
          ]
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            q123: {
              id: 'q123',
              text: 'question 1'
            }
          }
        })
      );
    });
  });

  describe('Survey Page Side Effects', () => {
    it('deletes questions from map when page has been deleted', () => {
      const state = fromJS({
        surveyQuestionMap: {
          q123: { id: 'q123', text: 'question1' },
          q234: { id: 'q234', text: 'question2' },
          q345: { id: 'q345', text: 'question3' }
        }
      });
      const action = {
        type: actions.DELETE_PAGE_SUCCESS,
        meta: {
          surveyId: '123',
          page: {
            id: 'p1231',
            questions: ['q123', 'q234']
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyQuestionMap: {
            q345: {
              id: 'q345',
              text: 'question3'
            }
          }
        })
      );
    });
  });
});
