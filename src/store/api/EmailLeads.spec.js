import { fromJS } from 'immutable';

import reducer, * as actions from './EmailLeads';

describe('EmailLeads Module', () => {
  it('sets a flag when sending a lead', () => {
    const state = fromJS({
      sendingLeads: { '234': true }
    });
    const action = {
      type: actions.SEND_LEAD_REQUEST,
      meta: { surveyId: '123' }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        sendingLeads: {
          '234': true,
          '123': true
        }
      })
    );
  });

  it('removes sending flag and sets sent flag when successful', () => {
    const state = fromJS({
      sendingLeads: {
        '234': true,
        '123': true
      },
      sentLeads: {}
    });
    const action = {
      type: actions.SEND_LEAD_SUCCESS,
      meta: { surveyId: '123' }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        sendingLeads: {
          '234': true
        },
        sentLeads: {
          '123': true
        }
      })
    );
  });

  it('removes the flag and stores any errors', () => {
    const state = fromJS({
      sendingLeads: {
        '234': true,
        '123': true
      },
      sendLeadErrors: {}
    });
    const action = {
      type: actions.SEND_LEAD_ERROR,
      meta: { surveyId: '123' },
      payload: { error: 'Some Error' }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        sendingLeads: {
          '234': true
        },
        sendLeadErrors: {
          '123': 'Some Error'
        }
      })
    );
  });

  it('removes any "residue" from the email lead forms', () => {
    const state = fromJS({
      sendingLeads: {
        '123': true
      },
      sentLeads: {
        '123': true
      },
      sendLeadErrors: {
        '123': 'Some Error'
      }
    });
    const action = actions.resetEmailLead(123);
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        sendingLeads: {},
        sentLeads: {},
        sendLeadErrors: {}
      })
    );
  });
});
