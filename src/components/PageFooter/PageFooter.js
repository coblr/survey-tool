import React from 'react';
import PropTypes from 'prop-types';

import { scrollTo } from '../../helpers/Animations';
import { isTempQuestion } from '../../helpers/TempQuestions';

import './PageFooter.css';
import SVGIcon from '../SVGIcon/SVGIcon';
import FeatureToggle from '../FeatureToggle/FeatureToggle';

export class PageFooter extends React.PureComponent {
  render() {
    const {
      page,
      initQuestion,
      pageLogic,
      createPageLogic
    } = this.props;

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
      <div className="PageFooter">
        <FeatureToggle feature="SURVEY_MGMT_ENABLED">
          <button
            className="PageFooter_button"
            onClick={() => addFn()}>
            <SVGIcon
              iconId="add-plus-lg"
              className="PageFooter_icon"
            />
            Add Question
          </button>
          {!pageLogic[page.id] &&
            !page.branchLogic && (
              <button
                className="PageFooter_button"
                onClick={() => createPageLogic()}>
                <SVGIcon
                  iconId="page-logic"
                  className="PageFooter_icon"
                />
                Add Page Logic
              </button>
            )}
        </FeatureToggle>
      </div>
    );
  }
}

PageFooter.propTypes = {
  page: PropTypes.object,
  initQuestion: PropTypes.func,
  pageLogic: PropTypes.object,
  createPageLogic: PropTypes.func
};

export default PageFooter;
