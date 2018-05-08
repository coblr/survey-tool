import { fromJS } from 'immutable';

import reducer, * as actions from './SurveyInterview';

describe('SurveyInterview Module', () => {
  describe('Fetching All Survey Interviews', () => {
    it('toggles a loading flag when fetching interviews', () => {
      const state = fromJS({
        fetchingInterviews: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEWS_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingInterviews: { '123': true }
        })
      );
    });

    it('fetches a list of survey interviews', () => {
      const state = fromJS({
        surveyInterviews: {},
        fetchingInterviews: { '123': true },
        surveyInterviewPagination: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEWS_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          content: ['stuff'],
          first: true,
          last: true,
          number: 0,
          numberOfElements: 9,
          size: 20,
          totalElements: 9,
          totalPages: 1
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyInterviews: {
            '123': ['stuff']
          },
          fetchingInterviews: {},
          surveyInterviewPagination: {
            '123': {
              first: true,
              last: true,
              number: 0,
              numberOfElements: 9,
              size: 20,
              totalElements: 9,
              totalPages: 1
            }
          }
        })
      );
    });

    it('handles errors when fetching interviews fails', () => {
      const state = fromJS({
        fetchingInterviews: { '123': true },
        fetchInterviewErrors: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEWS_ERROR,
        meta: { surveyId: '123' },
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
          fetchingInterviews: {},
          fetchInterviewErrors: {
            '123': {
              status: 400,
              message: 'Something is wrong'
            }
          }
        })
      );
    });
  });

  describe('Fetching Single Survey Interview', () => {
    it('toggles a loading flag when fetching an interview', () => {
      const state = fromJS({
        fetchingInterviews: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEW_REQUEST,
        meta: { surveyId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingInterviews: { '123': true }
        })
      );
    });

    it('stores the fetched interview and removes the flag', () => {
      const state = fromJS({
        surveyInterviews: {},
        fetchingInterviews: { '123': true }
      });
      const action = {
        type: actions.FETCH_INTERVIEW_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          interviewId: 'int123',
          excluded: false
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          surveyInterviews: {
            '123': [
              {
                interviewId: 'int123',
                excluded: false
              }
            ]
          },
          fetchingInterviews: {}
        })
      );
    });

    it('replaces the fetched interview if already in the list', () => {
      const state = fromJS({
        fetchingInterviews: { '123': true },
        surveyInterviews: {
          '123': [
            { interviewId: 'int234', excluded: false },
            { interviewId: 'int123', excluded: true },
            { interviewId: 'int345', excluded: false }
          ]
        }
      });
      const action = {
        type: actions.FETCH_INTERVIEW_SUCCESS,
        meta: { surveyId: '123' },
        payload: {
          interviewId: 'int123',
          excluded: false
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingInterviews: {},
          surveyInterviews: {
            '123': [
              { interviewId: 'int234', excluded: false },
              { interviewId: 'int123', excluded: false },
              { interviewId: 'int345', excluded: false }
            ]
          }
        })
      );
    });

    it('handles errors when fetching interviews fails', () => {
      const state = fromJS({
        fetchingInterviews: { '123': true },
        fetchInterviewErrors: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEW_ERROR,
        meta: { surveyId: '123' },
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
          fetchingInterviews: {},
          fetchInterviewErrors: {
            '123': {
              status: 400,
              message: 'Something is wrong'
            }
          }
        })
      );
    });
  });

  describe('Updating Survey Interviews', () => {
    it('toggles a flag while updating the interview', () => {
      const state = fromJS({
        updatingInterviews: {}
      });
      const action = {
        type: actions.UPDATE_INTERVIEW_REQUEST,
        meta: {
          surveyId: '123',
          interview: { interviewId: 'int123' }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingInterviews: {
            int123: true
          }
        })
      );
    });

    it('saves the updated interview and removes the flag', () => {
      const state = fromJS({
        updatingInterviews: {
          int123: true
        },
        surveyInterviews: {
          '123': [
            {
              interviewId: 'int123',
              exclude: false
            }
          ]
        }
      });
      const action = {
        type: actions.UPDATE_INTERVIEW_SUCCESS,
        meta: {
          surveyId: '123',
          interview: { interviewId: 'int123' }
        },
        payload: {
          interviewId: 'int123',
          exclude: true
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingInterviews: {},
          surveyInterviews: {
            '123': [
              {
                interviewId: 'int123',
                exclude: true
              }
            ]
          }
        })
      );
    });

    it('stores any update error and removes the flag', () => {
      const state = fromJS({
        updatingInterviews: { int123: true },
        updateInterviewErrors: {}
      });
      const action = {
        type: actions.UPDATE_INTERVIEW_ERROR,
        meta: {
          surveyId: '123',
          interview: { interviewId: 'int123' }
        },
        payload: {
          status: 400,
          response: {
            errorMessage: 'Problem updating interview'
          }
        }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          updatingInterviews: {},
          updateInterviewErrors: {
            int123: {
              status: 400,
              message: 'Problem updating interview'
            }
          }
        })
      );
    });
  });

  describe('Deleting Survey Interviews', () => {
    it('shows the delete alert', () => {
      const initialState = fromJS({
        showDeleteAlerts: {}
      });
      const action = {
        type: actions.SHOW_DELETE_ALERT,
        meta: { interviewId: 504 }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          showDeleteAlerts: {
            '504': true
          }
        })
      );
    });

    it('hides the delete alert', () => {
      const initialState = fromJS({
        showDeleteAlerts: { '504': true }
      });
      const action = {
        type: actions.HIDE_DELETE_ALERT,
        meta: { interviewId: 504 }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          showDeleteAlerts: {}
        })
      );
    });

    it('toggles a flag while deleting the interview', () => {
      const initialState = fromJS({
        deletingInterviews: {}
      });
      const action = {
        type: actions.DELETE_INTERVIEW_REQUEST,
        meta: {
          surveyId: '123',
          interview: {
            interviewId: 'int123'
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          deletingInterviews: {
            int123: true
          }
        })
      );
    });

    it('deletes the interview and removes the flag', () => {
      const initialState = fromJS({
        deletingInterviews: {
          int123: true
        },
        surveyInterviews: {
          '123': [
            {
              interviewId: 'int123'
            }
          ]
        }
      });
      const action = {
        type: actions.DELETE_INTERVIEW_SUCCESS,
        meta: {
          surveyId: '123',
          interview: {
            interviewId: 'int123'
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          deletingInterviews: {},
          surveyInterviews: {
            '123': []
          }
        })
      );
    });

    it('store any delete errors and removes the flag', () => {
      const initialState = fromJS({
        deletingInterviews: {
          int123: true
        },
        deleteInterviewErrors: {}
      });
      const action = {
        type: actions.DELETE_INTERVIEW_ERROR,
        meta: {
          surveyId: '123',
          interview: {
            interviewId: 'int123'
          }
        },
        payload: {
          status: 400,
          response: {
            errorMessage: 'An error occurred'
          }
        }
      };
      const nextState = reducer(initialState, action);

      expect(nextState).toEqual(
        fromJS({
          deletingInterviews: {},
          deleteInterviewErrors: {
            int123: {
              status: 400,
              message: 'An error occurred'
            }
          }
        })
      );
    });
  });

  describe('Interview Responses', () => {
    it('toggles a loading flag when fetching responses', () => {
      const state = fromJS({
        fetchingInterviewResponses: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEW_RESPONSES_REQUEST,
        meta: { interviewId: '123' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingInterviewResponses: { '123': true }
        })
      );
    });

    it('fetches a list of interview responses', () => {
      const state = fromJS({
        interviewResponses: {},
        fetchingInterviewResponses: { '123': true }
      });
      const action = {
        type: actions.FETCH_INTERVIEW_RESPONSES_SUCCESS,
        meta: { interviewId: '123' },
        payload: ['stuff']
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          interviewResponses: {
            '123': ['stuff']
          },
          fetchingInterviewResponses: {}
        })
      );
    });

    it('handles errors when fetching responses fails', () => {
      const state = fromJS({
        fetchingInterviewResponses: { '123': true },
        fetchInterviewResponseErrors: {}
      });
      const action = {
        type: actions.FETCH_INTERVIEW_RESPONSES_ERROR,
        meta: { interviewId: '123' },
        payload: { error: 'Something is wrong' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingInterviewResponses: {},
          fetchInterviewResponseErrors: {
            '123': 'Something is wrong'
          }
        })
      );
    });
  });
});
