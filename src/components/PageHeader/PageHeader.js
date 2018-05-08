import React from 'react';
import PropTypes from 'prop-types';

import './PageHeader.css';

import SVGIcon from '../SVGIcon/SVGIcon';
import ActionAlert from '../ActionAlert/ActionAlert';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class PageHeader extends React.PureComponent {
  render() {
    const {
      index,
      page,
      survey,
      showDeleteAlert,
      closeDeleteAlert,
      showingDeleteAlert,
      deletePage,
      deletePageErrors,
      clearDeletePageError
    } = this.props;

    if (!page) return null;

    const deleteAlertClass = ['PageHeader_deleteAlert'];
    if (showingDeleteAlert[page.id]) {
      deleteAlertClass.push('PageHeader_deleteAlert--show');
    }

    const deleteError = deletePageErrors[page.id];
    const logicAlertClass = ['PageHeader_logicAlert'];
    if (
      deleteError &&
      deleteError.status === 409 &&
      deleteError.code === 1
    ) {
      logicAlertClass.push('PageHeader_logicAlert--show');
    }

    const showDelete = survey.pages.length > 1 && !survey.locked;

    return (
      <div className="PageHeader" style={{ visibility: 'hidden' }}>
        <div className="PageHeader_title">
          <SVGIcon iconId="document-lg" className="PageHeader_icon" />
          Page {index + 1}
        </div>
        {showDelete && (
          <FeatureToggle feature="SURVEY_MGMT_ENABLED">
            <div className="PageHeader_actions">
              <button
                className="PageHeader_actionBtn"
                onClick={() => showDeleteAlert(page.id)}>
                <SVGIcon
                  iconId="trash-lg"
                  className="PageHeader_actionIcon"
                />
              </button>
              <ActionAlert
                className={deleteAlertClass.join(' ')}
                pointer="rightTop"
                dismissAction={() => closeDeleteAlert(page.id)}
                confirmAction={() => deletePage(survey.id, page)}>
                <p>
                  Do you want to delete this page?<br />
                  Any questions on this page will also be permanently
                  deleted.
                </p>
              </ActionAlert>
              <ActionAlert
                className={logicAlertClass.join(' ')}
                pointer="rightTop"
                dismissAction={() => clearDeletePageError(page.id)}
                dismissLabel="Nevermind"
                confirmAction={() =>
                  deletePage(survey.id, page, true)}
                confirmLabel="Yes, Delete Anyway">
                <p>
                  This page is being referenced by page logic.<br />
                  Are you really sure you want to delete it?
                </p>
              </ActionAlert>
            </div>
          </FeatureToggle>
        )}
      </div>
    );
  }
}

PageHeader.propTypes = {
  index: PropTypes.number,
  page: PropTypes.object,
  survey: PropTypes.object,
  showDeleteAlert: PropTypes.func,
  closeDeleteAlert: PropTypes.func,
  showingDeleteAlert: PropTypes.object,
  deletePage: PropTypes.func,
  deletePageErrors: PropTypes.object,
  clearDeletePageError: PropTypes.func
};

export default PageHeader;
