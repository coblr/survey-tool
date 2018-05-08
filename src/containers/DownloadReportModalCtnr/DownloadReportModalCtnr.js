import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import DownloadReportModal from '../../components/DownloadReportModal/DownloadReportModal';
import ModalDialog from '../../components/ModalDialog/ModalDialog';
import ModalDialogHeader from '../../components/ModalDialogHeader/ModalDialogHeader';
import ModalDialogFooter from '../../components/ModalDialogFooter/ModalDialogFooter';

import {
  dismissDownloadReportModal,
  setDownloadParam
} from '../../store/ui/DownloadReportModal';

export class DownloadReportModalCtnr extends React.PureComponent {
  componentWillUpdate(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.props.setDownloadParam('includeOpenEndedText', true);
    }
  }

  onSubmit() {
    const {
      surveyId,
      surveyMap,
      downloadParams,
      dismissDownloadReportModal
    } = this.props;
    let filename = surveyMap[surveyId].title || 'Report';
    filename = encodeURIComponent(filename.replace(/[/]/g, '-'));
    let url = `/api/reports/csv/surveys/${surveyId}/${filename}.csv`;

    const reportOptions = [];
    _.each(downloadParams, (v, k) => {
      reportOptions.push(`${k}=${v}`);
    });
    reportOptions.push(
      `jwt_token=${localStorage.getItem('auth-token')}`
    );
    if (reportOptions.length) {
      url += `?${reportOptions.join('&')}`;
    }

    window.open(url, '_blank');
    dismissDownloadReportModal();
  }

  render() {
    const {
      isOpen,
      dismissDownloadReportModal,
      filterId
    } = this.props;
    let title = 'Download Raw Data';
    if (filterId) {
      title = 'Download Report';
    }

    return (
      <ModalDialog
        show={isOpen}
        width="600"
        onDismiss={() => dismissDownloadReportModal()}>
        <ModalDialogHeader
          title={title}
          titleIcon="download-lg"
          onDismiss={() => dismissDownloadReportModal()}
        />
        <DownloadReportModal {...this.props} />
        <ModalDialogFooter
          onDismiss={() => dismissDownloadReportModal()}
          onSubmit={() => this.onSubmit()}
          submitLabel="Download"
        />
      </ModalDialog>
    );
  }
}

DownloadReportModalCtnr.propTypes = {
  isOpen: PropTypes.bool,
  downloadParams: PropTypes.object,
  surveyId: PropTypes.string,
  dismissDownloadReportModal: PropTypes.func,
  setDownloadParam: PropTypes.func,
  surveyMap: PropTypes.object,
  filterId: PropTypes.string
};

const mapStateToProps = state => ({
  isOpen: state.DownloadReportModal.get('isOpen'),
  downloadParams: state.DownloadReportModal
    .get('downloadParams')
    .toJS(),
  surveyId: state.Survey.get('currentSurveyId'),
  surveyMap: state.Survey.get('surveyMap').toJS(),
  filterId: state.DownloadReportModal.get('filterId')
});

const mapDispatchToProps = dispatch => ({
  dismissDownloadReportModal() {
    dispatch(dismissDownloadReportModal());
  },
  setDownloadParam(param, value) {
    dispatch(setDownloadParam(param, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DownloadReportModalCtnr
);
