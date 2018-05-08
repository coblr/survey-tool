import React from 'react';
import PropTypes from 'prop-types';

import './UploadDrop.css';

export class UploadDrop extends React.PureComponent {
  render() {
    const { className, onSelect, promptText } = this.props;
    return (
      <div className="UploadDrop" style={{ visibility: 'hidden' }}>
        <input
          className="UploadDrop_input"
          type="file"
          onChange={e => onSelect(e)}
        />
        <div className={`UploadDrop_prompt ${className}`}>
          {promptText || 'Click or Drop Files Here to Upload'}
        </div>
      </div>
    );
  }
}

UploadDrop.propTypes = {
  onSelect: PropTypes.func,
  promptText: PropTypes.string,
  className: PropTypes.string
};

export default UploadDrop;
