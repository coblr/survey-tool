import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PromoteMobile from '../../components/PromoteMobile/PromoteMobile';

import {
  sendEmailLead,
  resetEmailLead
} from '../../store/api/EmailLeads';

export class PromoteMobileCtnr extends React.PureComponent {
  componentWillUnmount() {
    this.props.resetEmailLead(this.props.match.params.surveyId);
  }

  render() {
    return <PromoteMobile {...this.props} />;
  }
}

PromoteMobileCtnr.propTypes = {
  match: PropTypes.object,
  resetEmailLead: PropTypes.func
};

const mapStateToProps = state => ({
  sendingLeads: state.EmailLeads.get('sendingLeads').toJS(),
  sentLeads: state.EmailLeads.get('sentLeads').toJS(),
  sendLeadErrors: state.EmailLeads.get('sendLeadErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  sendEmailLead(surveyId, contactInfo) {
    dispatch(sendEmailLead(surveyId, contactInfo));
  },
  resetEmailLead(surveyId) {
    dispatch(resetEmailLead(surveyId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  PromoteMobileCtnr
);
