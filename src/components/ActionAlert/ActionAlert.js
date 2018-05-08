import React from 'react';
import PropTypes from 'prop-types';

import './ActionAlert.css';

export class ActionAlert extends React.PureComponent {
  render() {
    const {
      pointer,
      className,
      children,
      dismissAction,
      dismissLabel,
      confirmAction,
      confirmLabel
    } = this.props;

    let alertClass = 'ActionAlert';
    if (pointer) {
      alertClass += ' ActionAlert--pointer';
      alertClass += ` ActionAlert--${pointer}`;
    }
    alertClass += ` ${className}`;

    return (
      <div className={alertClass}>
        {children}
        {dismissAction && (
          <button
            type="button"
            className="ActionAlert_dismiss"
            onClick={() => dismissAction()}>
            {dismissLabel || 'No'}
          </button>
        )}
        {confirmAction && (
          <button
            type="button"
            className="ActionAlert_confirm"
            onClick={() => confirmAction()}>
            {confirmLabel || 'Yes'}
          </button>
        )}
      </div>
    );
  }
}

ActionAlert.propTypes = {
  pointer: PropTypes.oneOf([
    'topLeft',
    'topCenter',
    'topRight',
    'bottomLeft',
    'bottomCenter',
    'bottomRight',
    'leftTop',
    'leftMiddle',
    'leftBottom',
    'rightTop',
    'rightMiddle',
    'rightBottom'
  ]),
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object, // for single HTML element
    PropTypes.array, // for multiple HTML elements
    PropTypes.string
  ]),
  dismissLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  dismissAction: PropTypes.func,
  confirmAction: PropTypes.func
};

export default ActionAlert;
