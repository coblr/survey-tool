import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Home from '../../components/Home/Home';
import AppSubHeaderCtnr from '../../containers/AppSubHeaderCtnr/AppSubHeaderCtnr';

import { openCreateSurveyModal } from '../../store/ui/CreateSurveyModal';
import { configureLayout } from '../../store/ui/Global';
import {
  fetchSurveyList,
  selectSurvey,
  filterSurveys,
  resetSurveyFilters,
  deleteSurvey,
  updateSurvey
} from '../../store/api/Survey';
import { openCopySurveyModal } from '../../store/ui/CopySurveyModal';

export class HomeCtnr extends React.PureComponent {
  componentDidMount() {
    this.props.configureLayout({
      showAppActions: true,
      showBuildNav: false,
      showEditorNav: false,
      appBodyBackground: '#eee'
    });

    this.props.fetchSurveys();
    this.props.selectSurvey();
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  componentDidUpdate() {
    const surveyCount = this.props.surveyState.surveys.length;

    // make sure we load something if we have surveys to show
    if (surveyCount) {
      this.loadFirstSurvey();
    }
  }

  componentWillUnmount() {
    // clear the filters so when the user comes back,
    // the full list of surveys is showing again.
    this.props.resetSurveyFilters();
  }

  loadFirstSurvey() {
    const {
      match: { params: { surveyId } },
      surveyState: {
        surveys,
        currentSurveyId,
        surveyMap,
        filteredSurveys,
        filterKeywords,
        fetchingSurveys
      },
      selectSurvey,
      history
    } = this.props;

    if (fetchingSurveys[currentSurveyId]) return;

    const suggestedId = surveyId;
    const surveyCount = surveys.length;
    const firstSurvey = surveyMap[surveys[0]];
    const suggestedExists = !!surveyMap[surveyId];
    const hasKeywords = !!filterKeywords;

    // if we are requesting a surveyID that is not our
    // currently selected ID, and we're sure it's a
    // real survey.
    if (
      suggestedId &&
      currentSurveyId &&
      suggestedId !== currentSurveyId &&
      suggestedExists
    ) {
      selectSurvey(suggestedId);
    }

    if (!currentSurveyId && surveyCount) {
      if (!suggestedId) {
        if (!filteredSurveys.length && !hasKeywords) {
          selectSurvey(surveys[0]);
        } else {
          selectSurvey(filteredSurveys[0]);
        }
      }

      if (suggestedId) {
        if (suggestedExists) {
          selectSurvey(surveyId);
        } else {
          // if we have a suggested ID, but that survey doesn't
          // seem to be in our list of surveys, then we need to
          // just redirect the user to another survey entirely.
          if (filteredSurveys.length && hasKeywords) {
            history.push(`/surveys/${filteredSurveys[0]}`);
          } else {
            history.push(`/surveys/${firstSurvey.id}`);
          }
        }
      }
    }
  }

  render() {
    const surveyCount = this.props.surveyState.surveys.length;

    return (
      <div>
        {!!surveyCount && (
          <AppSubHeaderCtnr
            title="My Surveys"
            iconId="doc-survey-grid-lg"
            showCreateBtn={true}
          />
        )}
        <div className="container">
          <Home {...this.props} />
        </div>
      </div>
    );
  }
}

HomeCtnr.propTypes = {
  match: PropTypes.object,
  fetchSurveys: PropTypes.func,
  selectSurvey: PropTypes.func,
  configureLayout: PropTypes.func,
  surveyState: PropTypes.object,
  showAppSubHeader: PropTypes.func,
  resetSurveyFilters: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  surveyState: state.Survey.toJS(),
  fetchingAllSurveys: state.Survey.get('fetchingAllSurveys'),
  deletingSurveys: state.Survey.get('deletingSurveys').toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchSurveys() {
    dispatch(fetchSurveyList());
  },
  selectSurvey(surveyId) {
    dispatch(selectSurvey(surveyId));
  },
  onFilterUpdate(keywords) {
    dispatch(filterSurveys(keywords));
  },
  resetSurveyFilters() {
    dispatch(resetSurveyFilters());
  },
  openCreateSurveyModal() {
    dispatch(openCreateSurveyModal());
  },
  deleteSurvey(survey) {
    dispatch(deleteSurvey(survey));
  },
  updateSurvey(surveyId, survey) {
    dispatch(updateSurvey(surveyId, survey));
  },
  configureLayout(config) {
    dispatch(configureLayout(config));
  },
  openCopySurveyModal(title) {
    dispatch(openCopySurveyModal(title));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeCtnr);
