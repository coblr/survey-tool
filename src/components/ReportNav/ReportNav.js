import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './ReportNav.css';
import SVGIcon from '../SVGIcon/SVGIcon';

export class ReportNav extends React.PureComponent {
  render() {
    const {
      surveyId,
      location,
      openDownloadReportModal,
      allowDownload
    } = this.props;

    const classes = {
      realTime: 'ReportNav_shortNavItem',
      individual: 'ReportNav_shortNavItem'
    };
    const loc = location.pathname.split('/');
    if (loc.indexOf('individual') === -1) {
      classes.realTime += ' ReportNav_shortNavItem--selected';
    } else {
      classes.individual += ' ReportNav_shortNavItem--selected';
    }

    return (
      <div className="ReportNav" style={{ visibility: 'hidden' }}>
        <Link
          to={`/surveys/${surveyId}/reports/realtime`}
          className={classes.realTime}>
          <div className="ReportNav_itemContent">
            <SVGIcon
              iconId="real-time-report"
              className="ReportNav_shortNavIcon"
            />
            Real-Time<br />Reports
          </div>
        </Link>
        <Link
          to={`/surveys/${surveyId}/reports/individual`}
          className={classes.individual}>
          <div className="ReportNav_itemContent">
            <SVGIcon
              iconId="response"
              className="ReportNav_shortNavIcon"
            />
            Individual<br />Responses
          </div>
        </Link>
        {allowDownload && (
          <div className="ReportNav_longNavItem">
            <div className="ReportNav_longItemContent">
              <p className="ReportNav_longNavLabel">
                Download Raw Data
                <small className="ReportNav_longNavSmall">
                  All responses, all data, unfiltered
                </small>
              </p>
              <button
                className="ReportNav_downloadBtn"
                onClick={() => openDownloadReportModal()}>
                <SVGIcon
                  iconId="arrow-r-lg"
                  className="ReportNav_arrowIcon"
                />
                <SVGIcon
                  iconId="doctype-excel"
                  className="ReportNav_csvIcon"
                />
                <span className="ReportNav_docType">CSV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

ReportNav.propTypes = {
  surveyId: PropTypes.string,
  location: PropTypes.object,
  openDownloadReportModal: PropTypes.func,
  allowDownload: PropTypes.bool
};

export default ReportNav;
