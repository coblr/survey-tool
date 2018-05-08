import { fromJS } from 'immutable';

import { UPDATE_INTERVIEW_SUCCESS } from './SurveyInterview';
import reducer, * as actions from './SurveyResponse';

describe('SurveyResponse Module', () => {
  describe('Interview Sources', () => {
    it('toggles a loading flag when fetching sources', () => {
      const state = fromJS({
        fetchingSources: {}
      });
      const action = {
        type: actions.FETCH_SOURCES_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSources: { '123': true }
        })
      );
    });

    it('fetches a list of interview sources', () => {
      const state = fromJS({
        responseSources: {},
        fetchingSources: { '123': true }
      });
      const action = {
        type: actions.FETCH_SOURCES_SUCCESS,
        meta: { surveyId: '123' },
        payload: ['stuff']
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          responseSources: {
            '123': ['stuff']
          },
          fetchingSources: {}
        })
      );
    });

    it('handles errors when fetching responses fails', () => {
      const state = fromJS({
        fetchingSources: { '123': true },
        fetchSourceErrors: {}
      });
      const action = {
        type: actions.FETCH_SOURCES_ERROR,
        meta: { surveyId: '123' },
        payload: { error: 'Something is wrong' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSources: {},
          fetchSourceErrors: {
            '123': 'Something is wrong'
          }
        })
      );
    });
  });

  describe('Survey Responses (responses across interviews)', () => {
    it('toggles a loading flag when fetching responses', () => {
      const state = fromJS({
        fetchingSurveyResponses: {}
      });
      const action = {
        type: actions.FETCH_SURVEY_RESPONSES_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveyResponses: { '123': true }
        })
      );
    });

    it('fetches a list of survey responses', () => {
      const state = fromJS({
        surveyResponses: {},
        fetchingSurveyResponses: { '123': true }
      });
      const action = {
        type: actions.FETCH_SURVEY_RESPONSES_SUCCESS,
        meta: { surveyId: '123' },
        payload: ['stuff']
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyResponses: {
            '123': ['stuff']
          },
          fetchingSurveyResponses: {}
        })
      );
    });

    it('handles errors when fetching responses fails', () => {
      const state = fromJS({
        fetchingSurveyResponses: { '123': true },
        fetchSurveyResponseErrors: {}
      });
      const action = {
        type: actions.FETCH_SURVEY_RESPONSES_ERROR,
        meta: { surveyId: '123' },
        payload: { error: 'Something is wrong' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingSurveyResponses: {},
          fetchSurveyResponseErrors: {
            '123': 'Something is wrong'
          }
        })
      );
    });
  });

  describe('Text Responses', () => {
    it('toggles a loading flag when fetching responses', () => {
      const state = fromJS({
        fetchingTextResponses: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_REQUEST,
        meta: { questionId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingTextResponses: { '123': true }
        })
      );
    });

    it('toggles a loading flag using the answerId if available', () => {
      const state = fromJS({
        fetchingTextResponses: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_REQUEST,
        meta: { questionId: '123', answerId: 'a123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingTextResponses: { a123: true }
        })
      );
    });

    it('stores the list of text responses and removes the flag', () => {
      const state = fromJS({
        textResponses: {},
        recentTextResponses: {},
        fetchingTextResponses: { '123': true },
        textResponsePagination: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_SUCCESS,
        meta: { questionId: '123' },
        payload: {
          content: [{ id: 'recent1' }, { id: 'recent2' }],
          first: true,
          last: false,
          number: 10,
          numberOfElements: 42,
          size: 20,
          totalElements: 42,
          totalPages: 8
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          textResponses: {
            '123': [{ id: 'recent1' }, { id: 'recent2' }]
          },
          recentTextResponses: {
            '123': [{ id: 'recent1' }, { id: 'recent2' }]
          },
          fetchingTextResponses: {},
          textResponsePagination: {
            '123': {
              first: true,
              last: false,
              number: 10,
              numberOfElements: 42,
              size: 20,
              totalElements: 42,
              totalPages: 8
            }
          }
        })
      );
    });

    it('stores list of responses under answerId if available', () => {
      const state = fromJS({
        textResponses: {},
        recentTextResponses: {},
        fetchingTextResponses: { a123: true },
        textResponsePagination: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_SUCCESS,
        meta: { questionId: '123', answerId: 'a123' },
        payload: {
          content: [{ id: 'recent1' }, { id: 'recent2' }],
          first: true,
          last: false,
          number: 10,
          numberOfElements: 42,
          size: 20,
          totalElements: 42,
          totalPages: 8
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          textResponses: {
            a123: [{ id: 'recent1' }, { id: 'recent2' }]
          },
          recentTextResponses: {
            a123: [{ id: 'recent1' }, { id: 'recent2' }]
          },
          fetchingTextResponses: {},
          textResponsePagination: {
            a123: {
              first: true,
              last: false,
              number: 10,
              numberOfElements: 42,
              size: 20,
              totalElements: 42,
              totalPages: 8
            }
          }
        })
      );
    });

    it('only updates recent responses if page is not provided', () => {
      const state = fromJS({
        textResponses: {},
        recentTextResponses: {
          a123: [{ id: 'recent1' }, { id: 'recent2' }]
        },
        fetchingTextResponses: { a123: true },
        textResponsePagination: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_SUCCESS,
        meta: { questionId: '123', answerId: 'a123', page: 1 },
        payload: {
          content: [{ id: 'recent3' }, { id: 'recent4' }],
          first: true,
          last: false,
          number: 10,
          numberOfElements: 42,
          size: 20,
          totalElements: 42,
          totalPages: 8
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          textResponses: {
            a123: [{ id: 'recent3' }, { id: 'recent4' }]
          },
          recentTextResponses: {
            a123: [{ id: 'recent1' }, { id: 'recent2' }]
          },
          fetchingTextResponses: {},
          textResponsePagination: {
            a123: {
              first: true,
              last: false,
              number: 10,
              numberOfElements: 42,
              size: 20,
              totalElements: 42,
              totalPages: 8
            }
          }
        })
      );
    });

    it('only updates recent responses if no recents saved yet', () => {
      const state = fromJS({
        textResponses: {},
        recentTextResponses: {},
        fetchingTextResponses: { a123: true },
        textResponsePagination: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_SUCCESS,
        meta: { questionId: '123', answerId: 'a123' },
        payload: {
          content: [{ id: 'recent1' }, { id: 'recent2' }],
          first: true,
          last: false,
          number: 10,
          numberOfElements: 42,
          size: 20,
          totalElements: 42,
          totalPages: 8
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          textResponses: {
            a123: [{ id: 'recent1' }, { id: 'recent2' }]
          },
          recentTextResponses: {
            a123: [{ id: 'recent1' }, { id: 'recent2' }]
          },
          fetchingTextResponses: {},
          textResponsePagination: {
            a123: {
              first: true,
              last: false,
              number: 10,
              numberOfElements: 42,
              size: 20,
              totalElements: 42,
              totalPages: 8
            }
          }
        })
      );
    });

    it('handles errors when fetching responses fails', () => {
      const state = fromJS({
        fetchingTextResponses: { '123': true },
        fetchTextResponseErrors: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_ERROR,
        meta: { questionId: '123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Something is wrong'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingTextResponses: {},
          fetchTextResponseErrors: {
            '123': {
              status: 400,
              message: 'Something is wrong'
            }
          }
        })
      );
    });

    it('stores fetch errors under answerId if available', () => {
      const state = fromJS({
        fetchingTextResponses: { a123: true },
        fetchTextResponseErrors: {}
      });
      const action = {
        type: actions.FETCH_TEXT_RESPONSES_ERROR,
        meta: { questionId: '123', answerId: 'a123' },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Something is wrong'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingTextResponses: {},
          fetchTextResponseErrors: {
            a123: {
              status: 400,
              message: 'Something is wrong'
            }
          }
        })
      );
    });
  });

  describe('SurveyInterview Side Effects', () => {
    it('removes text responses from newly excluded interviews', () => {
      const state = fromJS({
        textResponses: {
          q123: [{ interviewId: 'int123' }],
          q234: [{ interviewId: 'int234' }],
          q345: [{ interviewId: 'int345' }]
        }
      });
      const action = {
        type: UPDATE_INTERVIEW_SUCCESS,
        meta: {
          surveyId: '123',
          interview: {
            interviewId: 'int123',
            excluded: true
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          textResponses: {
            q123: [],
            q234: [{ interviewId: 'int234' }],
            q345: [{ interviewId: 'int345' }]
          }
        })
      );
    });
  });
});
