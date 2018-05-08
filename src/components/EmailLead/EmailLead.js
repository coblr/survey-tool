import React from 'react';
import PropTypes from 'prop-types';

import './EmailLead.css';

import Throbber from '../Throbber/Throbber';

export class EmailLead extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: ''
    };
  }

  onSubmit() {
    const {
      match: { params: { surveyId } },
      sendEmailLead
    } = this.props;

    this.setState({ formErrors: '' });

    if (this.validate()) {
      sendEmailLead(surveyId, {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        phone: this.phone.value,
        company: this.company.value,
        organizationType: this.organizationType.value
      });
    }
  }

  validate() {
    if (
      !this.firstName.value ||
      !this.lastName.value ||
      !this.email.value ||
      !this.phone.value ||
      !this.company.value
    ) {
      this.setState({ formErrors: 'Fields cannot be blank.' });
      return false;
    }
    return true;
  }

  render() {
    const {
      match: { params: { surveyId } },
      sendingLeads,
      sentLeads,
      sendLeadErrors
    } = this.props;

    if (sentLeads[surveyId]) {
      return (
        <div className="EmailLead">
          <h3 className="EmailLead_thanksTitle">
            Thanks for your inquiry!
          </h3>
          <p className="EmailLead_thanksText">
            Our Research Services Group will be in touch with you
            within 1 business day.<br />
            For immedate assistance, contact us at 866-872-4006.
          </p>
        </div>
      );
    }

    return (
      <div className="EmailLead" style={{ visibility: 'hidden' }}>
        <p className="error">{this.state.formErrors}</p>
        <div className="EmailLead_fields">
          <p className="EmailLead_formField">
            <label className="EmailLead_label">
              First Name:<span className="error">*</span>
            </label>
            <input
              type="text"
              className="EmailLead_input"
              ref={el => (this.firstName = el)}
            />
          </p>
          <p className="EmailLead_formField">
            <label className="EmailLead_label">
              Last Name:<span className="error">*</span>
            </label>
            <input
              type="text"
              className="EmailLead_input"
              ref={el => (this.lastName = el)}
            />
          </p>
          <p className="EmailLead_formField">
            <label className="EmailLead_label">
              Email:<span className="error">*</span>
            </label>
            <input
              type="text"
              className="EmailLead_input"
              ref={el => (this.email = el)}
            />
          </p>
          <p className="EmailLead_formField">
            <label className="EmailLead_label">
              Phone:<span className="error">*</span>
            </label>
            <input
              type="text"
              className="EmailLead_input"
              ref={el => (this.phone = el)}
            />
          </p>
          <p className="EmailLead_formField">
            <label className="EmailLead_label">
              Company:<span className="error">*</span>
              <small className="EmailLead_small">
                (If not a company, please best describe yourself.)
              </small>
            </label>
            <input
              type="text"
              className="EmailLead_input"
              ref={el => (this.company = el)}
            />
          </p>
          <p className="EmailLead_formField">
            <label className="EmailLead_label">
              What best describes you or your organization?
              <span className="error">*</span>
            </label>
            <select
              className="form-control"
              ref={el => (this.organizationType = el)}>
              <option>Company/Corporation</option>
              <option>Government</option>
              <option>Non-Profit Organization</option>
              <option>Student</option>
              <option>Individual/Startup</option>
              <option>End Client = Corporate Research</option>
              <option>Advertising/Marketing/PR</option>
              <option>Academia</option>
              <option>Consultant</option>
              <option>Other</option>
            </select>
          </p>
        </div>
        <div className="EmailLead_buttonRow">
          {sendingLeads[surveyId] ? (
            <Throbber show={true} text="Sending Info..." />
          ) : (
            <button
              className="EmailLead_submitBtn"
              onClick={() => this.onSubmit()}>
              Submit
            </button>
          )}
          {sendLeadErrors[surveyId] && (
            <p className="EmailLead_error">
              Sorry, there was a problem sending your info. Maybe try
              again?
            </p>
          )}
        </div>
      </div>
    );
  }
}

EmailLead.propTypes = {
  match: PropTypes.object,
  sendEmailLead: PropTypes.func,
  sendingLeads: PropTypes.object,
  sentLeads: PropTypes.object,
  sendLeadErrors: PropTypes.object
};

export default EmailLead;
