import React from 'react';
import PropTypes from 'prop-types';

import './UploadButton.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class UploadButton extends React.PureComponent {
  render() {
    const { onFileSelect, className } = this.props;
    return (
      <div
        className={`UploadButton ${className}`}
        style={{ visibility: 'hidden' }}>
        <input
          className="UploadButton_input"
          type="file"
          onChange={e => onFileSelect(e.target.files[0])}
        />
        <SVGIcon
          iconId="upload-lg"
          className="UploadButton_uploadIcon"
        />
        Upload Image
      </div>
    );
  }
}

UploadButton.propTypes = {
  onFileSelect: PropTypes.func,
  className: PropTypes.string
};

export default UploadButton;
