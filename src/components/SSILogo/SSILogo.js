import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './SSILogo.css';

export class SSILogo extends React.PureComponent {
  render() {
    return (
      <Link to="/">
        <svg
          viewBox="0 0 227.8 78"
          className={`SSILogo ${this.props.className}`}>
          <use xlinkHref="/assets/SSI_Logo.svg#ssi" />
        </svg>
      </Link>
    );
  }
}

SSILogo.propTypes = {
  className: PropTypes.string
};

export default SSILogo;
