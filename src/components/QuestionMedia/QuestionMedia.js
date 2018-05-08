import React from 'react';
import PropTypes from 'prop-types';

import './QuestionMedia.css';
import Throbber from '../Throbber/Throbber';
import UploadButton from '../UploadButton/UploadButton';
import MediaSizeSelector from '../MediaSizeSelector/MediaSizeSelector';
import SVGIcon from '../SVGIcon/SVGIcon';

export class QuestionMedia extends React.PureComponent {
  render() {
    const { uploadingMedia, media, placedImage } = this.props;

    let mediaId;
    if (placedImage && placedImage.image) {
      mediaId = placedImage.image.id;
    }

    if (uploadingMedia) {
      return (
        <div className="QuestionMedia">
          {this.renderMediaThrobber()}
        </div>
      );
    }

    return (
      <div className="QuestionMedia">
        {!mediaId || !media[mediaId]
          ? this.renderMediaUploader()
          : this.renderMediaPreview()}
      </div>
    );
  }

  renderMediaThrobber() {
    return (
      <Throbber
        show={true}
        className="QuestionMedia_throbber"
        text="Uploading Image..."
      />
    );
  }

  renderMediaUploader() {
    const {
      uploadMediaError,
      handleFileSelect,
      fileSizeExceeded
    } = this.props;

    return (
      <div>
        {uploadMediaError.status && (
          <p className="QuestionMedia_error">
            Sorry, there was an error uploading your file.
          </p>
        )}

        {fileSizeExceeded && (
          <p className="QuestionMedia_error">
            Sorry, this file is too big to use. Please try another.
          </p>
        )}

        <div className="QuestionMedia_table">
          <div className="QuestionMedia_upload">
            <UploadButton
              className="QuestionMedia_uploadBtn"
              onFileSelect={handleFileSelect}
            />
          </div>
          <div className="QuestionMedia_requirements">
            <small>
              Supported file formats: JPG, JPEG, GIF, PNG<br />
              Max. image file size 20MB
            </small>
          </div>
        </div>
      </div>
    );
  }

  renderMediaPreview() {
    const {
      placedImage,
      setMediaSize,
      clearQuestionMedia,
      media
    } = this.props;

    const mediaId = placedImage.image.id;
    const mediaSize = placedImage.size;

    return (
      <div className="QuestionMedia_table">
        <div className="QuestionMedia_preview">
          <img
            className="QuestionMedia_img"
            src={media[mediaId].urls.MEDIUM}
            alt="Your Question"
          />
        </div>
        <div className="QuestionMedia_sizes">
          <MediaSizeSelector
            selected={mediaSize}
            onSelect={setMediaSize}
          />
        </div>
        <div className="QuestionMedia_delete">
          <button
            className="QuestionMedia_deleteBtn"
            onClick={() => clearQuestionMedia(mediaId)}>
            <SVGIcon
              iconId="trash-lg"
              className="QuestionMedia_deleteIcon"
            />
          </button>
        </div>
      </div>
    );
  }
}

QuestionMedia.propTypes = {
  placedImage: PropTypes.object,
  setMediaSize: PropTypes.func,
  handleFileSelect: PropTypes.func,
  media: PropTypes.object,
  uploadingMedia: PropTypes.bool,
  uploadMediaError: PropTypes.object,
  clearQuestionMedia: PropTypes.func,
  fileSizeExceeded: PropTypes.bool
};

export default QuestionMedia;
