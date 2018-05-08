import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { isTempQuestion } from '../../helpers/TempQuestions';

import './PageLogic.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import EllipsedText from '../EllipsedText/EllipsedText';

export class PageLogic extends React.PureComponent {
  render() {
    let {
      index,
      page,
      survey,
      isEditing,
      openEditor,
      deletePageLogic
    } = this.props;

    isEditing = isEditing[page.id];

    const mainClass = ['PageLogic'];
    if (isEditing) {
      mainClass.push('PageLogic--edit');
    }

    return (
      <div className={mainClass.join(' ')}>
        <div className="PageLogic_header">
          <h4 className="PageLogic_title">
            <SVGIcon
              iconId="page-logic"
              className="PageLogic_titleIcon"
            />
            Page {index + 1} Logic
          </h4>
          <div className="PageLogic_actions">
            {!survey.locked &&
              !isEditing && (
                <button
                  className="PageLogic_editBtn"
                  onClick={() => openEditor(page.id)}>
                  <SVGIcon
                    iconId="editpencil-l-lg"
                    className="PageLogic_editIcon"
                  />
                </button>
              )}
            {!survey.locked &&
              !isEditing && (
                <button
                  className="PageLogic_deleteBtn"
                  onClick={() => deletePageLogic(page.id)}>
                  <SVGIcon
                    iconId="trash-lg"
                    className="PageLogic_deleteIcon"
                  />
                </button>
              )}
          </div>
        </div>
        {isEditing ? this.renderEditor() : this.renderBranches()}
      </div>
    );
  }

  renderBranches() {
    const { page, survey, surveyQuestionMap } = this.props;
    let { pageLogic } = this.props;

    pageLogic = page.branchLogic || pageLogic[page.id];

    // +1 to offset zero start, +1 to move to next page (i.e. +2)
    let defaultPage = `Page ${survey.pages.indexOf(page.id) + 2}`;
    if (pageLogic.defaultPage) {
      if (!pageLogic.defaultPage.match(/^(THANK|TERMINATE)/)) {
        defaultPage = `Page ${survey.pages.indexOf(
          pageLogic.defaultPage
        ) + 1}`;
      } else {
        defaultPage = pageLogic.defaultPage
          .replace('_', ' ')
          .toLowerCase();
      }
    } else {
      const { nextPages } = this._getNextPrevPages();
      const nextPage = nextPages[0];

      if (!nextPage.id.match(/^(THANK|TERMINATE)/)) {
        defaultPage = `Page ${survey.pages.indexOf(nextPage.id) + 1}`;
      } else {
        defaultPage = nextPage.label;
      }
    }

    let branchStatements;
    if (pageLogic && pageLogic.branchStatements) {
      branchStatements = pageLogic.branchStatements;
    }

    return (
      <div className="PageLogic_viewer">
        <div className="PageLogic_viewBranch">
          <SVGIcon
            iconId="arrow-r-lg"
            className="PageLogic_branchIcon"
          />
          By default, go to {defaultPage}
        </div>

        {branchStatements &&
          branchStatements.map((branch, i) => {
            let destPage;
            const destPageIndex = survey.pages.indexOf(
              branch.destinationPageId
            );
            if (branch.destinationPageId.match(/\d/)) {
              destPage = `Page ${destPageIndex + 1}`;
            }
            if (
              branch.destinationPageId.match(/^(THANK|TERMINATE)/)
            ) {
              destPage = branch.destinationPageId
                .toLowerCase()
                .replace(/_/gi, ' ');
            }

            return (
              <div key={i} className="PageLogic_viewBranch">
                <SVGIcon
                  iconId="arrow-r-lg"
                  className="PageLogic_branchIcon"
                />
                <span className="PageLogic_branchTitle">
                  Branching {i + 1}
                </span>

                {branch.destinationPageId && (
                  <p className="PageLogic_branchCondition">
                    <span className="PageLogic_branchInstruction">
                      Go To
                    </span>
                    <span className="PageLogic_branchDestination">
                      {destPage}
                    </span>
                  </p>
                )}

                {branch.conditions &&
                  branch.conditions.map((condition, j) => {
                    const conditionQ =
                      surveyQuestionMap[condition.questionId];
                    if (!conditionQ) return null;

                    let conditionA;
                    if (conditionQ.answers) {
                      conditionA = conditionQ.answers.find(
                        ans => ans.id === condition.answerId
                      );
                    }

                    // safe assumption: if we have rows, we WILL have columns
                    if (conditionQ.rows && conditionQ.rows.length) {
                      const rowCol = condition.answerId.split('.');
                      const conditionARow = conditionQ.rows.find(
                        row => row.id === rowCol[0]
                      );
                      const conditionACol = conditionQ.columns.find(
                        col => col.id === rowCol[1]
                      );
                      // combine the two to get the right answer, put into
                      // an object so we can use the same code as answers.text
                      conditionA = {
                        text: `${conditionARow.text}/${conditionACol.text}`
                      };
                    }

                    return (
                      <p
                        key={j}
                        className="PageLogic_branchCondition">
                        <span className="PageLogic_branchInstruction">
                          {!condition.operator
                            ? 'If'
                            : condition.operator}
                        </span>
                        <span className="PageLogic_branchSubject">
                          <EllipsedText length="30">
                            {conditionQ.text}
                          </EllipsedText>
                          <span className="PageLogic_QADivider">
                            :
                          </span>
                          <EllipsedText length="30">
                            {conditionA
                              ? conditionA.text
                              : '<broken reference>'}
                          </EllipsedText>
                        </span>
                        <span className="PageLogic_branchPredicate">
                          {condition.selected ||
                          condition.selected === 'true'
                            ? 'is selected'
                            : 'is not selected'}
                        </span>
                      </p>
                    );
                  })}
              </div>
            );
          })}
      </div>
    );
  }

  renderEditor() {
    const {
      index,
      page,
      closeEditor,
      surveyQuestionMap,
      createBranch,
      updateBranch,
      deleteBranch,
      createCondition,
      updateCondition,
      deleteCondition,
      setDefaultPage,
      onSubmit
    } = this.props;
    let { pageLogic, pageLogicErrors } = this.props;

    pageLogic = pageLogic[page.id];
    const errors = pageLogicErrors[page.id];

    if (!pageLogic) return null;

    // we can only branch to pages AFTER this page
    const { nextPages, prevPages } = this._getNextPrevPages();

    // we can only compare to questions BEFORE this page ends.
    let qIndex = 0;
    const qIndexMap = {};
    const prevQuestions = [];

    for (let a = 0; a < prevPages.length; a++) {
      const page = prevPages[a];
      for (let b = 0; b < page.questions.length; b++) {
        qIndex++;

        const qId = page.questions[b];
        const question = surveyQuestionMap[qId];
        const nonSelectables = [
          'DESCRIPTIVE_TEXT',
          'COMMENT_BOX',
          'SINGLE_LINE_TEXT'
        ];

        if (
          nonSelectables.indexOf(question.type) !== -1 ||
          isTempQuestion(qId)
        ) {
          continue;
        }

        prevQuestions.push(surveyQuestionMap[qId]);
        qIndexMap[qId] = qIndex;
      }
    }

    let branchStatements;
    if (pageLogic && pageLogic.branchStatements) {
      branchStatements = pageLogic.branchStatements;
    }

    let defaultPage = nextPages[0].id;
    if (pageLogic && pageLogic.defaultPage) {
      defaultPage = pageLogic.defaultPage;
    }

    // user can't save until they've changed something.
    // by default, we go to the next page anyway.
    const hasErrors = !!pageLogicErrors[page.id];
    // const defaultIsNext = defaultPage === nextPages[0].id;
    // const hasBranches = branchStatements && branchStatements.length;
    // const saveDisabled = hasErrors || (defaultIsNext && !hasBranches);
    const saveDisabled = hasErrors;

    return (
      <div className="PageLogic_editor">
        <div className="PageLogic_defaultPage">
          <p className="PageLogic_branchCondition">
            <SVGIcon
              iconId="arrow-r-lg"
              className="PageLogic_branchIcon"
            />
            By default, go to
            <select
              className="PageLogic_select form-control"
              value={defaultPage}
              onChange={e => setDefaultPage(page.id, e.target.value)}>
              {nextPages.map((page, nPageIndex) => (
                <option key={nPageIndex} value={page.id}>
                  {page.label
                    ? page.label
                    : `Page ${index + 1 + (nPageIndex + 1)}`}
                </option>
              ))}
            </select>
            unless branching logic is defined.
          </p>
        </div>
        {branchStatements &&
          branchStatements.map((branch, branchIndex) => {
            let branchErrors;
            if (errors && errors.branchStatements[branchIndex]) {
              branchErrors = errors.branchStatements[branchIndex];
            }

            return (
              <div key={branchIndex} className="PageLogic_editBranch">
                <div className="PageLogic_editBranchHeader">
                  <div className="PageLogic_branchTitle">
                    <SVGIcon
                      iconId="arrow-r-lg"
                      className="PageLogic_branchIcon"
                    />
                    Branching {branchIndex + 1}
                  </div>
                  <div className="PageLogic_branchActions">
                    <button
                      className="PageLogic_deleteBranchBtn"
                      onClick={() =>
                        deleteBranch(page.id, branchIndex)}>
                      <SVGIcon
                        iconId="trash-lg"
                        className="PageLogic_deleteIcon"
                      />
                    </button>
                  </div>
                </div>
                <div className="PageLogic_editCondition">
                  {branchErrors &&
                    branchErrors.destinationPageId === 'required' && (
                      <p className="PageLogic_error">
                        Please select a destination page.
                      </p>
                    )}
                  <span className="PageLogic_branchInstruction">
                    Go To
                  </span>
                  <span className="PageLogic_branchDestination">
                    <select
                      className="PageLogic_select form-control"
                      value={branch.destinationPageId}
                      onChange={e =>
                        updateBranch(
                          page.id,
                          branchIndex,
                          'destinationPageId',
                          e.target.value
                        )}>
                      <option value="">Select Page</option>
                      {nextPages.map((page, nPageIndex) => (
                        <option key={nPageIndex} value={page.id}>
                          {page.label
                            ? page.label
                            : `Page ${index + 1 + (nPageIndex + 1)}`}
                        </option>
                      ))}
                    </select>
                  </span>
                </div>
                {branchErrors &&
                  branchErrors.conditions === 'required' && (
                    <div className="PageLogic_branchConditions">
                      <div className="PageLogic_editCondition">
                        <p className="PageLogic_error">
                          Please create some conditions.
                        </p>
                      </div>
                    </div>
                  )}
                <div className="PageLogic_branchConditions">
                  {branch.conditions.map(
                    (condition, conditionIndex) => {
                      let selectedQuestion;
                      if (condition.questionId) {
                        selectedQuestion =
                          surveyQuestionMap[condition.questionId];
                      }

                      let conditionErrors;
                      if (
                        branchErrors &&
                        branchErrors.conditions[conditionIndex]
                      ) {
                        conditionErrors =
                          branchErrors.conditions[conditionIndex];
                      }

                      let errorMessage;
                      if (!_.isEmpty(conditionErrors)) {
                        errorMessage = 'Please select';
                        if (
                          conditionErrors.questionId === 'required' &&
                          !conditionErrors.answerId
                        ) {
                          errorMessage += ' a question';
                        }
                        if (
                          !conditionErrors.questionId &&
                          conditionErrors.answerId === 'required'
                        ) {
                          errorMessage += ' an answer';
                        }
                        if (
                          conditionErrors.questionId === 'required' &&
                          conditionErrors.answerId === 'required'
                        ) {
                          errorMessage +=
                            ' both a question and answer';
                        }
                        errorMessage += ' for this condition';
                      }

                      let selectableAnswers;
                      if (selectedQuestion) {
                        if (
                          selectedQuestion.type.indexOf('MATRIX') ===
                          -1
                        ) {
                          selectableAnswers =
                            selectedQuestion.answers;
                        } else {
                          selectableAnswers = [];
                          for (
                            let a = 0;
                            a < selectedQuestion.rows.length;
                            a++
                          ) {
                            const row = selectedQuestion.rows[a];
                            for (
                              let b = 0;
                              b < selectedQuestion.columns.length;
                              b++
                            ) {
                              const col = selectedQuestion.columns[b];
                              selectableAnswers.push({
                                id: `${row.id}.${col.id}`,
                                text: `${row.text}/${col.text}`
                              });
                            }
                          }
                        }
                      }

                      return (
                        <div
                          key={conditionIndex}
                          className="PageLogic_editCondition">
                          {conditionErrors &&
                            errorMessage && (
                              <p className="PageLogic_error">
                                {errorMessage}
                              </p>
                            )}
                          <span className="PageLogic_branchInstruction">
                            {!conditionIndex ? (
                              'If'
                            ) : (
                              <select
                                className="PageLogic_select form-control"
                                value={condition.operator}
                                onChange={e =>
                                  updateCondition(
                                    page.id,
                                    branchIndex,
                                    conditionIndex,
                                    'operator',
                                    e.target.value
                                  )}>
                                <option value="AND">AND</option>
                                <option value="OR">OR</option>
                              </select>
                            )}
                          </span>
                          <span className="PageLogic_branchSubject">
                            <select
                              className="PageLogic_select form-control"
                              value={condition.questionId}
                              onChange={e =>
                                updateCondition(
                                  page.id,
                                  branchIndex,
                                  conditionIndex,
                                  'questionId',
                                  e.target.value
                                )}>
                              <option value="">
                                Select Question
                              </option>
                              {prevQuestions.map(
                                (question, questionIndex) => (
                                  <option
                                    key={questionIndex}
                                    value={question.id}>
                                    Q{qIndexMap[question.id]}:{' '}
                                    {question.text}
                                  </option>
                                )
                              )}
                            </select>
                            &nbsp;:&nbsp;
                            <select
                              className="PageLogic_select form-control"
                              value={condition.answerId}
                              onChange={e =>
                                updateCondition(
                                  page.id,
                                  branchIndex,
                                  conditionIndex,
                                  'answerId',
                                  e.target.value
                                )}>
                              <option>Select Answer</option>
                              {selectedQuestion &&
                                selectableAnswers.map(
                                  (answer, answerIndex) => (
                                    <option
                                      key={answerIndex}
                                      value={answer.id}>
                                      {answer.text}
                                    </option>
                                  )
                                )}
                            </select>
                          </span>
                          <span className="PageLogic_editPredicate">
                            <select
                              className="PageLogic_select form-control"
                              value={condition.selected}
                              onChange={e =>
                                updateCondition(
                                  page.id,
                                  branchIndex,
                                  conditionIndex,
                                  'selected',
                                  e.target.value
                                )}>
                              <option value="true">
                                is selected
                              </option>
                              <option value="false">
                                is not selected
                              </option>
                            </select>
                          </span>
                          <div className="PageLogic_conditionActions">
                            <button
                              className="PageLogic_deleteConditionBtn"
                              onClick={() =>
                                deleteCondition(
                                  page.id,
                                  branchIndex,
                                  conditionIndex
                                )}>
                              <SVGIcon
                                iconId="trash-lg"
                                className="PageLogic_deleteIcon"
                              />
                            </button>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="PageLogic_conditionFooter">
                  <button
                    className="PageLogic_addBranchBtn"
                    onClick={() =>
                      createCondition(page.id, branchIndex)}>
                    <SVGIcon
                      iconId="add-plus-lg"
                      className="PageLogic_addBranchIcon"
                    />
                    Add condition
                  </button>
                </div>
              </div>
            );
          })}
        <div className="PageLogic_branchFooter">
          <button
            className="PageLogic_addBranchBtn"
            onClick={() => createBranch(page.id)}>
            <SVGIcon
              iconId="add-plus-lg"
              className="PageLogic_addBranchIcon"
            />
            Add branching logic
          </button>
        </div>
        <div className="PageLogic_footer">
          <div className="PageLogic_footerLeft">
            <button
              className="PageLogic_cancelBtn"
              onClick={() => closeEditor(page.id)}>
              Cancel
            </button>
          </div>
          <div className="PageLogic_footerRight">
            <button
              className="PageLogic_submitBtn"
              onClick={() => onSubmit()}
              disabled={saveDisabled}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  _getNextPrevPages() {
    const { survey, page, surveyPageMap } = this.props;

    const nextPages = [];
    const prevPages = [];
    let pageFound = false;
    survey.pages.forEach(p => {
      // avoid any temp pages
      if (p === 'temp') return;

      // add legit pages to our list
      if (pageFound) {
        nextPages.push(surveyPageMap[p]);
      }

      // we'll use previous pages to get previous questions
      if (!pageFound) {
        prevPages.push(surveyPageMap[p]);
      }

      // must come at the end or else current page gets
      // included in the next pages list.
      if (p === page.id) {
        pageFound = true;
      }
    });

    // add THANK_YOU and TERMINATE pages to nextPages
    // so checking things is easier.
    nextPages.push({ id: 'THANK_YOU', label: 'Thank You Page' });
    nextPages.push({ id: 'TERMINATE', label: 'Terminate Page' });

    return { nextPages, prevPages };
  }
}

PageLogic.propTypes = {
  index: PropTypes.number,
  survey: PropTypes.object,
  page: PropTypes.object,
  pageLogic: PropTypes.object,
  isEditing: PropTypes.object,
  openEditor: PropTypes.func,
  closeEditor: PropTypes.func,
  surveyPageMap: PropTypes.object,
  surveyQuestionMap: PropTypes.object,
  createBranch: PropTypes.func,
  updateBranch: PropTypes.func,
  deleteBranch: PropTypes.func,
  createCondition: PropTypes.func,
  updateCondition: PropTypes.func,
  deleteCondition: PropTypes.func,
  setDefaultPage: PropTypes.func,
  onSubmit: PropTypes.func,
  validateLogic: PropTypes.func,
  pageLogicErrors: PropTypes.object,
  deletePageLogic: PropTypes.func,
  createPageLogic: PropTypes.func
};

export default PageLogic;
