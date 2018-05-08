import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FeatureToggles from '../../helpers/FeatureToggles';

export class FeatureToggle extends React.PureComponent {
  render() {
    const { feature, children } = this.props;
    return !FeatureToggles[feature] ? null : children;
  }
}

FeatureToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string
  ]),
  feature: PropTypes.string
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  FeatureToggle
);
