import React from 'react';
import PropTypes from 'prop-types';

import './UploadForm.css';

export class UploadForm extends React.PureComponent {
  render() {
    const { className, onSelect, promptText } = this.props;
    return (
      <div className="UploadForm" style={{ visibility: 'hidden' }}>
        <input
          className="UploadForm_input"
          type="file"
          onChange={e => onSelect(e)}
        />
        <div className={`UploadForm_prompt ${className}`}>
          {promptText || 'Click or Drop Files Here to Upload'}
        </div>
      </div>
    );
  }
}

UploadForm.propTypes = {
  onSelect: PropTypes.func,
  promptText: PropTypes.string,
  className: PropTypes.string
};

export default UploadForm;
