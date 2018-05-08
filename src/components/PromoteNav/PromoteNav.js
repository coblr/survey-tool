import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './PromoteNav.css';

export class PromoteNav extends React.PureComponent {
  render() {
    const { survey, location: { pathname } } = this.props;
    const userType = localStorage.getItem('user-type');

    const classNames = {
      invite: ['PromoteNav_item'],
      online: ['PromoteNav_item'],
      mobile: ['PromoteNav_item'],
      sample: ['PromoteNav_item']
    };

    if (userType === 'dk') {
      for (var cn in classNames) {
        classNames[cn].push('PromoteNav_item--halfWidth');
      }
    }

    const loc = pathname.split('/').pop();
    let hasLoc = false;
    if (classNames[loc]) {
      hasLoc = true;
      classNames[loc].push('PromoteNav_item--selected');
    }

    return (
      <div className="PromoteNav" style={{ visibility: 'hidden' }}>
        <Link
          to={`/surveys/${survey.id}/promote/invite`}
          className={classNames.invite.join(' ')}>
          Invite Your<br />Own Audience
          {!hasLoc && (
            <div>
              <div className="PromoteNav_img PromoteNav_img--invite" />
              <p className="PromoteNav_text">
                You can send your survey via email, post on<br />social
                networks or embed on your website.
              </p>
            </div>
          )}
        </Link>
        {userType === 'dk' && (
          <Link
            to={`/surveys/${survey.id}/promote/sample`}
            className={classNames.sample.join(' ')}>
            Access Our<br />Sample Audience
            {!hasLoc && (
              <div>
                <div className="PromoteNav_img PromoteNav_img--sample" />
                <p className="PromoteNav_text">
                  Get access to quality audiences by<br />creating a
                  project using SSI Self Serve Sample.
                </p>
              </div>
            )}
          </Link>
        )}
        {userType !== 'dk' && (
          <Link
            to={`/surveys/${survey.id}/promote/online`}
            className={classNames.online.join(' ')}>
            Access Our<br />Online Audience
            {!hasLoc && (
              <div>
                <div className="PromoteNav_img PromoteNav_img--online" />
                <p className="PromoteNav_text">
                  Get instant answers to your questions<br />from our
                  On-Demand audience.
                </p>
              </div>
            )}
          </Link>
        )}
        {userType !== 'dk' && (
          <Link
            to={`/surveys/${survey.id}/promote/mobile`}
            className={classNames.mobile.join(' ')}>
            Access Our<br />Mobile Audience
            {!hasLoc && (
              <div>
                <div className="PromoteNav_img PromoteNav_img--mobile" />
                <p className="PromoteNav_text">
                  Get instant answers to your questions<br />from our
                  mobile audience.
                </p>
              </div>
            )}
          </Link>
        )}
      </div>
    );
  }
}

PromoteNav.propTypes = {
  survey: PropTypes.object,
  location: PropTypes.object
};

export default PromoteNav;
