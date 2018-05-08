import React from 'react';
import PropTypes from 'prop-types';

import { isTempQuestion } from '../../helpers/TempQuestions';
import FeatureToggles from '../../helpers/FeatureToggles';

import './PageList.css';
import PageHeaderCtnr from '../../containers/PageHeaderCtnr/PageHeaderCtnr';
import PageFooter from '../PageFooter/PageFooter';
import PageDivider from '../PageDivider/PageDivider';
import QuestionListCtnr from '../../containers/QuestionListCtnr/QuestionListCtnr';
import Throbber from '../Throbber/Throbber';
import PageLogicCtnr from '../../containers/PageLogicCtnr/PageLogicCtnr';

export class PageList extends React.PureComponent {
  getLoadText(pageId, i) {
    const { creatingPages, deletingPages } = this.props;
    if (creatingPages[i]) {
      return 'Creating Page';
    }
    if (deletingPages[pageId]) {
      return 'Deleting Page';
    }
    return;
  }

  getPageClass(pageId, i) {
    const { creatingPages, deletingPages, survey } = this.props;
    const pageClass = ['PageList_page'];
    if (creatingPages[i]) {
      pageClass.push('PageList_page--creating');
    }
    if (deletingPages[pageId]) {
      pageClass.push('PageList_page--deleting');
    }
    if (survey.locked) {
      pageClass.push('PageList_page--locked');
    }
    return pageClass;
  }

  render() {
    const {
      survey,
      surveyPageMap,
      initQuestion,
      createPage,
      creatingPages,
      deletingPages,
      pageLogic,
      createPageLogic
    } = this.props;

    if (!survey || !survey.pages) return null;

    const questionCounts = survey.pages.map(
      p => (surveyPageMap[p] ? surveyPageMap[p].questions.length : 0)
    );

    let qStartIndex = 0;

    return (
      <div className="PageList">
        {survey.pages.map((pageId, i) => {
          const page = surveyPageMap[pageId];
          const loadText = this.getLoadText(pageId, i);
          const pageClass = this.getPageClass(pageId, i);

          qStartIndex += questionCounts[i - 1] || 0;

          // don't show page dividers around pages
          // that are unstable
          const showDivider =
            pageId !== 'temp' &&
            !creatingPages[i + 1] &&
            !deletingPages[pageId];

          if (!page) return null;

          // when the survey is locked, we don't
          // want to show pages that were left empty.
          const hasOnlyTemp =
            page.questions.length === 1 &&
            isTempQuestion(page.questions[0]);
          if (
            (survey.locked || !FeatureToggles.SURVEY_MGMT_ENABLED) &&
            hasOnlyTemp
          ) {
            return null;
          }

          return (
            <div key={i}>
              <div
                id={`page_${pageId}`}
                className={pageClass.join(' ')}>
                {!!loadText && (
                  <Throbber
                    show={true}
                    p
                    className="PageList_throbber"
                    text={loadText}
                  />
                )}
                {!loadText && (
                  <div>
                    <PageHeaderCtnr
                      index={i}
                      survey={survey}
                      page={page}
                    />
                    <QuestionListCtnr
                      page={page}
                      survey={survey}
                      startIndex={qStartIndex}
                    />
                    {(page.branchLogic || pageLogic[page.id]) && (
                      <PageLogicCtnr
                        index={i}
                        survey={survey}
                        page={page}
                      />
                    )}
                    {!survey.locked && (
                      <PageFooter
                        page={page}
                        survey={survey}
                        pageLogic={pageLogic}
                        initQuestion={() => initQuestion(page.id)}
                        createPageLogic={() =>
                          createPageLogic(page.id)}
                      />
                    )}
                  </div>
                )}
              </div>
              {showDivider &&
                !survey.locked && (
                  <PageDivider
                    createPage={() => createPage(survey.id, i + 1)}
                  />
                )}
            </div>
          );
        })}
      </div>
    );
  }
}

PageList.propTypes = {
  survey: PropTypes.object,
  surveyPageMap: PropTypes.object,
  createPage: PropTypes.func,
  deletePage: PropTypes.func,
  initQuestion: PropTypes.func,
  creatingPages: PropTypes.object,
  deletingPages: PropTypes.object,
  pageLogic: PropTypes.object,
  createPageLogic: PropTypes.func
};

export default PageList;
