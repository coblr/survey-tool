import React from 'react';
import PropTypes from 'prop-types';

import QuestionConfig from '../../helpers/QuestionConfig.json';
import { userHasRole } from '../../helpers/UserAccess';

import './QuestionPreview.css';

import SVGIcon from '../SVGIcon/SVGIcon';
import ActionAlert from '../ActionAlert/ActionAlert';
import SelectListPreview from '../SelectListPreview/SelectListPreview';
import DropDownList from '../DropDownList/DropDownList';
import MatrixPreview from '../MatrixPreview/MatrixPreview';
import TextRanking from '../TextRanking/TextRanking';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class QuestionPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showDeleteAlert: false
    };
  }

  onDeleteQuestion(questionId, force) {
    this.setState({ showDeleteAlert: false });
    this.props.deleteQuestion(
      this.props.survey.id,
      this.props.page.id,
      questionId,
      force
    );
  }

  findAnchors() {
    const { question } = this.props;

    const ansAnchors =
      question.answers &&
      question.answers.filter(a => a.anchored).length;
    const rowAnchors =
      question.rows && question.rows.filter(r => r.anchored).length;

    return ansAnchors || rowAnchors ? true : false;
  }

  getAnswerComponent(question) {
    let answerProps = {
      question
    };

    switch (question.type) {
      case 'SINGLE_SELECT_LIST':
        return <SelectListPreview {...answerProps} />;
      case 'MULTI_SELECT_LIST':
        return <SelectListPreview {...answerProps} />;
      case 'DROP_DOWN_LIST':
        return <DropDownList {...answerProps} />;
      case 'SINGLE_SELECT_MATRIX':
        return <MatrixPreview {...answerProps} />;
      case 'MULTI_SELECT_MATRIX':
        return <MatrixPreview {...answerProps} />;
      case 'TEXT_RANKING':
        return <TextRanking {...answerProps} />;
      case 'DESCRIPTIVE_TEXT':
        return null; // we only show the question text
      // no default
    }
  }

  render() {
    const { question, collapsedQuestions } = this.props;

    if (!question) return null;

    const answerComponent = this.getAnswerComponent(question);

    return (
      <div
        className="QuestionPreview"
        style={{ visibility: 'hidden' }}>
        {this.renderQuestionHeader(question)}
        <div className="QuestionPreview_question">
          {question.text &&
            question.text.split(/\n/).map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          {this.renderQuestionImage()}
        </div>
        {!collapsedQuestions[question.id] && (
          <div className="QuestionPreview_answers">
            {answerComponent}
          </div>
        )}
        {this.renderQuestionFooter()}
      </div>
    );
  }

  renderQuestionHeader() {
    const {
      index,
      question,
      expandQuestion,
      collapseQuestion,
      collapsedQuestions
    } = this.props;

    const isCollapsed = collapsedQuestions[question.id];

    // depending on the collapse/expand state, set the next
    // logial function operation as well as turning the arrow icon
    const toggleFn = isCollapsed ? expandQuestion : collapseQuestion;
    const arrowId = isCollapsed ? 'select-arrow-r' : 'select-arrow';

    // we're only showing chart options for list questions
    // i.e. select lists, dropdown lists, ranking, etc
    const qConfig = QuestionConfig.filter(
      qt => qt.key === question.type
    )[0];

    return (
      <div className="QuestionPreview_header">
        <div
          className="QuestionPreview_id"
          onClick={() => toggleFn(question.id)}>
          <SVGIcon
            iconId={arrowId}
            className="QuestionPreview_idIcon"
          />
          {`Q${index + 1}`}
        </div>
        <div className="QuestionPreview_type">{qConfig.title}</div>
        {this.renderQuestionActions(question)}
      </div>
    );
  }

  renderQuestionActions(question) {
    const {
      openQuestionEditor,
      survey,
      page,
      deleteQuestionErrors,
      clearDeleteQuestionError
    } = this.props;

    const hasOneQuestion = page.questions.length === 1;

    const deleteAlertClass = ['QuestionPreview_deleteAlert'];
    if (this.state.showDeleteAlert) {
      deleteAlertClass.push('QuestionPreview_deleteAlert--show');
    }

    const deleteError = deleteQuestionErrors[question.id];
    const logicAlertClass = ['QuestionPreview_logicAlert'];
    if (
      deleteError &&
      deleteError.status === 409 &&
      deleteError.code === 1
    ) {
      logicAlertClass.push('QuestionPreview_logicAlert--show');
    }

    return (
      <div className="QuestionPreview_actions">
        {userHasRole('sb_dev') && (
          <button className="QuestionPreview_actionBtn">
            <SVGIcon
              iconId="preview-lg"
              className="QuestionPreview_actionIcon"
            />
          </button>
        )}
        <FeatureToggle feature="SURVEY_MGMT_ENABLED">
          {!survey.locked && (
            <button
              className="QuestionPreview_actionBtn"
              onClick={() => openQuestionEditor(question.id)}>
              <SVGIcon
                iconId="editpencil-l-lg"
                className="QuestionPreview_actionIcon"
              />
            </button>
          )}
        </FeatureToggle>
        <FeatureToggle feature="SURVEY_MGMT_ENABLED">
          {!survey.locked &&
            !hasOneQuestion && (
              <button
                className="QuestionPreview_actionBtn"
                onClick={() =>
                  this.setState({ showDeleteAlert: true })}>
                <SVGIcon
                  iconId="trash-lg"
                  className="QuestionPreview_actionIcon"
                />
              </button>
            )}
          <ActionAlert
            pointer="rightMiddle"
            className={deleteAlertClass.join(' ')}
            dismissAction={() =>
              this.setState({ showDeleteAlert: false })}
            confirmAction={() => this.onDeleteQuestion(question.id)}>
            <p>
              Are you sure you want to delete this question?<br />
              All previously collected responses (for this question
              only) will also be permanently deleted.
            </p>
          </ActionAlert>
          <ActionAlert
            pointer="rightMiddle"
            className={logicAlertClass.join(' ')}
            dismissAction={() =>
              clearDeleteQuestionError(question.id)}
            dismissLabel="Nevermind"
            confirmAction={() =>
              this.onDeleteQuestion(question.id, true)}
            confirmLabel="Yes, Delete Anyway">
            <p>
              This question is being referenced by page logic.<br />
              Are you absolutely sure you want to delete it?
            </p>
          </ActionAlert>
        </FeatureToggle>
      </div>
    );
  }

  renderQuestionImage() {
    const { question: { placedImage }, media } = this.props;

    if (!placedImage) return null;
    if (!placedImage.image) return null;
    if (!media[placedImage.image.id]) return null;

    const image = media[placedImage.image.id];
    const size = placedImage.size;

    return <img src={image.urls[size]} alt="Your Question" />;
  }

  renderQuestionFooter() {
    const { question, openQuestionOptionModal, survey } = this.props;
    const hasAnchors = this.findAnchors();

    return (
      <div className="QuestionPreview_footer">
        <div className="QuestionPreview_optionStatuses">
          {question.mandatory && (
            <div
              className="QuestionPreview_optionStatus"
              onClick={() => openQuestionOptionModal(question)}>
              <SVGIcon
                iconId="check-lg"
                className="QuestionPreview_optionIcon"
              />
              Mandatory
            </div>
          )}
          {question.hidden && (
            <div
              className="QuestionPreview_optionStatus"
              onClick={() => openQuestionOptionModal(question)}>
              <SVGIcon
                iconId="check-lg"
                className="QuestionPreview_optionIcon"
              />
              Hidden
            </div>
          )}
          {question.randomizeAnswers && (
            <div
              className="QuestionPreview_optionStatus"
              onClick={() => openQuestionOptionModal(question)}>
              <SVGIcon
                iconId="check-lg"
                className="QuestionPreview_optionIcon"
              />
              Randomize
              {hasAnchors && <span> w/ Anchor</span>}
            </div>
          )}
        </div>
        <FeatureToggle feature="SURVEY_MGMT_ENABLED">
          <div className="QuestionPreview_optionActions">
            {!survey.locked && (
              <button
                className="QuestionPreview_optionsBtn"
                onClick={() => openQuestionOptionModal(question)}>
                <SVGIcon
                  iconId="options"
                  className="QuestionPreview_optionIcon"
                />
                Options
              </button>
            )}
          </div>
        </FeatureToggle>
      </div>
    );
  }
}

QuestionPreview.propTypes = {
  index: PropTypes.number,
  survey: PropTypes.object,
  page: PropTypes.object,
  question: PropTypes.object,
  openQuestionEditor: PropTypes.func,
  deleteQuestion: PropTypes.func,
  openQuestionOptionModal: PropTypes.func,
  expandQuestion: PropTypes.func,
  collapseQuestion: PropTypes.func,
  collapsedQuestions: PropTypes.object,
  deleteQuestionErrors: PropTypes.object,
  clearDeleteQuestionError: PropTypes.func,
  media: PropTypes.object
};

export default QuestionPreview;
