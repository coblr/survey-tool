import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import * as validations from '../../helpers/FieldValidations';

import './CreateSurveyModal.css';
import CharacterCount from '../CharacterCount/CharacterCount';
import SVGIcon from '../SVGIcon/SVGIcon';
import Throbber from '../Throbber/Throbber';

export class CreateSurveyModal extends React.PureComponent {
  render() {
    const {
      handleSubmit,
      setNextPath,
      creatingSurvey,
      createSurveyError,
      resetErrors,
      title
    } = this.props;

    if (creatingSurvey) {
      return (
        <div
          className="CreateSurveyModal"
          style={{ visibility: 'hidden' }}>
          <Throbber
            show={true}
            text="Creating Survey"
            className="CreateSurveyModal_throbber"
          />
        </div>
      );
    }

    if (createSurveyError.status) {
      return (
        <div
          className="CreateSurveyModal"
          style={{ visibility: 'hidden' }}>
          <div className="CreateSurveyModal_apiError">
            <p>
              Sorry, your survey could not be created.<br />
              If the issue persists, use the help button.
            </p>
            <button
              className="CreateSurveyModal_errorBtn"
              onClick={() => resetErrors('createSurveyError')}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
      <form
        className="CreateSurveyModal"
        onSubmit={handleSubmit}
        style={{ visibility: 'hidden' }}>
        <div className="CreateSurveyModal_fieldWrapper">
          <label className="CreateSurveyModal_label">
            Name Your Survey
          </label>
          <Field
            id="input-surveyTitle"
            name="title"
            type="text"
            placeholder="Name your new survey..."
            validate={[
              validations.required,
              validations.maxLength100
            ]}
            component={this.renderField}
          />
          <small>
            <CharacterCount input={title || ''} limit={100} />
          </small>
          <p className="CreateSurveyModal_fieldAddl">
            This name is not visible to survey takers.
          </p>
        </div>
        <div className="CreateSurveyModal_nextAction">
          <label className="CreateSurveyModal_label">
            What would you like to do first?
          </label>
          <div className="CreateSurveyModal_buildNext">
            <button
              id="btn-buildAfterCreate"
              type="submit"
              className="CreateSurveyModal_nextBtn btn btn-primary"
              onClick={() => setNextPath('build')}>
              Build My Survey
              <SVGIcon
                iconId="arrow-r-lg"
                className="CreateSurveyModal_nextBtnIcon"
              />
            </button>
            <p className="CreateSurveyModal_nextText">
              First build your survey, then promote it to your own
              audience or an on-demand audience.
            </p>
          </div>
          <div className="CreateSurveyModal_promoteNext">
            <button
              id="btn-findAfterCreate"
              type="submit"
              className="CreateSurveyModal_nextBtn btn btn-primary"
              onClick={() => setNextPath('promote')}>
              Find My Audience
              <SVGIcon
                iconId="arrow-r-lg"
                className="CreateSurveyModal_nextBtnIcon"
              />
            </button>
            <p className="CreateSurveyModal_nextText">
              First find the right audience, on-demand, to answer your
              questions, then build your survey.
            </p>
          </div>
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
        <p className="CreateSurveyModal_error">
          {touched && (error || warning)}
        </p>
        <input
          {...input}
          id={id}
          type={type}
          placeholder={placeholder}
          className="CreateSurveyModal_inputField form-control"
        />
      </div>
    );
  }
}

CreateSurveyModal.propTypes = {
  handleSubmit: PropTypes.func,
  setNextPath: PropTypes.func,
  creatingSurvey: PropTypes.bool,
  createSurveyError: PropTypes.object,
  resetErrors: PropTypes.func,
  title: PropTypes.string
};

export default reduxForm({
  form: 'CreateSurveyModal',
  touchOnChange: true
})(CreateSurveyModal);
