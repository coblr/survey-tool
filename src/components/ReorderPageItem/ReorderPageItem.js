import React from 'react';
import PropTypes from 'prop-types';

import './ReorderPageItem.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import ActionAlert from '../ActionAlert/ActionAlert';

export class ReorderPageItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteAlert: false
    };
  }

  componentWillUnmount() {
    this.setState({ showDeleteAlert: false });
  }

  render() {
    const {
      surveyId,
      page,
      index,
      onDragStart,
      onDragOver,
      onDragEnd,
      deletePage,
      children,
      showDelete,
      showDeletePageAlert,
      deletePageAlerts,
      clearDeletePageAlert,
      deletePageErrors,
      clearDeletePageError
    } = this.props;

    return (
      <div
        className="ReorderPageItem"
        style={{ visibility: 'hidden' }}>
        <div
          data-id={page.id}
          data-index={index}
          data-type="page"
          className="ReorderPageItem_handle"
          draggable="true"
          onDragStart={e => onDragStart(e)}
          onDragOver={e => onDragOver(e)}
          onDragEnd={e => onDragEnd(e)}>
          <SVGIcon
            iconId="move-lg"
            className="ReorderPageItem_dragIcon"
          />
          <SVGIcon
            iconId="document-lg"
            className="ReorderPageItem_pageIcon"
          />
          Page {index + 1}
          <div className="ReorderPageItem_actions">
            {showDelete && (
              <button
                className="ReorderPageItem_deleteBtn"
                onClick={() => showDeletePageAlert(page.id)}>
                <SVGIcon
                  iconId="trash-lg"
                  className="ReorderPageItem_deleteIcon"
                />
              </button>
            )}
          </div>
          {deletePageAlerts[page.id] &&
            !deletePageErrors[page.id] && (
              <ActionAlert
                className="ReorderPageItem_deleteAlert"
                pointer="rightTop"
                dismissAction={() => clearDeletePageAlert(page.id)}
                confirmAction={() => deletePage(surveyId, page)}>
                <p>
                  Do you want to delete this page?<br />
                  Any questions already created and any previously
                  collected responses will also be permanently
                  deleted.
                </p>
              </ActionAlert>
            )}
          {deletePageErrors[page.id] && (
            <ActionAlert
              className="ReorderPageItem_deleteAlert"
              pointer="rightTop"
              dismissAction={() => clearDeletePageError(page.id)}
              dismissLabel="Nevermind"
              confirmAction={() => deletePage(surveyId, page, true)}
              confirmLabel="Yes, Delete Anyway">
              <p>
                This page is being referenced by page logic.<br />
                Are you really sure you want to delete it?
              </p>
            </ActionAlert>
          )}
        </div>
        <div className="ReorderPageItem_questionList">{children}</div>
      </div>
    );
  }
}

ReorderPageItem.propTypes = {
  surveyId: PropTypes.string,
  page: PropTypes.object,
  index: PropTypes.number,
  questionOrder: PropTypes.object,
  showDelete: PropTypes.bool,
  deletePage: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  showDeletePageAlert: PropTypes.func,
  deletePageAlerts: PropTypes.object,
  clearDeletePageAlert: PropTypes.func,
  deletePageErrors: PropTypes.object,
  clearDeletePageError: PropTypes.func
};

export default ReorderPageItem;
