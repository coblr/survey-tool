import React from 'react';
import { connect } from 'react-redux';

import UserQuickActions from '../../components/UserQuickActions/UserQuickActions';

import { logout } from '../../store/ui/User';

export class UserQuickActionsCtnr extends React.PureComponent {
  render() {
    return <UserQuickActions {...this.props} />;
  }
}

UserQuickActionsCtnr.propTypes = {};

const mapStateToProps = state => ({
  firstName: state.User.get('firstName'),
  lastName: state.User.get('lastName')
});

const mapDispatchToProps = dispatch => ({
  logout() {
    dispatch(logout());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  UserQuickActionsCtnr
);
