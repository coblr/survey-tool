import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './NotAvailable.css';

export class NotAvailable extends React.PureComponent {
  render() {
    const { className, reason, escapeUrl, escapeLabel } = this.props;

    return (
      <div
        className={`NotAvailable ${className}`}
        style={{ visibility: 'hidden' }}>
        <p>{reason}</p>
        {escapeUrl && (
          <Link to={escapeUrl}>{escapeLabel || 'Go Back'}</Link>
        )}
      </div>
    );
  }
}

NotAvailable.propTypes = {
  className: PropTypes.string,
  reason: PropTypes.string,
  escapeUrl: PropTypes.string,
  escapeLabel: PropTypes.string
};

export default NotAvailable;
