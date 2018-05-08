import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NotFound from '../../components/NotFound/NotFound';

import { configureLayout } from '../../store/ui/Global';

export class NotFoundCtnr extends React.PureComponent {
  componentWillMount() {
    this.props.configureLayout({
      showAppActions: false
    });
  }

  render() {
    return <NotFound {...this.props} />;
  }
}

NotFoundCtnr.propTypes = {
  configureLayout: PropTypes.func
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  configureLayout(config) {
    dispatch(configureLayout(config));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  NotFoundCtnr
);
