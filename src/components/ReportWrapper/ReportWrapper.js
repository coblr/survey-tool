import React from 'react';
import PropTypes from 'prop-types';

import './ReportWrapper.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FilterSelectorCtnr from '../../containers/FilterSelectorCtnr/FilterSelectorCtnr';
import InlineEditorCtnr from '../../containers/InlineEditorCtnr/InlineEditorCtnr';
import ActionAlert from '../ActionAlert/ActionAlert';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class ReportWrapper extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteAlert: false
    };
  }

  render() {
    const {
      children,
      title,
      allowMultipleFilters,
      openCreateFilterModal,
      mappingId,
      updateFilter,
      deleteFilter,
      isSaving,
      refreshFilter,
      allowTitleEdit,
      openDownloadReportModal,
      allowDownload
    } = this.props;

    let deleteAlertClass = ['ReportWrapper_deleteAlert'];
    if (this.state.showDeleteAlert) {
      deleteAlertClass.push('ReportWrapper_deleteAlert--show');
    }

    return (
      <div className="ReportWrapper" style={{ visibility: 'hidden' }}>
        <div className="ReportWrapper_titleBar">
          <SVGIcon
            iconId="response"
            className="ReportWrapper_titleIcon"
          />
          {!allowTitleEdit ? (
            title
          ) : (
            <InlineEditorCtnr
              editorId="filterTitle"
              value={title}
              onSubmit={value => updateFilter(value)}
              saving={isSaving}>
              {title}
            </InlineEditorCtnr>
          )}
          <div className="ReportWrapper_actions">
            {allowMultipleFilters && (
              <FilterSelectorCtnr mappingId={mappingId} />
            )}
            {allowMultipleFilters && (
              <FeatureToggle feature="REPORT_MGMT_ENABLED">
                <button
                  onClick={() => openCreateFilterModal()}
                  className="ReportWrapper_newReportBtn">
                  <SVGIcon
                    iconId="new-report-doc"
                    className="ReportWrapper_newReportIcon"
                  />
                  New Report
                </button>
              </FeatureToggle>
            )}
          </div>
        </div>
        <div className="ReportWrapper_subTitleBar">
          <div className="ReportWrapper_subTitleLeft">
            {openDownloadReportModal &&
              allowDownload && (
                <FeatureToggle feature="FILTERED_CSV_ENABLED">
                  <button
                    className="ReportWrapper_subTitleBtn"
                    onClick={() => openDownloadReportModal()}>
                    <SVGIcon
                      iconId="download-lg"
                      className="ReportWrapper_subTitleIcon"
                    />
                    Download Report
                  </button>
                </FeatureToggle>
              )}
          </div>
          <div className="ReportWrapper_subTitleRight">
            <ActionAlert
              pointer="rightMiddle"
              className={deleteAlertClass.join(' ')}
              dismissAction={() =>
                this.setState({ showDeleteAlert: false })}
              confirmAction={() => deleteFilter()}>
              <p>
                Are you sure you want to delete this report? If you
                have shared this report, it will no longer be
                available.
              </p>
            </ActionAlert>
            {deleteFilter && (
              <button
                id="btn_deleteFilter"
                className="ReportWrapper_subTitleBtn"
                onClick={() =>
                  this.setState({ showDeleteAlert: true })}>
                <SVGIcon
                  iconId="trash-lg"
                  className="ReportWrapper_subTitleIcon"
                />
                Delete
              </button>
            )}
            {refreshFilter && (
              <button
                id="btn_refreshFilter"
                className="ReportWrapper_subTitleBtn"
                onClick={() => refreshFilter()}>
                <SVGIcon
                  iconId="reload"
                  className="ReportWrapper_subTitleIcon"
                />
                Refresh
              </button>
            )}
          </div>
        </div>
        <div className="ReportWrapper_reportBody">{children}</div>
      </div>
    );
  }
}

ReportWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  surveyId: PropTypes.string,
  title: PropTypes.string,
  showResponseActions: PropTypes.bool,
  allowMultipleFilters: PropTypes.bool,
  openCreateFilterModal: PropTypes.func,
  mappingId: PropTypes.string,
  updateFilter: PropTypes.func,
  deleteFilter: PropTypes.func,
  isSaving: PropTypes.bool,
  refreshFilter: PropTypes.func,
  allowTitleEdit: PropTypes.bool,
  interviews: PropTypes.array,
  interviewId: PropTypes.string,
  openDownloadReportModal: PropTypes.func,
  allowDownload: PropTypes.bool
};

export default ReportWrapper;
