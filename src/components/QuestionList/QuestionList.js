import React from 'react';
import PropTypes from 'prop-types';

import './QuestionList.css';

import QuestionPreviewCtnr from '../../containers/QuestionPreviewCtnr/QuestionPreviewCtnr';
import QuestionEditorCtnr from '../../containers/QuestionEditorCtnr/QuestionEditorCtnr';
import QuestionDivider from '../QuestionDivider/QuestionDivider';
import Throbber from '../Throbber/Throbber';

export class QuestionList extends React.PureComponent {
  getLoadText(qId) {
    const {
      creatingQuestions,
      // updatingQuestions,
      deletingQuestions
    } = this.props;

    if (creatingQuestions[qId]) {
      return 'Inserting Question';
    }
    //XXX: removed this for now because it causes the editor
    // component to re-mount, which blows away any changes the
    // user made. If the update returns with a 409, we'll need
    // those changes so that the user can force the update.
    // if(updatingQuestions[qId]){
    //   return 'Updating Question';
    // }
    if (deletingQuestions[qId]) {
      return 'Deleting Question';
    }
    return;
  }

  getQuestionClass(qId) {
    const {
      creatingQuestions,
      updatingQuestions,
      deletingQuestions
    } = this.props;

    const pageClass = ['QuestionList_question'];
    if (creatingQuestions[qId]) {
      pageClass.push('QuestionList_question--creating');
    }
    if (deletingQuestions[qId]) {
      pageClass.push('QuestionList_question--deleting');
    }
    if (updatingQuestions[qId]) {
      pageClass.push('QuestionList_question--updating');
    }
    return pageClass;
  }

  render() {
    const {
      survey,
      page,
      surveyQuestionMap,
      startIndex,
      initQuestion,
      editingQuestions
    } = this.props;

    if (!page || !page.questions) return null;

    return (
      <div className="QuestionList">
        {page.questions.map((qId, i) => {
          const question = surveyQuestionMap[qId];
          const scrollId = new Date(qId).getTime();
          const loadText = this.getLoadText(qId, i);
          const showDivider = i < page.questions.length - 1;

          const questionClass = this.getQuestionClass(qId);

          return (
            <div key={i}>
              <div
                id={`question_${scrollId}`}
                className={questionClass.join(' ')}>
                {!!loadText && (
                  <Throbber
                    show={true}
                    className="QuestionList_throbber"
                    text={loadText}
                  />
                )}

                {!loadText &&
                  question &&
                  !editingQuestions[qId] && (
                    <QuestionPreviewCtnr
                      survey={survey}
                      page={page}
                      question={question}
                      index={startIndex + i}
                    />
                  )}

                {!loadText &&
                  question &&
                  editingQuestions[qId] && (
                    <QuestionEditorCtnr
                      survey={survey}
                      page={page}
                      question={question}
                      index={startIndex + i}
                    />
                  )}
              </div>

              {showDivider && (
                <QuestionDivider
                  page={page}
                  locked={survey.locked}
                  initQuestion={() => initQuestion(page.id, i + 1)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

QuestionList.propTypes = {
  survey: PropTypes.object,
  page: PropTypes.object,
  surveyQuestionMap: PropTypes.object,
  startIndex: PropTypes.number,
  editingQuestions: PropTypes.object,
  creatingQuestions: PropTypes.object,
  updatingQuestions: PropTypes.object,
  deletingQuestions: PropTypes.object,
  initQuestion: PropTypes.func
};

export default QuestionList;
