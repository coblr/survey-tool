import React from 'react';
import { Link } from 'react-router-dom';

import './AppFooter.css';

class AppFooter extends React.PureComponent {
  render() {
    return (
      <footer className="AppFooter" style={{ visibility: 'hidden' }}>
        <div className="AppFooter_leftCol" />
        <div className="AppFooter_rightCol">
          <a
            id="link-footerSupport"
            className="AppFooter_link"
            href="http://support.surveybuilder.com">
            Support
          </a>
          <Link
            id="link-footerPrivacy"
            className="AppFooter_link"
            to="/privacy">
            Privacy Policy
          </Link>
          <Link
            id="link-footerToc"
            className="AppFooter_link"
            to="/terms">
            Terms &amp; Conditions
          </Link>
          <span>
            &copy; 2017 Survey Sampling International, LLC. All rights
            reserved.
          </span>
        </div>
      </footer>
    );
  }
}

export default AppFooter;
