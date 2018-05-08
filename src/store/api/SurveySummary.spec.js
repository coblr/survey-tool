import { fromJS } from 'immutable';

import reducer, * as actions from './SurveySummary';

describe('SurveySummary Module', () => {
  it('breaks down and stores the fetched survey summary report', () => {
    const time = new Date();
    const state = fromJS({
      fetching: true,
      surveySummary: {},
      timeScale: 'day',
      currentTime: time
    });
    const action = {
      type: actions.FETCH_SUMMARY_SUCCESS,
      payload: {
        totals: {
          started: 0,
          completed: 0,
          terminated: 0,
          abandoned: 0,
          inProgress: 0
        },
        breakdowns: {
          started: {
            daily: [],
            hourly: [],
            monthly: []
          },
          completed: {
            daily: [],
            hourly: [],
            monthly: []
          }
        }
      }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        fetching: false,
        surveySummary: {
          totals: {
            started: 0,
            completed: 0,
            terminated: 0,
            abandoned: 0,
            inProgress: 0
          },
          breakdowns: {
            started: {
              daily: [],
              hourly: [],
              monthly: []
            },
            completed: {
              daily: [],
              hourly: [],
              monthly: []
            }
          }
        },
        timeScale: 'day',
        currentTime: time,
        breakdownData: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        breakdownLabels: [
          '00:00',
          '',
          '',
          '',
          '04:00',
          '',
          '',
          '',
          '08:00',
          '',
          '',
          '',
          '12:00',
          '',
          '',
          '',
          '16:00',
          '',
          '',
          '',
          '20:00',
          '',
          '',
          ''
        ]
      })
    );
  });

  it('sets the resolution of the summary data', () => {
    // using 9am to avoid any timezone BS
    const time = new Date('2017-04-12T09:00:00Z');
    const state = fromJS({
      currentTime: time,
      timeScale: 'day',
      surveySummary: {
        totals: {
          started: 0,
          completed: 0,
          terminated: 0,
          abandoned: 0,
          inProgress: 0
        },
        breakdowns: {
          started: {
            daily: [],
            hourly: [],
            monthly: []
          },
          completed: {
            daily: [],
            hourly: [],
            monthly: []
          }
        }
      }
    });
    const action = actions.setSummaryScale('month');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        currentTime: time,
        timeScale: 'month',
        surveySummary: {
          totals: {
            started: 0,
            completed: 0,
            terminated: 0,
            abandoned: 0,
            inProgress: 0
          },
          breakdowns: {
            started: {
              daily: [],
              hourly: [],
              monthly: []
            },
            completed: {
              daily: [],
              hourly: [],
              monthly: []
            }
          }
        },
        currentUnit: 'Apr 2017',
        breakdownData: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        breakdownLabels: [
          '',
          '',
          'Apr 03',
          '',
          '',
          '',
          '',
          '',
          '',
          'Apr 10',
          '',
          '',
          '',
          '',
          '',
          '',
          'Apr 17',
          '',
          '',
          '',
          '',
          '',
          '',
          'Apr 24',
          '',
          '',
          '',
          '',
          '',
          ''
        ]
      })
    );
  });

  it('updates the summary date by traveling through time', () => {
    const time = new Date('2017-04-12T11:00:00Z');
    const fwdTime = new Date('2017-04-13T11:00:00Z');
    const bckTime = new Date('2017-04-11T11:00:00Z');
    const surveySummary = {
      totals: {
        started: 2,
        completed: 2,
        terminated: 0,
        abandoned: 0,
        inProgress: 0
      },
      breakdowns: {
        started: {
          daily: [
            { key: { y: 2017, m: 4, d: 11 }, count: 1 },
            { key: { y: 2017, m: 4, d: 13 }, count: 1 }
          ],
          hourly: [
            { key: { y: 2017, m: 4, d: 11, h: 0 }, count: 1 },
            { key: { y: 2017, m: 4, d: 13, h: 0 }, count: 1 }
          ]
        },
        completed: {
          daily: [
            { key: { y: 2017, m: 4, d: 11 }, count: 1 },
            { key: { y: 2017, m: 4, d: 13 }, count: 1 }
          ],
          hourly: [
            { key: { y: 2017, m: 4, d: 11, h: 0 }, count: 1 },
            { key: { y: 2017, m: 4, d: 13, h: 1 }, count: 1 }
          ]
        }
      }
    };

    const state = fromJS({
      currentTime: time,
      currentUnit: 'Apr 12 2017',
      timeScale: 'day',
      surveySummary: surveySummary
    });
    const fwdAction = actions.timeTravel();
    const bckAction = actions.timeTravel(-1);

    let nextState = reducer(state, fwdAction);
    expect(nextState).toEqual(
      fromJS({
        currentTime: fwdTime,
        currentUnit: 'Apr 13 2017',
        timeScale: 'day',
        surveySummary: surveySummary,
        breakdownData: [
          0,
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        breakdownLabels: [
          '00:00',
          '',
          '',
          '',
          '04:00',
          '',
          '',
          '',
          '08:00',
          '',
          '',
          '',
          '12:00',
          '',
          '',
          '',
          '16:00',
          '',
          '',
          '',
          '20:00',
          '',
          '',
          ''
        ]
      })
    );

    nextState = reducer(state, bckAction);
    expect(nextState).toEqual(
      fromJS({
        currentTime: bckTime,
        currentUnit: 'Apr 11 2017',
        timeScale: 'day',
        surveySummary: surveySummary,
        breakdownData: [
          1,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0
        ],
        breakdownLabels: [
          '00:00',
          '',
          '',
          '',
          '04:00',
          '',
          '',
          '',
          '08:00',
          '',
          '',
          '',
          '12:00',
          '',
          '',
          '',
          '16:00',
          '',
          '',
          '',
          '20:00',
          '',
          '',
          ''
        ]
      })
    );
  });
});
