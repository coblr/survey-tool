import React from 'react';
import PropTypes from 'prop-types';

import './PromoteOnline.css';

import EmailLead from '../EmailLead/EmailLead';

export class PromoteOnline extends React.PureComponent {
  render() {
    const { match: { params: { surveyId } }, sentLeads } = this.props;

    return (
      <div className="PromoteOnline" style={{ visibility: 'hidden' }}>
        {!sentLeads[surveyId] && (
          <div>
            <h3 className="PromoteOnline_title">
              Get Access to SSI's Online Global Panel Today!
            </h3>
            <p className="PromoteOnline_instruction">
              You can connect your survey to our audiences for deep
              insights from richly profiled respondents.<br />
              Target your desired audience by location, education,
              income, job title and more.
            </p>
            <p className="PromoteOnline_instruction">
              Fill out the form below or call 866-872-4006 to speak
              with an SSI representative today!
            </p>
          </div>
        )}
        <EmailLead {...this.props} />
      </div>
    );
  }
}

PromoteOnline.propTypes = {
  match: PropTypes.object,
  sentLeads: PropTypes.object
};

export default PromoteOnline;
