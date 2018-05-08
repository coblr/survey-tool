import React from 'react';
import PropTypes from 'prop-types';

import './Home.css';
import NoSurveysIntro from '../../components/NoSurveysIntro/NoSurveysIntro';
import KeywordFilter from '../../components/KeywordFilter/KeywordFilter';
import SurveyList from '../../components/SurveyList/SurveyList';
import Throbber from '../../components/Throbber/Throbber';
import SurveySummaryHeader from '../../components/SurveySummaryHeader/SurveySummaryHeader';
import SurveySummaryNav from '../../components/SurveySummaryNav/SurveySummaryNav';
import SurveySummaryCtnr from '../../containers/SurveySummaryCtnr/SurveySummaryCtnr';

export class Home extends React.PureComponent {
  render() {
    const { surveyState, fetchingAllSurveys } = this.props;
    const surveyCount = surveyState.surveys.length || 0;

    let layoutContent = '';
    if (!surveyCount && !fetchingAllSurveys) {
      layoutContent = this.renderNoSurveys();
    }
    if (surveyCount && !fetchingAllSurveys) {
      layoutContent = this.renderSurveyDashboard();
    }

    return (
      <div className="Home" style={{ visibility: 'hidden' }}>
        <Throbber
          className="Home_throbber"
          show={fetchingAllSurveys}
          text="Loading Surveys..."
          textOnly
        />

        {layoutContent}
      </div>
    );
  }

  renderNoSurveys() {
    const { openCreateSurveyModal } = this.props;
    return (
      <NoSurveysIntro openCreateSurveyModal={openCreateSurveyModal} />
    );
  }

  renderSurveyDashboard() {
    const {
      surveyState: {
        surveys,
        surveyMap,
        currentSurveyId,
        filteredSurveys,
        filterKeywordRegex,
        filterKeywords
      },
      onSelectSurvey,
      onFilterUpdate
    } = this.props;

    let shownSurveys = surveys;
    if (filteredSurveys && filterKeywords) {
      shownSurveys = filteredSurveys;
    }

    return (
      <div className="Home_surveyDashboard">
        <div className="Home_listCol">
          <div className="Home_listColHeader">
            <KeywordFilter
              onFilterUpdate={onFilterUpdate}
              keywords={filterKeywords}
            />
          </div>
          <SurveyList
            surveys={surveys}
            surveyMap={surveyMap}
            currentSurveyId={currentSurveyId}
            filteredSurveys={filteredSurveys}
            filterKeywords={filterKeywords}
            filterKeywordRegex={filterKeywordRegex}
            selectSurvey={onSelectSurvey}
          />
          <div className="Home_listColFooter">
            Showing {shownSurveys.length} of {surveys.length} Surveys
          </div>
        </div>
        <div className="Home_reportCol">{this.renderReportCol()}</div>
      </div>
    );
  }

  renderReportCol() {
    const {
      match: { params: { surveyId } },
      surveyState,
      surveyState: { surveyMap, currentSurveyId },
      updateSurvey,
      deleteSurvey,
      openCopySurveyModal,
      deletingSurveys
    } = this.props;

    const currentSurvey = surveyMap[currentSurveyId];

    if (!currentSurvey) {
      return (
        <p className="Home_noMatches">
          There are no more surveys matching your search criteria.
        </p>
      );
    }

    if (deletingSurveys[surveyId]) {
      return (
        <Throbber
          className="Home_throbber"
          show={true}
          text={`Deleting Survey...`}
        />
      );
    }

    return (
      <div>
        <SurveySummaryHeader
          survey={currentSurvey}
          deleteSurvey={deleteSurvey}
          updateSurvey={updateSurvey}
          surveyState={surveyState}
          openCopySurveyModal={openCopySurveyModal}
        />
        <SurveySummaryNav survey={currentSurvey} />
        <SurveySummaryCtnr surveyId={currentSurveyId} />
        <div className="Home_dates">
          <div className="Home_createdDate">
            Created: {new Date(currentSurvey.created).toString()}
          </div>
          <div className="Home_modifiedDate">
            Last Modified:{' '}
            {new Date(currentSurvey.lastModified).toString()}
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.object,
  surveyState: PropTypes.object,
  fetchingAllSurveys: PropTypes.bool,
  openCreateSurveyModal: PropTypes.func,
  onSelectSurvey: PropTypes.func,
  onFilterUpdate: PropTypes.func,
  updateSurvey: PropTypes.func,
  deleteSurvey: PropTypes.func,
  openCopySurveyModal: PropTypes.func,
  deletingSurveys: PropTypes.object
};

export default Home;
