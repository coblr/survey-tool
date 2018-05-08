import React from 'react';
import PropTypes from 'prop-types';

import './PromoteMobile.css';

import SVGIcon from '../SVGIcon/SVGIcon';
import EmailLead from '../EmailLead/EmailLead';

export class PromoteMobile extends React.PureComponent {
  render() {
    const { match: { params: { surveyId } }, sentLeads } = this.props;

    return (
      <div className="PromoteMobile" style={{ visibility: 'hidden' }}>
        {!sentLeads[surveyId] && (
          <div>
            <div className="PromoteMobile_titleBar">
              <SVGIcon
                iconId="arrow-dr-lg"
                className="PromoteMobile_titleIcon"
              />
              <h3 className="PromoteMobile_title">
                Survey Builder Mobile Solutions
              </h3>
            </div>

            <div className="PromoteMobile_content">
              <img
                src="/assets/mobile-solutions.jpg"
                className="PromoteMobile_image"
                alt="Mobile Solutions"
              />
              <h3 className="PromoteMobile_headline">
                Quickly Access a Growing Mobile Market and Gain
                Insights
              </h3>
              <p className="PromoteMobile_description">
                With Survey Builder, all surveys are automatically
                formatted for mobile which means you can access
                thousands of mobile users present at physical
                locations or checking in via social-media. Engage your
                mobile audience with tools that allow you to:
              </p>
              <ul className="PromoteMobile_list">
                <li className="PromoteMobile_listItem">
                  <span className="PromoteMobile_bullet">
                    Get Instant Feedback at Restaurants or After an
                    Event.
                  </span>
                  Launch a survey with a QR code to capture audience
                  feedback.
                </li>
                <li className="PromoteMobile_listItem">
                  <span className="PromoteMobile_bullet">
                    Conduct Affordable Mystery Shopper Studies.
                  </span>
                  Send mystery shoppers to stores to ensure products
                  and displays are set up properly.
                </li>
                <li className="PromoteMobile_listItem">
                  <span className="PromoteMobile_bullet">
                    Measure Out of Home Ad Awareness and Exposure.
                  </span>
                  Embed images and video into surveys and ask audience
                  to recall ad.
                </li>
                <li className="PromoteMobile_listItem">
                  <span className="PromoteMobile_bullet">
                    Launch Mobile Diary Studies.
                  </span>
                  Ask audience to document recently purchased products
                  and share their experiences over time.
                </li>
                <li className="PromoteMobile_listItem">
                  <span className="PromoteMobile_bullet">
                    Conduct Surveys with Geo-Validation.
                  </span>
                  Find your audience via GPS signal and
                  time-at-location.
                </li>
              </ul>
            </div>
            <h3 className="PromoteMobile_formTitle">
              Want to Access a Mobile Audience Today?
            </h3>
            <p className="PromoteMobile_instruction">
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

PromoteMobile.propTypes = {
  match: PropTypes.object,
  sentLeads: PropTypes.object
};

export default PromoteMobile;
