import React from 'react';
import PropTypes from 'prop-types';

import './ModalDialogHeader.css';

import SVGIcon from '../SVGIcon/SVGIcon';

export class ModalDialogHeader extends React.PureComponent {
  render() {
    const { title, titleIcon, onDismiss } = this.props;
    return (
      <header
        className="ModalDialogHeader"
        style={{ visibility: 'hidden' }}>
        <h3 className="ModalDialogHeader_title">
          <SVGIcon
            iconId={titleIcon}
            className="ModalDialogHeader_titleIcon"
          />
          {title}
        </h3>
        <div className="ModalDialogHeader_actions">
          <a onClick={() => onDismiss()}>
            <SVGIcon
              id="btn-closeModal"
              iconId="closex-thick-lg"
              className="ModalDialogHeader_actionIcon"
            />
          </a>
        </div>
      </header>
    );
  }
}

ModalDialogHeader.propTypes = {
  title: PropTypes.string,
  titleIcon: PropTypes.string,
  onDismiss: PropTypes.func
};

export default ModalDialogHeader;
