import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getRealQuestions } from '../../helpers/TempQuestions';
import FeatureToggles from '../../helpers/FeatureToggles';

import './ReorderForm.css';
import ReorderPageItem from '../ReorderPageItem/ReorderPageItem';
import ReorderQuestionItem from '../ReorderQuestionItem/ReorderQuestionItem';
import ActionAlert from '../ActionAlert/ActionAlert';

const placeholder = document.createElement('div');
placeholder.className = 'ReorderForm_placeholder';
placeholder.innerText = 'MOVE HERE';

export class ReorderForm extends React.PureComponent {
  onDragStart(e) {
    this.draggable = e.currentTarget;
    const dragParent = this.draggable.parentNode;

    // the drag handle is a child of what we want to use as the 'ghost'.
    // The ghost should be the full page or question item.
    const ghost = dragParent;
    const mouseX = e.pageX - e.target.offsetLeft;
    const mouseY = e.pageY - e.target.offsetTop;
    e.dataTransfer.setDragImage(ghost, mouseX, mouseY);

    // FF needs this for the drag to work.
    e.dataTransfer.setData('text/html', e.currentTarget);
    e.dataTransfer.allowActions = 'move';
  }

  onDragOver(e) {
    e.preventDefault();
    // DO NOT set this.droppable too early. We only want to
    // setup a droppable if it meets the right criteria. If
    // you set this.droppable up here, then if you drag a
    // page to the bottom of all pages and questions, the last
    // droppable will be the bottom question. This means when
    // you drop the page, it will try to be placed as the last
    // child of the last questionList element instead of as
    // the last child of pageList.
    const droppable = e.currentTarget;
    const dropId = droppable.dataset.id;
    const dropType = droppable.dataset.type;
    const dragId = this.draggable.dataset.id;
    const dragType = this.draggable.dataset.type;
    const dragIndex = +this.draggable.dataset.index;

    // not all items being dragged over can be THE droppable.
    // The placeholder is not a droppable area.
    // Pages cannot be dropped between questions.
    // this.draggable cannot be a droppable.
    if (droppable.className === 'ReorderForm_placeholder') return;
    if (dropType !== dragType) return;
    if (dropId === dragId) return;

    this.droppable = droppable;
    const dropParent = this.droppable.parentNode;
    let parentEl = dropParent.parentNode;
    let beforeEl = dropParent;

    // if we are over the top half of the droppable,
    // we want to insert our placeholder BEFORE.
    // if we are over the bottom half of the droppable,
    // we want to insert our placeholder AFTER ("before next element").
    // However, if we're trying to drop into an empty page then
    // we want to show the placeholder ABOVE the empty page alert.
    // If we drop the question after the empty page alert, then the
    // position in the array will be 1, not 0 and the API will complain
    // that we are creating an array with an empty index.
    const relY = e.clientY - this.droppable.offsetTop;
    const droppableHeight = this.droppable.offsetHeight / 2;
    if (relY < droppableHeight || dropId.split('_')[1] === '00000') {
      parentEl.insertBefore(placeholder, beforeEl);
    } else {
      parentEl.insertBefore(placeholder, beforeEl.nextElementSibling);
    }

    // we need to watch for when questions are moving from page to page.
    // When questions move in the same page we'll be offsetting their
    // drop position. If they move to a different page, we don't need
    // to do any offsetting. See below.
    let qTransplant = false;
    if (dropType === 'question') {
      if (dropId.split('_')[0] !== dragId.split('_')[0]) {
        qTransplant = true;
      }
    }

    // the easiest way to get the right drop location/index is
    // to just look where we put the placeholder.
    _.forEach(parentEl.children, (child, i) => {
      if (child === placeholder) {
        this.dropIndex = i;

        // but... we need to rethink where we want to drop our item.
        // Since the original item is still in the list, any
        // drop position AFTER where it was should be -1.
        // This prevents the case where placing the draggable
        // after its current position, but before its next sibling
        // results in it being placed after the next sibling.
        // ...It's complicated. Comment out and test if curious.
        if (i >= dragIndex + 1 && !qTransplant) {
          this.dropIndex = i - 1;
        }
      }
    });
  }

  onDragEnd(e) {
    const target = e.currentTarget;
    const type = target.dataset.type;
    const dropParent = this.droppable.parentNode;
    let dragId = this.draggable.dataset.id;
    let dropId = this.droppable.dataset.id;
    const dragIndex = +this.draggable.dataset.index;
    const pageOrder = [].concat(this.props.pageOrder);
    const questionOrder = Object.assign({}, this.props.questionOrder);
    let dragPageId;
    let dropPageId;
    let qDragId;
    const {
      match: { params: { surveyId } },
      updatePageOrder,
      updateQuestionOrder,
      moveQuestionToPage
    } = this.props;

    // remove the placeholder since we don't need it anymore
    dropParent.parentNode.removeChild(placeholder);

    // if we're moving a page, we need to update our
    // page order model by removing the old location and
    // splicing the pageID into the new location.
    if (type === 'page') {
      pageOrder.splice(dragIndex, 1);
      pageOrder.splice(this.dropIndex, 0, dragId);
    } else {
      // if we're moving a question, we need to update
      // our questionOrder model by removing the question
      // from its original page array, and splicing it
      // into the new page's question array. Sometimes
      // the original page and new page are the same.
      dropPageId = dropId.split('_')[0];
      dragPageId = dragId.split('_')[0];
      qDragId = dragId.split('_')[1];
      questionOrder[dragPageId].splice(dragIndex, 1);
      questionOrder[dropPageId].splice(this.dropIndex, 0, qDragId);
    }

    if (type === 'page') {
      // updatePageOrder(surveyId, pageOrder);
      this.tryReorder(updatePageOrder, [surveyId, pageOrder]);
    } else {
      // it's a different thing when moving questions from page to page.
      if (dropPageId === dragPageId) {
        this.tryReorder(updateQuestionOrder, [
          dropPageId,
          questionOrder[dropPageId]
        ]);
      } else {
        this.tryReorder(moveQuestionToPage, [
          dragPageId,
          dropPageId,
          this.dropIndex,
          [qDragId]
        ]);
      }
    }

    delete this.draggable;
    delete this.droppable;
    delete this.dropIndex;
  }

  tryReorder(fn, args) {
    this.reorderFn = fn;
    this.reorderArgs = args;
    fn(...args);
  }

  doReorder() {
    this.reorderFn(...this.reorderArgs, true);
  }

  render() {
    if (!FeatureToggles.SURVEY_MGMT_ENABLED) return null;

    let {
      match: { params: { surveyId } },
      pageOrder,
      reorderQuestionErrors,
      moveQuestionErrors,
      clearMoveReorderErrors,
      reorderPageErrors
    } = this.props;

    reorderQuestionErrors = pageOrder.find(
      pId => reorderQuestionErrors[pId]
    );
    moveQuestionErrors = pageOrder.find(
      pId => moveQuestionErrors[pId]
    );
    reorderPageErrors = reorderPageErrors[surveyId];

    const anyErrors =
      reorderQuestionErrors ||
      moveQuestionErrors ||
      reorderPageErrors;

    const logicAlertClass = ['ReorderForm_logicAlert'];
    if (anyErrors) {
      logicAlertClass.push('ReorderForm_logicAlert--show');
    }

    return (
      <div className="ReorderForm" style={{ visibility: 'hidden' }}>
        <p className="ReorderForm_instructions">
          Drag and drop questions and pages to change the order of
          your survey.
        </p>
        <p className="ReorderForm_tip">
          TIP: Changing the order of pages or questions may invalidate
          page logic.
        </p>
        <div className="ReorderForm_pageList">
          {!_.isEmpty(pageOrder) && this.renderPageList()}

          {anyErrors && <div className="ReorderForm_logicAlertBg" />}
          <ActionAlert
            className={logicAlertClass.join(' ')}
            dismissAction={() => clearMoveReorderErrors()}
            dismissLabel="Nevermind"
            confirmAction={() => this.doReorder()}
            confirmLabel="Yes, Move Anyway">
            <p>
              This change will break page logic.<br />
              Are you sure you want to make this move?
            </p>
          </ActionAlert>
        </div>
      </div>
    );
  }

  renderPageList() {
    const {
      match: { params: { surveyId } },
      questionOrder,
      pageOrder,
      deletePage,
      surveyPageMap,
      showDeletePageAlert,
      deletePageAlerts,
      clearDeletePageAlert,
      deletePageErrors,
      clearDeletePageError
    } = this.props;

    let qStartIndex = 0;
    const questionCounts = pageOrder.map(
      pId =>
        questionOrder[pId]
          ? getRealQuestions(questionOrder[pId]).length
          : 0
    );

    return pageOrder.map((pageId, i) => {
      const page = surveyPageMap[pageId];

      // we might have a page that has a temporary question
      // but we don't want to count that question until it
      // gets created. The real question order has no temp questions.
      let realQuestionOrder = questionOrder[pageId];
      if (questionOrder[pageId].length) {
        realQuestionOrder = getRealQuestions(questionOrder[pageId]);
      }
      qStartIndex += questionCounts[i - 1] || 0;

      return (
        <ReorderPageItem
          key={i}
          surveyId={surveyId}
          page={page}
          index={i}
          questionOrder={questionOrder}
          showDelete={pageOrder.length > 1}
          deletePage={deletePage}
          onDragStart={e => this.onDragStart(e)}
          onDragOver={e => this.onDragOver(e)}
          onDragEnd={e => this.onDragEnd(e)}
          showDeletePageAlert={showDeletePageAlert}
          deletePageAlerts={deletePageAlerts}
          clearDeletePageAlert={clearDeletePageAlert}
          deletePageErrors={deletePageErrors}
          clearDeletePageError={clearDeletePageError}>
          {realQuestionOrder.length ? (
            this.renderQuestionList(pageId, qStartIndex)
          ) : (
            <div className="ReorderForm_question">
              <div
                data-id={`${pageId}_00000`}
                data-index={0}
                data-type="question"
                className="ReorderForm_questionEmpty"
                onDragOver={e => this.onDragOver(e)}>
                This page is blank. Please delete it or move some
                questions here.
              </div>
            </div>
          )}
        </ReorderPageItem>
      );
    });
  }

  renderQuestionList(pageId, qStartIndex) {
    const {
      questionOrder,
      surveyQuestionMap,
      deleteQuestion,
      showDeleteQuestionAlert,
      deleteQuestionAlerts,
      clearDeleteQuestionAlert,
      deleteQuestionErrors,
      clearDeleteQuestionError
    } = this.props;

    return getRealQuestions(questionOrder[pageId]).map((qId, i) => {
      const question = surveyQuestionMap[qId];
      if (question.id.indexOf(':') > 0) return null;

      return (
        <ReorderQuestionItem
          key={i}
          pageId={pageId}
          questionId={qId}
          index={qStartIndex + i}
          question={question}
          deleteQuestion={deleteQuestion}
          onDragStart={e => this.onDragStart(e)}
          onDragOver={e => this.onDragOver(e)}
          onDragEnd={e => this.onDragEnd(e)}
          showDeleteQuestionAlert={showDeleteQuestionAlert}
          deleteQuestionAlerts={deleteQuestionAlerts}
          clearDeleteQuestionAlert={clearDeleteQuestionAlert}
          deleteQuestionErrors={deleteQuestionErrors}
          clearDeleteQuestionError={clearDeleteQuestionError}
        />
      );
    });
  }
}

ReorderForm.propTypes = {
  match: PropTypes.object,
  pageOrder: PropTypes.array,
  questionOrder: PropTypes.object,
  surveyQuestionMap: PropTypes.object,
  surveyPageMap: PropTypes.object,
  deletePage: PropTypes.func,
  deleteQuestion: PropTypes.func,
  updatePageOrder: PropTypes.func,
  updateQuestionOrder: PropTypes.func,
  moveQuestionToPage: PropTypes.func,
  reorderQuestionErrors: PropTypes.object,
  moveQuestionErrors: PropTypes.object,
  clearMoveReorderErrors: PropTypes.func,
  reorderPageErrors: PropTypes.object,
  clearReorderPageErrors: PropTypes.func,
  showDeletePageAlert: PropTypes.func,
  deletePageAlerts: PropTypes.object,
  clearDeletePageAlert: PropTypes.func,
  deletePageErrors: PropTypes.object,
  clearDeletePageError: PropTypes.func,
  showDeleteQuestionAlert: PropTypes.func,
  deleteQuestionAlerts: PropTypes.object,
  clearDeleteQuestionAlert: PropTypes.func,
  deleteQuestionErrors: PropTypes.object,
  clearDeleteQuestionError: PropTypes.func
};

export default ReorderForm;
