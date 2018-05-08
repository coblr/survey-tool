import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LogoUploader from '../../components/LogoUploader/LogoUploader';
import UploadPreview from '../../components/UploadPreview/UploadPreview';

import { uploadLogo } from '../../store/api/SurveyLogo';

export class LogoUploaderCtnr extends React.PureComponent {
  handleSelect(e) {
    const { uploadLogo, surveyId } = this.props;
    const file = e.target.files[0];

    e.preventDefault();
    uploadLogo(surveyId, file);
  }

  render() {
    const { className, logo, uploadingLogo } = this.props;

    return (
      <div className={className}>
        {!logo && (
          <LogoUploader
            onSelect={e => this.handleSelect(e)}
            promptText={uploadingLogo ? 'Uploading...' : null}
          />
        )}

        {logo && <UploadPreview src={logo} height="125" />}
      </div>
    );
  }
}

LogoUploaderCtnr.propTypes = {
  className: PropTypes.string,
  uploadingLogo: PropTypes.bool,
  uploadLogo: PropTypes.func,
  surveyId: PropTypes.string,
  logo: PropTypes.string
};

const mapStateToProps = state => ({
  uploadingLogo: state.SurveyLogo.get('uploadingLogo'),
  logo: state.SurveyLogo.get('logo')
});

const mapDispatchToProps = dispatch => ({
  uploadLogo(surveyId, file) {
    dispatch(uploadLogo(surveyId, file));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  LogoUploaderCtnr
);
