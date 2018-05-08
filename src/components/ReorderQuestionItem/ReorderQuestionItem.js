import React from 'react';
import PropTypes from 'prop-types';

import './ReorderQuestionItem.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import ActionAlert from '../ActionAlert/ActionAlert';

export class ReorderQuestionItem extends React.PureComponent {
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
      pageId,
      questionId,
      index,
      question,
      deleteQuestion,
      onDragStart,
      onDragOver,
      onDragEnd,
      showDeleteQuestionAlert,
      deleteQuestionAlerts,
      clearDeleteQuestionAlert,
      deleteQuestionErrors,
      clearDeleteQuestionError
    } = this.props;

    return (
      <div
        className="ReorderQuestionItem"
        style={{ visibility: 'hidden' }}>
        <div
          data-id={`${pageId}_${questionId}`}
          data-index={index}
          data-type="question"
          className="ReorderQuestionItem_handle"
          draggable="true"
          onDragStart={e => onDragStart(e)}
          onDragOver={e => onDragOver(e)}
          onDragEnd={e => onDragEnd(e)}>
          <SVGIcon
            iconId="move-lg"
            className="ReorderQuestionItem_dragIcon"
          />
          Q{index + 1}: {question.text}
          <div className="ReorderQuestionItem_actions">
            <button
              className="ReorderQuestionItem_deleteBtn"
              onClick={() => showDeleteQuestionAlert(questionId)}>
              <SVGIcon
                iconId="trash-lg"
                className="ReorderQuestionItem_deleteIcon"
              />
            </button>
          </div>
          {deleteQuestionAlerts[questionId] &&
            !deleteQuestionErrors[questionId] && (
              <ActionAlert
                className="ReorderQuestionItem_deleteAlert"
                pointer="rightTop"
                dismissAction={() =>
                  clearDeleteQuestionAlert(questionId)}
                confirmAction={() =>
                  deleteQuestion(pageId, questionId)}>
                <p>
                  Are you sure you want to delete this question?<br />
                  All previously collected responses (for this
                  question only) will also be permanently deleted.
                </p>
              </ActionAlert>
            )}
          {deleteQuestionErrors[questionId] && (
            <ActionAlert
              className="ReorderQuestionItem_deleteAlert"
              pointer="rightTop"
              dismissAction={() =>
                clearDeleteQuestionError(questionId)}
              dismissLabel="Nevermind"
              confirmAction={() =>
                deleteQuestion(pageId, questionId, true)}
              confirmLabel="Yes, Delete Anyway">
              <p>
                This question is being referenced by page logic.<br />
                Are you really sure you want to delete it?
              </p>
            </ActionAlert>
          )}
        </div>
      </div>
    );
  }
}

ReorderQuestionItem.propTypes = {
  pageId: PropTypes.string,
  questionId: PropTypes.string,
  index: PropTypes.number,
  question: PropTypes.object,
  deleteQuestion: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  showDeleteQuestionAlert: PropTypes.func,
  deleteQuestionAlerts: PropTypes.object,
  clearDeleteQuestionAlert: PropTypes.func,
  deleteQuestionErrors: PropTypes.object,
  clearDeleteQuestionError: PropTypes.func
};

export default ReorderQuestionItem;
