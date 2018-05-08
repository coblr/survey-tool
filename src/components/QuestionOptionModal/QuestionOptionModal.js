import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';

import QuestionConfig from '../../helpers/QuestionConfig';
import * as validations from '../../helpers/FieldValidations';

import './QuestionOptionModal.css';
import Throbber from '../Throbber/Throbber';
import OptionAnchorTable from '../OptionAnchorTable/OptionAnchorTable';

export class QuestionOptionModal extends React.PureComponent {
  render() {
    const { question, updatingQuestions, handleSubmit } = this.props;

    if (updatingQuestions[question.id]) {
      return (
        <Throbber
          show={true}
          text="Saving Options"
          className="QuestionOptionModal_throbber"
          style={{ visibility: 'hidden' }}
        />
      );
    }

    const qConfig = QuestionConfig.find(c => c.key === question.type);
    const type = qConfig.questionType;
    const options = qConfig.options;

    const randomizeField = type === 'matrix' ? 'rows' : 'answers';
    const exclusiveField = type === 'matrix' ? 'columns' : 'answers';

    return (
      <form
        className="QuestionOptionModal"
        style={{ visibility: 'hidden' }}
        onSubmit={handleSubmit}>
        {options.map(option => {
          switch (option) {
            case 'hide':
              return this.renderHideOptions();
            case 'mandatory':
              return this.renderMandatoryOptions();
            case 'randomize':
              return this.renderRandomizeOptions(randomizeField);
            case 'exclusive':
              return this.renderExclusiveOptions(exclusiveField);
            case 'minAnswers':
              return this.renderMinAnswersOptions();
            case 'maxAnswers':
              return this.renderMaxAnswersOptions();
            case 'inputType':
              return this.renderInputTypeOptions();
            case 'inputLength':
              return this.renderInputLengthOptions();
            // no default
          }
          return null;
        })}
      </form>
    );
  }

  renderHideOptions() {
    return (
      <div
        key="hideOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          <Field
            type="checkbox"
            component="input"
            normalize={value => value || false}
            name="hidden"
            className="QuestionOptionModal_checkbox"
          />
          Hide this question
        </label>
        <p className="QuestionOptionModal_optionDesc">
          This question will be hidden and removed from the survey
          sequence.
        </p>
      </div>
    );
  }

  renderMandatoryOptions() {
    return (
      <div
        key="mandatoryOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          <Field
            type="checkbox"
            component="input"
            normalize={value => value || false}
            name="mandatory"
            className="QuestionOptionModal_checkbox"
          />
          Make this question mandatory
        </label>
        <p className="QuestionOptionModal_optionDesc">
          {`The user needs to answer this question before they can proceed to
          the next page. If they click the "next" button, the user will see
          the error message "You must answer this question before you can
          proceed."`}
        </p>
      </div>
    );
  }

  renderRandomizeOptions(randomizeField) {
    const { question, randomizeAnswers } = this.props;

    return (
      <div
        key="randomizeOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          <Field
            type="checkbox"
            component="input"
            normalize={value => value || false}
            className="QuestionOptionModal_checkbox"
            name="randomizeAnswers"
          />
          Randomize {randomizeField}
        </label>
        <p className="QuestionOptionModal_optionDesc">
          The order in which the {randomizeField} are presented will
          randomly change for each survey taker.
        </p>
        {randomizeAnswers && (
          <p className="QuestionOptionModal_optionDesc">
            {`To keep specific {randomizeField} in the same position,
            you can set "anchors" in the table below.`}
          </p>
        )}
        {randomizeAnswers && (
          <OptionAnchorTable
            className="QuestionOptionModal_optionTable"
            name={randomizeField}
            options={question[randomizeField]}
            randomized={randomizeAnswers}
            anchorEnabled={true}
          />
        )}
      </div>
    );
  }

  renderExclusiveOptions(exclusiveField) {
    const { question } = this.props;
    return (
      <div
        key="exclusiveOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          Exclusive Options
        </label>
        <p className="QuestionOptionModal_optionDesc">
          {`When a user selects an "exclusive" option the other options
          immediately become unavailable.`}
        </p>
        <OptionAnchorTable
          className="QuestionOptionModal_optionTable"
          name={exclusiveField}
          options={question[exclusiveField]}
          exclusiveEnabled={true}
        />
      </div>
    );
  }

  renderMinAnswersOptions() {
    return (
      <div
        key="minAnswersOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          Minimum number of answers required:
          <Field
            type="number"
            component="input"
            name="minAnswers"
            step="1"
            className="QuestionOptionModal_input"
          />
        </label>
      </div>
    );
  }

  renderMaxAnswersOptions() {
    return (
      <div
        key="maxAnswersOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          Maximum number of answers allowed:
          <Field
            type="number"
            component="input"
            name="maxAnswers"
            step="1"
            className="QuestionOptionModal_input"
          />
        </label>
      </div>
    );
  }

  renderInputTypeOptions() {
    return (
      <div
        key="inputTypeOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          Input text can include:
        </label>
        <label className="QuestionOptionModal_radioLabel">
          <Field
            type="radio"
            component="input"
            name="inputTextType"
            value="ANY"
            className="QuestionOptionModal_checkbox"
          />
          All Characters
        </label>
        <label className="QuestionOptionModal_radioLabel">
          <Field
            type="radio"
            component="input"
            name="inputTextType"
            value="NUMERIC"
            className="QuestionOptionModal_checkbox"
          />
          Numbers Only
        </label>
        <label className="QuestionOptionModal_radioLabel">
          <Field
            type="radio"
            component="input"
            name="inputTextType"
            value="NON_NUMERIC"
            className="QuestionOptionModal_checkbox"
          />
          Letters Only
        </label>
      </div>
    );
  }

  renderInputLengthOptions() {
    const { lengthType, lengthEnabled, question } = this.props;

    const exactValidations = [];
    if (lengthEnabled && lengthType === 'EXACT') {
      exactValidations.push(validations.required);
    }

    const rangeValidations = [];
    if (lengthEnabled && lengthType === 'RANGE') {
      rangeValidations.push(validations.required);
    }

    const limit = question.type === 'SINGLE_LINE_TEXT' ? 200 : 2500;

    return (
      <div
        key="inputLengthOptions"
        className="QuestionOptionModal_optionField">
        <label className="QuestionOptionModal_optionLabel">
          Text input is limited to:
        </label>
        <label className="QuestionOptionModal_blockLabel">
          <Field
            type="radio"
            component="input"
            name="lengthType"
            value="DEFAULT"
            className="QuestionOptionModal_checkbox"
          />
          {limit} Characters (Default)
        </label>
        <label className="QuestionOptionModal_blockLabel">
          <Field
            type="radio"
            component="input"
            name="lengthType"
            value="EXACT"
            className="QuestionOptionModal_checkbox"
          />
          Exactly
          <Field
            type="number"
            component="input"
            name="exactAnsLength"
            className="QuestionOptionModal_input"
            validate={exactValidations}
            disabled={lengthType !== 'EXACT'}
          />
          characters.
        </label>
        <label className="QuestionOptionModal_blockLabel">
          <Field
            type="radio"
            component="input"
            name="lengthType"
            value="RANGE"
            className="QuestionOptionModal_checkbox"
          />
          Between
          <Field
            type="number"
            component="input"
            name="minAnsLength"
            className="QuestionOptionModal_input"
            validate={rangeValidations}
            disabled={lengthType !== 'RANGE'}
          />
          and
          <Field
            type="number"
            component="input"
            name="maxAnsLength"
            className="QuestionOptionModal_input"
            validate={rangeValidations}
            disabled={lengthType !== 'RANGE'}
          />
          characters.
        </label>
      </div>
    );
  }
}

QuestionOptionModal.propTypes = {
  question: PropTypes.object,
  updatingQuestions: PropTypes.object,
  randomizeAnswers: PropTypes.bool,
  updateQuestionOption: PropTypes.func,
  setAnswerAnchor: PropTypes.func,
  setAnswerExclusive: PropTypes.func,
  handleSubmit: PropTypes.func,
  lengthType: PropTypes.string,
  lengthEnabled: PropTypes.bool
};

export default reduxForm({
  form: 'QuestionOptionModal'
})(QuestionOptionModal);
