import React from 'react';
import PropTypes from 'prop-types';

import './DownloadReportModal.css';

export class DownloadReportModal extends React.PureComponent {
  render() {
    const { downloadParams, setDownloadParam, filterId } = this.props;

    const params = [
      {
        param: 'includeOpenEndedText',
        label: 'Include open-ended text data'
      },
      {
        param: 'displayAnswerIndex',
        label:
          'Display numerical reporting values instead of answer text'
      },
      {
        param: 'displayQuestionCode',
        label:
          'Display question codes (e.g. Q1) instead of question text'
      }
    ];

    let description = 'Raw data will be downloaded as a CSV file';
    if (filterId) {
      description = 'This report will be downloaded as a CSV file';
    }

    return (
      <div
        className="DownloadReportModal"
        style={{ visibility: 'hidden' }}>
        <h4 className="DownloadReportModal_header">{description}</h4>
        {params.map((p, i) => (
          <p key={i} className="DownloadReportModal_param">
            <label className="DownloadReportModal_label">
              <input
                type="checkbox"
                id={`input_csvDownload_${p.param}`}
                className="DownloadReportModal_cbx"
                checked={downloadParams[p.param] || false}
                onChange={() =>
                  setDownloadParam(p.param, !downloadParams[p.param])}
              />
              {p.label}
            </label>
          </p>
        ))}
      </div>
    );
  }
}

DownloadReportModal.propTypes = {
  downloadParams: PropTypes.object,
  setDownloadParam: PropTypes.func,
  filterId: PropTypes.string
};

export default DownloadReportModal;
