import React from 'react';
import PropTypes from 'prop-types';

import './LogoUploader.css';

export class LogoUploader extends React.PureComponent {
  render() {
    const { className, onSelect, promptText } = this.props;
    return (
      <div className="LogoUploader" style={{ visibility: 'hidden' }}>
        <input
          className="LogoUploader_input"
          type="file"
          onChange={e => onSelect(e)}
        />
        <div className={`LogoUploader_prompt ${className}`}>
          {promptText || 'Click or Drop Files Here to Upload'}
        </div>
      </div>
    );
  }
}

LogoUploader.propTypes = {
  onSelect: PropTypes.func,
  promptText: PropTypes.string,
  className: PropTypes.string
};

export default LogoUploader;
