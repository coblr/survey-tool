import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import App from '../../components/App/App';

import { hydrateUser } from '../../store/ui/User';
import { openCreateSurveyModal } from '../../store/ui/CreateSurveyModal';

export class AppCtnr extends React.PureComponent {
  componentWillMount() {
    const { hydrateUser, keycloak } = this.props;

    let {
      token,
      idTokenParsed: {
        name,
        sub,
        given_name: firstName,
        family_name: lastName,
        email,
        preferred_username
      },
      realmAccess,
      resourceAccess
    } = keycloak;

    // DK users don't have `name`, but do have `pref_username`
    // which has both values in "first_last" format.
    if (!name) {
      const split = preferred_username.split('_');
      firstName = split[0];
      lastName = split[1];
    }

    const userInfo = {
      id: sub,
      firstName,
      lastName,
      email,
      realmAccess: realmAccess || {},
      resourceAccess: resourceAccess || {}
    };

    if (window.zE) {
      window.zE(function() {
        window.zE.identify({
          name: `${firstName} ${lastName}`,
          email: email
        });
      });
    }

    localStorage.setItem('auth-token', token);
    localStorage.setItem('user-info', JSON.stringify(userInfo));
    hydrateUser(userInfo);
  }

  componentWillUnmount() {
    console.log('===> unmounted');
  }

  componentDidUpdate() {
    const { keycloak, isLoggedIn } = this.props;

    // an active user is one that everything is pre-expiration.
    // a valid user has an expired token, but can still refresh.
    const activeUser = isLoggedIn && keycloak.authenticated;
    const validUser =
      !keycloak.authenticated && keycloak.refreshToken;

    if (!isLoggedIn) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user-info');
      // logout will redirect, do it last.
      keycloak.logout();
      return;
    }

    if (activeUser || validUser) {
      keycloak.updateToken();
    } else if (!activeUser && !validUser) {
      keycloak.login();
    }
  }

  render() {
    return <App {...this.props} />;
  }
}

AppCtnr.propTypes = {
  location: PropTypes.object,
  hydrateUser: PropTypes.func,
  realmAccess: PropTypes.object,
  keycloak: PropTypes.object,
  isLoggedIn: PropTypes.bool
};

const mapStateToProps = state => ({
  appTitle: state.Global.get('appTitle'),
  appBodyBackground: state.Global.get('appBodyBackground'),
  showAppActions: state.Global.get('showAppActions'),
  realmAccess: state.User.get('realmAccess').toJS(),
  isLoggedIn: state.User.get('isLoggedIn')
});

const mapDispatchToProps = dispatch => ({
  openCreateSurveyModal() {
    dispatch(openCreateSurveyModal());
  },
  hydrateUser(userInfo) {
    dispatch(hydrateUser(userInfo));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppCtnr);
