import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import * as validations from '../../helpers/FieldValidations';

import './CreateFilterModal.css';
import Throbber from '../Throbber/Throbber';
import CharacterCount from '../CharacterCount/CharacterCount';

export class CreateFilterModal extends React.PureComponent {
  render() {
    const {
      handleSubmit,
      creatingFilters,
      surveyId,
      title
    } = this.props;

    if (creatingFilters[surveyId]) {
      return (
        <div
          className="CreateFilterModal"
          style={{ visibility: 'hidden' }}>
          <Throbber
            show={true}
            text="Creating Report"
            className="CreateFilterModal_throbber"
          />
        </div>
      );
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="CreateFilterModal"
        style={{ visibility: 'hidden' }}>
        <label className="CreateFilterModal_label">
          Name Your Summary Report
        </label>
        <Field
          type="text"
          name="title"
          placeholder="New Survey Report"
          validate={[validations.required, validations.maxLength100]}
          component={this.renderField}
        />
        <small>
          <CharacterCount input={title || ''} limit={100} />
        </small>
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
        <p className="CreateFilterModal_error">
          {touched && (error || warning)}
        </p>
        <input
          {...input}
          id={id}
          type={type}
          placeholder={placeholder}
          className="CreateFilterModal_input"
        />
      </div>
    );
  }
}

CreateFilterModal.propTypes = {
  handleSubmit: PropTypes.func,
  title: PropTypes.string,
  creatingFilters: PropTypes.object,
  surveyId: PropTypes.string
};

export default reduxForm({
  form: 'CreateFilterModal',
  touchOnChange: true
})(CreateFilterModal);
