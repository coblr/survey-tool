import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UploadForm from '../../components/UploadForm/UploadForm';
import UploadPreview from '../../components/UploadPreview/UploadPreview';

import { enqueueMedia, uploadMedia } from '../../store/api/Media';

export class FileUploaderCtnr extends React.PureComponent {
  handleSelect(e) {
    e.preventDefault();

    if (this.props.autoUpload) {
      this.uploadFile(e);
    } else {
      this.enqueueFile(e);
    }
  }

  enqueueFile(e) {
    const { enqueueMedia, id } = this.props;
    const file = e.target.files[0];

    const imageType = /^image\//;
    if (!imageType.test(file.type)) return;

    enqueueMedia(id, file);
  }

  uploadFile(e) {
    const { uploadMedia, surveyId, id } = this.props;
    const file = e.target.files[0];

    uploadMedia(surveyId, id, file);
  }

  render() {
    const {
      className,
      id,
      uploads,
      uploading,
      enqueued
    } = this.props;

    return (
      <div className={className}>
        {!enqueued[id] &&
          !uploads[id] && (
            <UploadForm
              onSelect={e => this.handleSelect(e)}
              promptText={uploading[id] ? 'Uploading...' : null}
            />
          )}

        {uploads[id] && (
          <UploadPreview src={uploads[id]} height="125" />
        )}

        {enqueued[id] && (
          <UploadPreview
            src={enqueued[id].previewImg}
            height="125"
            enqueued={true}
          />
        )}
      </div>
    );
  }
}

FileUploaderCtnr.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  enqueued: PropTypes.object,
  uploading: PropTypes.object,
  progress: PropTypes.object,
  completed: PropTypes.object,
  enqueueMedia: PropTypes.func,
  uploadMedia: PropTypes.func,
  surveyId: PropTypes.string,
  uploads: PropTypes.object,
  autoUpload: PropTypes.bool
};

const mapStateToProps = state => ({
  enqueued: state.Media.get('enqueued').toJS(),
  uploading: state.Media.get('uploading').toJS(),
  progress: state.Media.get('progress').toJS(),
  completed: state.Media.get('completed').toJS(),
  surveyId: state.Survey.get('currentSurveyId'),
  uploads: state.Media.get('uploads').toJS()
});

const mapDispatchToProps = dispatch => ({
  enqueueMedia(id, file) {
    dispatch(enqueueMedia(id, file));
  },
  uploadMedia(surveyId, id, file) {
    dispatch(uploadMedia(surveyId, id, file));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  FileUploaderCtnr
);
