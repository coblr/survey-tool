import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotAllowed from '../../components/NotAllowed/NotAllowed';

import { configureLayout } from '../../store/ui/Global';

export class NotAllowedCtnr extends React.PureComponent {
  componentWillMount() {
    this.props.configureLayout({
      showAppActions: false
    });
  }

  render() {
    return <NotAllowed {...this.props} />;
  }
}

NotAllowedCtnr.propTypes = {
  configureLayout: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  configureLayout(config) {
    dispatch(configureLayout(config));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NotAllowedCtnr
);
