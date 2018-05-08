import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change } from 'redux-form';

import QuestionMedia from '../../components/QuestionMedia/QuestionMedia';

import { uploadMedia, clearMediaErrors } from '../../store/api/Media';
import { hideMediaUploader } from '../../store/ui/QuestionEditor.js';

export class QuestionMediaCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    this.validateFile = this.validateFile.bind(this);

    this.state = {
      fileSizeExceeded: false
    };
  }
  componentWillUnmount() {
    this.props.clearMediaErrors();
  }

  validateFile(file) {
    this.setState({ fileSizeExceeded: false });

    const maxSize = 20 * Math.pow(1024, 2);
    if (file.size > maxSize) {
      this.setState({ fileSizeExceeded: true });
    } else {
      this.props.uploadMedia(file);
    }
  }

  render() {
    return (
      <QuestionMedia
        {...this.props}
        {...this.state}
        handleFileSelect={this.validateFile}
      />
    );
  }
}

QuestionMediaCtnr.propTypes = {
  uploadMedia: PropTypes.func,
  clearMediaErrors: PropTypes.func
};

const mapStateToProps = state => ({
  uploadingMedia: state.Media.get('uploadingMedia'),
  uploadMediaError: state.Media.get('uploadMediaError').toJS(),
  media: state.Media.get('media').toJS()
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setMediaSize(size) {
    dispatch(change(ownProps.formId, 'placedImage.size', size));
  },
  uploadMedia(file) {
    dispatch(uploadMedia(file)).then(res => {
      if (!res.error) {
        dispatch(
          change(
            ownProps.formId,
            'placedImage.image.id',
            res.payload.id
          )
        );
      }
    });
  },
  clearMediaErrors() {
    dispatch(clearMediaErrors());
  },
  clearQuestionMedia() {
    dispatch(change(ownProps.formId, 'placedImage', null));
    dispatch(hideMediaUploader(ownProps.question.id));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  QuestionMediaCtnr
);
