import React from 'react';
import PropTypes from 'prop-types';

import './UploadPreview.css';

export class UploadPreview extends React.PureComponent {
  render() {
    const { width, height, enqueued } = this.props;
    const imgProps = {};
    if (width) {
      imgProps.width = width;
    }
    if (height) {
      imgProps.height = height;
    }

    if (!this.props.src) return null;
    return (
      <div className="UploadPreview" style={{ visibility: 'hidden' }}>
        <img
          {...imgProps}
          className="UploadPreview_image"
          alt="Upload Preview"
          src={this.props.src}
        />
        {enqueued && (
          <div className="UploadPreview_disclaimer">
            * not uploaded yet
          </div>
        )}
      </div>
    );
  }
}

UploadPreview.propTypes = {
  src: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  enqueued: PropTypes.bool
};

export default UploadPreview;
