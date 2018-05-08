import React from 'react';
import PropTypes from 'prop-types';

import './BuildActions.css';
import SurveyActionNav from '../SurveyActionNav/SurveyActionNav';
import SurveyPageNav from '../SurveyPageNav/SurveyPageNav';
import QuestionActionNav from '../QuestionActionNav/QuestionActionNav';
import SurveyPreviewBtn from '../SurveyPreviewBtn/SurveyPreviewBtn';

export class BuildActions extends React.PureComponent {
  render() {
    const {
      survey,
      showSurveyActions,
      showPageNav,
      showQuestionActions,
      surveyPageMap,
      openCopySurveyModal,
      deleteSurvey,
      collapseAllQuestions,
      expandAllQuestions
    } = this.props;

    return (
      <div className="BuildActions" style={{ visibility: 'hidden' }}>
        {showSurveyActions && (
          <SurveyActionNav
            survey={survey}
            openCopySurveyModal={openCopySurveyModal}
            deleteSurvey={deleteSurvey}
          />
        )}
        {showPageNav && (
          <SurveyPageNav
            surveyPages={survey.pages}
            surveyPageMap={surveyPageMap}
          />
        )}
        {showQuestionActions && (
          <QuestionActionNav
            collapseAllQuestions={collapseAllQuestions}
            expandAllQuestions={expandAllQuestions}
          />
        )}
        <SurveyPreviewBtn surveyId={survey.id} />
      </div>
    );
  }
}

BuildActions.propTypes = {
  survey: PropTypes.object,
  showSurveyActions: PropTypes.bool,
  showPageNav: PropTypes.bool,
  showQuestionActions: PropTypes.bool,
  surveyPageMap: PropTypes.object,
  openCopySurveyModal: PropTypes.func,
  deleteSurvey: PropTypes.func,
  collapseAllQuestions: PropTypes.func,
  expandAllQuestions: PropTypes.func
};

export default BuildActions;
