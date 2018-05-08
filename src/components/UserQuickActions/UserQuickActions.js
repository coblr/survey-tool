import React from 'react';
import PropTypes from 'prop-types';

import './UserQuickActions.css';

export class UserQuickActions extends React.PureComponent {
  render() {
    const { firstName, lastName, className, logout } = this.props;

    let displayName = 'Guest';
    if (firstName && lastName) {
      displayName = `${firstName} ${lastName[0]}.`;
    }

    return (
      <div
        className={`UserQuickActions ${className}`}
        style={{ visibility: 'hidden' }}>
        <div className="UserQuickActions_toggle">{displayName}</div>
        <div className="UserQuickActions_menuWrapper">
          <div className="UserQuickActions_menu">
            <div className="UserQuickActions_menuItem">
              <a
                className="UserQuickActions_menuLink"
                onClick={() => logout()}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserQuickActions.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  className: PropTypes.string,
  logout: PropTypes.func
};

export default UserQuickActions;
