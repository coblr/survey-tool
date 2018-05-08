import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import QuestionConfig from '../../helpers/QuestionConfig.json';
import * as validations from '../../helpers/FieldValidations';
import { scrollTo } from '../../helpers/Animations';
import { isTempQuestion } from '../../helpers/TempQuestions';

import './QuestionEditor.css';
import QuestionSelector from '../QuestionSelector/QuestionSelector';
import ActionAlert from '../ActionAlert/ActionAlert';
import SVGIcon from '../SVGIcon/SVGIcon';
import QuestionMediaCtnr from '../../containers/QuestionMediaCtnr/QuestionMediaCtnr';

export class QuestionEditor extends React.PureComponent {
  render() {
    const {
      question,
      handleSubmit,
      type,
      setQuestionType
    } = this.props;

    const qConfig = QuestionConfig.find(
      t => t.key === (type || question.type)
    );
    const editors = qConfig && qConfig.editors;

    let editorTitle = 'Edit Question';
    if (isTempQuestion(question.id)) {
      editorTitle = 'New Question';
    }

    return (
      <div
        className="QuestionEditor"
        style={{ visibility: 'hidden' }}>
        <div className="QuestionEditor_header">
          <div className="QuestionEditor_title">{editorTitle}</div>
        </div>
        <form className="QuestionEditor_form" onSubmit={handleSubmit}>
          {!type && (
            <QuestionSelector
              handleSelect={type =>
                setQuestionType(question.id, type)}
            />
          )}
          {type &&
            editors.map(editor => {
              switch (editor) {
                case 'type':
                  return this.renderTypeField();
                case 'question':
                  return this.renderQuestionField();
                case 'answers':
                  return this.renderAnswerOptionField(
                    'Answer Options',
                    'answers'
                  );
                case 'rows':
                  return this.renderAnswerOptionField(
                    'Row Options',
                    'rows'
                  );
                case 'columns':
                  return this.renderAnswerOptionField(
                    'Column Options',
                    'columns'
                  );
                // no default
              }
              return null;
            })}
          {type && this.renderPageLogicReferences()}
          {this.renderFooter()}
        </form>
      </div>
    );
  }

  renderTypeField() {
    const {
      question,
      proposedQuestionTypes,
      proposeQuestionType,
      setQuestionType,
      typeChangeWarnings,
      clearTypeChangeWarning
    } = this.props;

    const proposedType = proposedQuestionTypes[question.id];

    return (
      <div key="typeField" className="QuestionEditor_formSection">
        <label className="QuestionEditor_label">Question Type</label>
        <Field
          component={this._renderSelectField}
          name="type"
          validate={[validations.required]}
          onChange={e => {
            e.preventDefault();
            proposeQuestionType(question.id, e.target.value);
          }}>
          {QuestionConfig.filter(q => q.available).map((type, i) => (
            <option key={i} value={type.key}>
              {type.title}
            </option>
          ))}
        </Field>
        {typeChangeWarnings[question.id] && (
          <ActionAlert
            pointer="topLeft"
            className="QuestionEditor_changeTypeWarn"
            dismissAction={() => clearTypeChangeWarning(question.id)}
            confirmAction={() =>
              setQuestionType(question.id, proposedType)}>
            <p>
              Do you want to change this question type?<br />
              Previously collected responses<br />
              (for this question only)<br />
              may be permanently deleted.<br />
              Answer options will also be cleared.
            </p>
          </ActionAlert>
        )}
      </div>
    );
  }

  renderQuestionField() {
    const {
      form,
      question,
      placedImage,
      openUploaders,
      showMediaUploader
    } = this.props;
    const hasImage = placedImage && placedImage.image;

    return (
      <div key="questionField" className="QuestionEditor_formSection">
        <label className="QuestionEditor_label">Question</label>
        <div className="QuestionEditor_insertMedia">
          Insert:
          <button
            type="button"
            className="QuestionEditor_insertMediaBtn"
            onClick={() => showMediaUploader(question.id)}>
            Image
          </button>
        </div>
        <Field
          component={this._renderTextField}
          className="QuestionEditor_questionInput"
          name="text"
          validate={[validations.required]}
        />
        {(hasImage || openUploaders[question.id]) && (
          <QuestionMediaCtnr
            formId={form}
            question={question}
            placedImage={placedImage}
          />
        )}
      </div>
    );
  }

  renderAnswerOptionField(label, field) {
    const { type } = this.props;
    const isAnswerField = field === 'answers';
    const isOtherSupported = /SELECT_LIST$/.test(type);

    return (
      <div
        key={`${field}OptionField`}
        className="QuestionEditor_formSection">
        <div className="QuestionEditor_fieldSet">
          <label className="QuestionEditor_label">
            {label}
            <small className="QuestionEditor_labelInstruction">
              (separated by line breaks)
            </small>
          </label>
          {isAnswerField &&
            isOtherSupported &&
            this.renderAddOtherOption()}
          <Field
            component={this._renderTextField}
            className="QuestionEditor_answerInput"
            name={field}
            validate={[
              validations.required,
              validations.min2NewlineDelim
            ]}
          />
        </div>
      </div>
    );
  }

  renderAddOtherOption() {
    let { updateField, answers } = this.props;
    const otherText = `Other, please specify: [[input,width=50]]`;

    if (!answers) {
      answers = otherText;
    } else {
      answers = answers.toString();
      answers = answers.replace(/(\n)+$/, '');
      if (answers.indexOf('[[input') === -1) {
        answers += `\n${otherText}`;
      }
    }

    return (
      <span className="QuestionEditor_addOtherOption">
        <SVGIcon
          iconId="add-plus-lg"
          className="QuestionEditor_addOtherPlusIcon"
        />
        <a
          onClick={() => updateField('answers', answers)}
          className="QuestionEditor_addOtherOptionLink">
          Add “Other” option with input field
        </a>
      </span>
    );
  }

  renderPageLogicReferences() {
    const { survey, pageLogicReferences } = this.props;

    if (!pageLogicReferences.length) return null;
    return (
      <div className="QuestionEditor_logicReferences">
        This question is being referenced by logic on:&nbsp;
        {pageLogicReferences.map((pageId, i) => {
          const index = survey.pages.indexOf(pageId) + 1;
          return (
            <span key={i}>
              <a onClick={() => scrollTo('#page_' + pageId)}>
                Page {index}
              </a>
              {i === pageLogicReferences.length - 2 && ' and '}
              {i < pageLogicReferences.length - 2 ? ', ' : ''}
            </span>
          );
        })}
      </div>
    );
  }

  renderFooter() {
    const {
      survey,
      page,
      question,
      onCancel,
      updateQuestionErrors,
      submitForm,
      invalid
    } = this.props;

    const error = updateQuestionErrors[question.id];

    const logicAlertClass = ['QuestionEditor_logicAlert'];
    if (error && error.status === 409 && error.code === 1) {
      logicAlertClass.push('QuestionEditor_logicAlert--show');
    }

    const onlyOnePage = survey.pages.length === 1;
    const hasOnlyTemp =
      page.questions.length === 1 &&
      isTempQuestion(page.questions[0]);

    let showCancel = true;
    if (onlyOnePage && hasOnlyTemp) {
      showCancel = false;
    }

    return (
      <div className="QuestionEditor_footer">
        <div className="QuestionEditor_col">
          {showCancel && (
            <button
              type="button"
              className="QuestionEditor_cancel"
              onClick={e => onCancel(e)}>
              Cancel
            </button>
          )}
        </div>
        <div className="QuestionEditor_col">
          <button
            type="submit"
            className="QuestionEditor_save"
            disabled={invalid}>
            Save
          </button>
          <ActionAlert
            className={logicAlertClass.join(' ')}
            pointer="rightMiddle"
            confirmAction={() => submitForm()}
            confirmLabel="Yes, Update Anyway">
            <p>
              This question is being referenced by page logic.<br />
              Making this update may cause page logic to be lost.
            </p>
          </ActionAlert>
        </div>
      </div>
    );
  }

  _renderTextField({
    input,
    type,
    placeholder,
    className,
    meta: { touched, error, warning }
  }) {
    return (
      <div>
        <textarea
          {...input}
          type={type}
          placeholder={placeholder}
          className={className}
        />
        <div className="QuestionEditor_error">
          {touched && (error || warning)}
        </div>
      </div>
    );
  }

  _renderSelectField({
    input,
    children,
    meta: { touched, error, warning }
  }) {
    return (
      <div>
        <select {...input}>{children}</select>
        <div className="QuestionEditor_error">
          {touched && (error || warning)}
        </div>
      </div>
    );
  }
}

QuestionEditor.propTypes = {
  form: PropTypes.string,
  survey: PropTypes.object,
  page: PropTypes.object,
  question: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  type: PropTypes.string,
  updateField: PropTypes.func,
  pageLogicReferences: PropTypes.array,
  updateQuestionError: PropTypes.object,
  typeChangeWarnings: PropTypes.object,
  showTypeChangeWarning: PropTypes.func,
  clearTypeChangeWarning: PropTypes.func,
  proposeQuestionType: PropTypes.func,
  proposedQuestionTypes: PropTypes.object,
  setQuestionType: PropTypes.func,
  updateQuestionErrors: PropTypes.object,
  submitForm: PropTypes.func,
  pristine: PropTypes.bool,
  invalid: PropTypes.bool,
  answers: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placedImage: PropTypes.object,
  showMediaUploader: PropTypes.func,
  openUploaders: PropTypes.object
};

export default reduxForm({})(QuestionEditor);
