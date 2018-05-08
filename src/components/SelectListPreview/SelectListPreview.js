import React from 'react';
import PropTypes from 'prop-types';

import './SelectListPreview.css';
import { getResponseLabel } from '../../helpers/TextResponses.js';

export class SelectListPreview extends React.PureComponent {
  render() {
    const { question: { type, answers } } = this.props;
    const inputType = /MULTI_/.test(type) ? 'checkbox' : 'radio';

    return (
      <div
        className="SelectListPreview"
        style={{ visibility: 'hidden' }}>
        {answers.map((answer, i) => {
          let answerText = answer.text;
          if (answer.otherSpecify) {
            answerText = getResponseLabel(answer.text, true);
          }
          return (
            <div key={i}>
              <input
                type={inputType}
                className="SelectListPreview_input"
                disabled
              />
              <label className="SelectListPreview_label">
                {answerText}
                {answer.anchored && (
                  <small className="SelectListPreview_answerTag">
                    [anchored]
                  </small>
                )}
                {answer.exclusive && (
                  <small className="SelectListPreview_answerTag">
                    [exclusive]
                  </small>
                )}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}

SelectListPreview.propTypes = {
  question: PropTypes.object
};

export default SelectListPreview;
