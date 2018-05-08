import React from 'react';
import { connect } from 'react-redux';

import Toaster from '../../components/Toaster/Toaster';

import { dismissNotification } from '../../store/ui/Notifications';

export class ToasterCtnr extends React.PureComponent {
  render() {
    return <Toaster {...this.props} />;
  }
}

ToasterCtnr.propTypes = {};

const mapStateToProps = state => ({
  notifications: state.Notifications.get('notifications').toJS()
});

const mapDispatchToProps = dispatch => ({
  dismiss(index) {
    dispatch(dismissNotification(index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  ToasterCtnr
);
