import React from 'react';
import PropTypes from 'prop-types';

import './SSIIcon.css';

export class SSIIcon extends React.PureComponent {
  render() {
    return (
      <svg
        viewBox="0 0 79 79"
        className={`SSIIcon ${this.props.className}`}>
        <use xlinkHref="/assets/SSI_Icon.svg#ssi" />
      </svg>
    );
  }
}

SSIIcon.propTypes = {
  className: PropTypes.string
};

export default SSIIcon;
