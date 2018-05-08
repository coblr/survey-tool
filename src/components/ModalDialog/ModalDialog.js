import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './ModalDialog.css';

export class ModalDialog extends React.PureComponent {
  render() {
    const { show, children, width, height, onDismiss } = this.props;

    let bgClass = 'ModalDialog_background';
    let modalClass = 'ModalDialog_modal';
    if (show) {
      bgClass += ' ModalDialog_background--show';
      modalClass += ' ModalDialog_modal--show';
    }

    const modalStyle = {
      width: `${+width}px`,
      maxHeight: `${+height}px`,
      left: `calc(50% - ${+width / 2}px)`
    };

    const bodyStyle = {
      height: `${+height - 90}px`
    };

    return (
      <div className="ModalDialog" style={{ visibility: 'hidden' }}>
        <ReactCSSTransitionGroup
          transitionName="ModalDialog_bgTransition"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={1000}>
          <div className={bgClass} onClick={() => onDismiss()} />
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName="ModalDialog_transition"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={1000}>
          <div className={modalClass} style={modalStyle}>
            <div className="ModalDialog_body" style={bodyStyle}>
              {children}
            </div>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

ModalDialog.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  width: PropTypes.string,
  height: PropTypes.string,
  onDismiss: PropTypes.func
};

export default ModalDialog;
