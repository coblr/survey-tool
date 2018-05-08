import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Environment from '../../helpers/Environment';

import './AppHeader.css';
import UserQuickActionsCtnr from '../../containers/UserQuickActionsCtnr/UserQuickActionsCtnr';
import SSILogo from '../SSILogo/SSILogo';

export class AppHeader extends React.PureComponent {
  render() {
    const {
      title,
      showAppActions,
      openCreateSurveyModal,
      isAdmin
    } = this.props;

    let isDkUser;
    if (localStorage.getItem('user-type') === 'dk') {
      isDkUser = true;
    }

    let selfServeUrl;
    switch (Environment) {
      case 'ci':
        selfServeUrl =
          'http://dev-selfservesample.surveysampling.com';
        break;
      case 'qa':
        selfServeUrl = 'http://qa-selfservesample.surveysampling.com';
        break;
      case 'stage':
        selfServeUrl = 'http://selfservesample.surveysampling.com';
        break;
      case 'prod':
        selfServeUrl = 'http://selfservesample.surveysampling.com';
        break;
      default:
        selfServeUrl = 'http://qa-selfservesample.surveysampling.com';
    }

    return (
      <div className="AppHeader" style={{ visibility: 'hidden' }}>
        <div className="AppHeader_stripe" />

        <div className="AppHeader_content">
          <div className="AppHeader_branding">
            <SSILogo className="AppHeader_logo" />
            <h1 className="AppHeader_title">{title}</h1>
          </div>

          {showAppActions && (
            <div className="AppHeader_actions">
              {isDkUser && (
                <a
                  href={selfServeUrl}
                  className="AppHeader_actionItem">
                  Self Serve Sample
                </a>
              )}
              {isAdmin && (
                <Link to="/admin" className="AppHeader_actionItem">
                  Admin
                </Link>
              )}
              <Link to="/surveys" className="AppHeader_actionItem">
                My Surveys
              </Link>
              <a
                className="AppHeader_actionItem"
                onClick={() => openCreateSurveyModal()}>
                + New Survey
              </a>
              <UserQuickActionsCtnr className="AppHeader_actionItem" />
            </div>
          )}
        </div>
      </div>
    );
  }
}

AppHeader.propTypes = {
  title: PropTypes.string,
  showAppActions: PropTypes.bool,
  openCreateSurveyModal: PropTypes.func,
  isAdmin: PropTypes.bool
};

export default AppHeader;
