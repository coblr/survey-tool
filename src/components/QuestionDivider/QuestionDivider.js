import React from 'react';
import PropTypes from 'prop-types';

import { scrollTo } from '../../helpers/Animations';
import { isTempQuestion } from '../../helpers/TempQuestions';

import './QuestionDivider.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class QuestionDivider extends React.PureComponent {
  render() {
    const { page, initQuestion, locked } = this.props;

    if (!page || !page.questions || !page.questions.length) {
      return null;
    }

    // by default we init a question, but if we already
    // have a temp question then should scroll to it.
    let addFn = initQuestion;
    page.questions.forEach(qId => {
      if (isTempQuestion(qId)) {
        const scrollId = new Date(qId).getTime();
        addFn = () => scrollTo(`#question_${scrollId}`);
      }
    });

    return (
      <div className="QuestionDivider">
        {!locked && (
          <FeatureToggle feature="SURVEY_MGMT_ENABLED">
            <button
              className="QuestionDivider_insertBtn"
              onClick={() => addFn()}>
              <SVGIcon
                iconId="add-plus-lg"
                className="QuestionDivider_insertIcon"
              />
              Insert Question
            </button>
          </FeatureToggle>
        )}
      </div>
    );
  }
}

QuestionDivider.propTypes = {
  page: PropTypes.object,
  initQuestion: PropTypes.func,
  locked: PropTypes.bool
};

export default QuestionDivider;
