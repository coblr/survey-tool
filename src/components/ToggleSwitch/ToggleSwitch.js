import React from 'react';
import PropTypes from 'prop-types';

import './ToggleSwitch.css';

export class ToggleSwitch extends React.PureComponent {
  render() {
    const toggleClass = ['ToggleSwitch'];
    if (this.props.active) {
      toggleClass.push('ToggleSwitch--active');
    }
    if (this.props.className) {
      toggleClass.push(this.props.className);
    }

    return (
      <div
        className={toggleClass.join(' ')}
        style={{ visibility: 'hidden' }}
        onClick={() => this.props.onToggle()}>
        <div className="ToggleSwitch_knob" />
      </div>
    );
  }
}

ToggleSwitch.propTypes = {
  active: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string
};

export default ToggleSwitch;
