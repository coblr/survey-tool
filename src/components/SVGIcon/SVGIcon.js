import React from 'react';
import PropTypes from 'prop-types';

import './SVGIcon.css';

export class SVGIcon extends React.PureComponent {
  render() {
    const { className, iconId } = this.props;
    return (
      <svg className={`SVGIcon ${className || ''}`}>
        <use xlinkHref={`/assets/icons.svg#${iconId}`} />
      </svg>
    );
  }
}

SVGIcon.propTypes = {
  iconId: PropTypes.string,
  className: PropTypes.string
};

export default SVGIcon;
