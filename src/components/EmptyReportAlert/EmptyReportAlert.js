import React from 'react';
import PropTypes from 'prop-types';

import './EmptyReportAlert.css';

import SVGIcon from '../SVGIcon/SVGIcon';

export class EmptyReportAlert extends React.PureComponent {
  render() {
    return (
      <div
        className="EmptyReportAlert"
        style={{ visibility: 'hidden' }}>
        {this.props.text}
        <SVGIcon
          iconId="frown-sad"
          className="EmptyReportAlert_icon"
        />
      </div>
    );
  }
}

EmptyReportAlert.propTypes = {
  text: PropTypes.string
};

export default EmptyReportAlert;
