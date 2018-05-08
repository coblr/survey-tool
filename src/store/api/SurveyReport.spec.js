import { fromJS } from 'immutable';

import reducer, * as actions from './SurveyReport';

describe('SurveyReport Module', () => {
  it('sets a flag for the survey whose reports are being fetched', () => {
    const state = fromJS({
      fetchingSurveyReports: {}
    });
    const action = {
      type: actions.FETCH_REPORTS_REQUEST,
      meta: { surveyId: '123' }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        fetchingSurveyReports: { '123': true }
      })
    );
  });

  it('stores reports by survey ID and clears the fetch flag', () => {
    const state = fromJS({
      fetchingSurveyReports: { '123': true },
      surveyReports: {}
    });
    const action = {
      type: actions.FETCH_REPORTS_SUCCESS,
      meta: { surveyId: '123' },
      payload: ['stuff']
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        fetchingSurveyReports: {},
        surveyReports: {
          '123': ['stuff']
        }
      })
    );
  });

  it('stores fetch errors by ID and clears the fetch flag', () => {
    const state = fromJS({
      fetchingSurveyReports: { '123': true },
      fetchSurveyReportErrors: {}
    });
    const action = {
      type: actions.FETCH_REPORTS_ERROR,
      meta: { surveyId: '123' },
      payload: { error: 'Some Error' }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        fetchingSurveyReports: {},
        fetchSurveyReportErrors: {
          '123': 'Some Error'
        }
      })
    );
  });

  it('sets which filter is being used for the realtime report', () => {
    const state = fromJS({
      currentFilters: {}
    });
    const action = actions.setCurrentFilter('123', 'realtime', {
      id: 'f22',
      statuses: ['COMPLETED', 'TERMINATED']
    });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        currentFilters: {
          '123': {
            realtime: {
              id: 'f22',
              statuses: ['COMPLETED', 'TERMINATED']
            }
          }
        }
      })
    );
  });

  it('sets a separate object when loading filters for a new survey', () => {
    const state = fromJS({
      currentFilters: {
        '123': {
          realtime: {
            id: 'f22',
            statuses: ['COMPLETED', 'TERMINATED']
          }
        }
      }
    });
    const action = actions.setCurrentFilter('234', 'individual', {
      id: 'f99',
      statuses: ['INCOMPLETE', 'IN_PROGRESS']
    });
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        currentFilters: {
          '123': {
            realtime: {
              id: 'f22',
              statuses: ['COMPLETED', 'TERMINATED']
            }
          },
          '234': {
            individual: {
              id: 'f99',
              statuses: ['INCOMPLETE', 'IN_PROGRESS']
            }
          }
        }
      })
    );
  });
});
