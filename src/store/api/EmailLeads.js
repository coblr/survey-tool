import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';

////////////
/// Actions

export const SEND_LEAD_REQUEST = 'sb-ui/EmailLeads/SEND_LEAD_REQUEST';
export const SEND_LEAD_SUCCESS = 'sb-ui/EmailLeads/SEND_LEAD_SUCCESS';
export const SEND_LEAD_ERROR = 'sb-ui/EmailLeads/SEND_LEAD_ERROR';
export const RESET_EMAIL_LEAD = 'sb-ui/EmailLeads/RESET_EMAIL_LEAD';

////////////
/// Reducer

const initialState = fromJS({
  sendingLeads: {},
  sentLeads: {},
  sendLeadErrors: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta;
  switch (action.type) {
    case SEND_LEAD_REQUEST: {
      const sendingLeads = state.get('sendingLeads').toJS();
      sendingLeads[meta.surveyId] = true;
      return state.set('sendingLeads', fromJS(sendingLeads));
    }

    case SEND_LEAD_SUCCESS: {
      const sendingLeads = state.get('sendingLeads').toJS();
      const sentLeads = state.get('sentLeads').toJS();

      delete sendingLeads[meta.surveyId];
      sentLeads[meta.surveyId] = true;

      return state.merge(fromJS({ sendingLeads, sentLeads }));
    }

    case SEND_LEAD_ERROR: {
      const sendingLeads = state.get('sendingLeads').toJS();
      const sendLeadErrors = state.get('sendLeadErrors').toJS();

      delete sendingLeads[meta.surveyId];
      sendLeadErrors[meta.surveyId] = payload.error;

      return state.merge({
        sendingLeads,
        sendLeadErrors
      });
    }

    case RESET_EMAIL_LEAD: {
      const sendingLeads = state.get('sendingLeads').toJS();
      const sentLeads = state.get('sentLeads').toJS();
      const sendLeadErrors = state.get('sendLeadErrors').toJS();

      delete sendingLeads[meta.surveyId];
      delete sentLeads[meta.surveyId];
      delete sendLeadErrors[meta.surveyId];

      return state.merge({
        sendingLeads,
        sentLeads,
        sendLeadErrors
      });
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const sendEmailLead = (surveyId, contactInfo) => ({
  [CALL_API]: {
    endpoint: `/api/emails/leads`,
    method: 'POST',
    body: JSON.stringify(contactInfo),
    types: [
      {
        type: SEND_LEAD_REQUEST,
        meta: { surveyId }
      },
      {
        type: SEND_LEAD_SUCCESS,
        meta: { surveyId }
      },
      {
        type: SEND_LEAD_ERROR,
        meta: { surveyId }
      }
    ]
  }
});

export const resetEmailLead = surveyId => ({
  type: RESET_EMAIL_LEAD,
  meta: { surveyId }
});
