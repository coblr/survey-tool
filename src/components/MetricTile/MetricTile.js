import React from 'react';
import PropTypes from 'prop-types';

import './MetricTile.css';

export class MetricTile extends React.PureComponent {
  render() {
    return (
      <div className="MetricTile" style={{ visibility: 'hidden' }}>
        <p className="MetricTile_label">{this.props.label}</p>
        <p className="MetricTile_metric">{this.props.metric}</p>
      </div>
    );
  }
}

MetricTile.propTypes = {
  metric: PropTypes.number,
  label: PropTypes.string
};

export default MetricTile;
