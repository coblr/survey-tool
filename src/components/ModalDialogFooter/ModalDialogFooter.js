import React from 'react';
import PropTypes from 'prop-types';

import './ModalDialogFooter.css';

export class ModalDialogFooter extends React.PureComponent {
  render() {
    const {
      onDismiss,
      onSubmit,
      dismissLabel,
      submitLabel,
      dismissDisabled,
      submitDisabled
    } = this.props;

    return (
      <div
        className="ModalDialogFooter"
        style={{ visibility: 'hidden' }}>
        <div className="ModalDialogFooter_dismiss">
          <button
            className="ModalDialogFooter_dismissBtn"
            onClick={() => onDismiss()}
            disabled={dismissDisabled}>
            {dismissLabel || 'Cancel'}
          </button>
        </div>
        <div className="ModalDialogFooter_submit">
          <button
            className="ModalDialogFooter_submitBtn"
            onClick={() => onSubmit()}
            disabled={submitDisabled}>
            {submitLabel || 'Save'}
          </button>
        </div>
      </div>
    );
  }
}

ModalDialogFooter.propTypes = {
  dismissLabel: PropTypes.string,
  submitLabel: PropTypes.string,
  onDismiss: PropTypes.func,
  onSubmit: PropTypes.func,
  dismissDisabled: PropTypes.bool,
  submitDisabled: PropTypes.bool
};

export default ModalDialogFooter;
