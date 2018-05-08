import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AppSubHeaderCtnr from '../../containers/AppSubHeaderCtnr/AppSubHeaderCtnr';
import UserSearchCtnr from '../../containers/UserSearchCtnr/UserSearchCtnr';

import { configureLayout } from '../../store/ui/Global';
import { clearOwner } from '../../store/api/Survey';

export class AdminCtnr extends React.PureComponent {
  componentWillMount() {
    this.props.configureLayout({
      showAppActions: true,
      appBodyBackground: '#FFF'
    });
    this.props.clearOwner();

    const userInfo = JSON.parse(localStorage.getItem('user-info'));
    let isAdmin = false;
    if (userInfo && userInfo.realmAccess) {
      isAdmin = userInfo.realmAccess.roles.indexOf('sb_admin') !== -1;
    }

    if (!isAdmin) {
      window.location = '/surveys';
    }
  }

  render() {
    return (
      <div>
        <AppSubHeaderCtnr icon="globe-lg" title="Admin" />
        <div className="container">
          <UserSearchCtnr />
        </div>
      </div>
    );
  }
}

AdminCtnr.propTypes = {
  configureLayout: PropTypes.func,
  clearOwner: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  configureLayout(config) {
    dispatch(configureLayout(config));
  },
  clearOwner() {
    dispatch(clearOwner());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AdminCtnr
);
