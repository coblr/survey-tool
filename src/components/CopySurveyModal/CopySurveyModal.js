import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import * as validations from '../../helpers/FieldValidations';

import './CopySurveyModal.css';
import CharacterCount from '../CharacterCount/CharacterCount';
import Throbber from '../Throbber/Throbber';

export class CopySurveyModal extends React.PureComponent {
  render() {
    const {
      title,
      copyingSurvey,
      handleSubmit,
      copySurveyErrors,
      resetErrors,
      surveyId
    } = this.props;

    if (copyingSurvey) {
      return (
        <div
          className="CopySurveyModal"
          style={{ visibility: 'hidden' }}>
          <Throbber
            show={true}
            text="Copying Survey"
            className="CopySurveyModal_throbber"
          />
        </div>
      );
    }

    if (copySurveyErrors[surveyId]) {
      return (
        <div
          className="CopySurveyModal"
          style={{ visibility: 'hidden' }}>
          <div className="CopySurveyModal_apiError">
            <p>
              Sorry, your survey could not be copied.<br />
              If the issue persists, use the help button.
            </p>
            <button
              className="CopySurveyModal_errorBtn"
              onClick={() => resetErrors('copySurveyErrors')}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <form
        className="CopySurveyModal"
        onSubmit={handleSubmit}
        style={{ visibility: 'hidden' }}>
        <div className="CopySurveyModal_fieldWrapper">
          <label className="CopySurveyModal_label">
            Name Your Survey
          </label>
          <Field
            id="input-surveyTitle"
            name="title"
            type="text"
            placeholder="New Survey Copy"
            validate={[
              validations.required,
              validations.maxLength100
            ]}
            component={this.renderField}
          />
          <small>
            <CharacterCount input={title || ''} limit={100} />
          </small>
          <p className="CopySurveyModal_fieldAddl">
            This name is not visible to survey takers.
          </p>
        </div>
      </form>
    );
  }

  renderField({
    input,
    id,
    type,
    placeholder,
    meta: { touched, error, warning }
  }) {
    return (
      <div>
        <p className="CopySurveyModal_error">
          {touched && (error || warning)}
        </p>
        <input
          {...input}
          id={id}
          type={type}
          placeholder={placeholder}
          className="CopySurveyModal_input"
        />
      </div>
    );
  }
}

CopySurveyModal.propTypes = {
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  copyingSurvey: PropTypes.bool,
  copySurveyErrors: PropTypes.object,
  resetErrors: PropTypes.func,
  surveyId: PropTypes.string
};

export default reduxForm({
  form: 'CopySurveyModal',
  touchOnChange: true
})(CopySurveyModal);
