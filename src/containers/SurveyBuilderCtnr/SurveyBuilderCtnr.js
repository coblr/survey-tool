import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveyBuilder from '../../components/SurveyBuilder/SurveyBuilder';
import AppSubHeaderCtnr from '../../containers/AppSubHeaderCtnr/AppSubHeaderCtnr';
import SurveyBuilderNav from '../../components/SurveyBuilderNav/SurveyBuilderNav';

import {
  configureLayout,
  showEditorNav
} from '../../store/ui/Global';
import { fetchSurvey, selectSurvey } from '../../store/api/Survey';
import { openCopySurveyModal } from '../../store/ui/CopySurveyModal';
import { fetchMedia } from '../../store/api/Media';

export class SurveyBuilderCtnr extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params: { surveyId } },
      fetchSurvey,
      selectSurvey,
      configureLayout,
      fetchMedia
    } = this.props;

    configureLayout({
      showAppActions: true,
      appBodyBackground: '#FFF'
    });

    fetchSurvey(surveyId);
    selectSurvey(surveyId);
    fetchMedia();
  }

  componentDidUpdate(prevProps) {
    this.checkSurvey(prevProps);
    this.tweakLayout(prevProps);
  }

  checkSurvey(prevProps) {
    const {
      match: { params: { surveyId } },
      surveyMap,
      fetchSurveyErrors,
      history
    } = this.props;
    const { surveyMap: prevSurveyMap } = prevProps;

    const prevSurvey = prevSurveyMap[surveyId];
    const survey = surveyMap[surveyId];
    const wasDeleted = prevSurvey && !survey;
    const surveyExists = prevSurvey && survey;
    const fetchErrors = fetchSurveyErrors[surveyId];

    if (wasDeleted) {
      history.push('/surveys');
    } else if (!surveyExists && !!fetchErrors) {
      if (fetchErrors.status === 404) {
        history.push('/404');
      }
      if (fetchErrors.status === 403) {
        history.push('/403');
      }
    }
  }

  tweakLayout() {
    const { location, showEditorNav } = this.props;

    const loc = location.pathname
      .split('/')
      .splice(3)
      .join('/');

    if (loc.match(/^build/)) {
      showEditorNav(true);
    }

    if (loc.match(/^(promote|report)/)) {
      showEditorNav(false);
    }
  }

  render() {
    const {
      match: { params: { surveyId } },
      surveyMap,
      location
    } = this.props;

    let survey;
    if (surveyMap[surveyId]) {
      survey = surveyMap[surveyId];
    }

    return (
      <div>
        <AppSubHeaderCtnr
          surveyId={surveyId}
          iconId="survey-lg"
          title={survey ? survey.title : 'Loading Survey...'}
          editable={survey && !survey.locked}
        />
        <SurveyBuilderNav surveyId={surveyId} location={location} />
        <div className="container">
          <SurveyBuilder {...this.props} />
        </div>
      </div>
    );
  }
}

SurveyBuilderCtnr.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  fetchSurvey: PropTypes.func,
  selectSurvey: PropTypes.func,
  configureLayout: PropTypes.func,
  location: PropTypes.object,
  showEditorNav: PropTypes.func,
  fetchSurveyErrors: PropTypes.object,
  history: PropTypes.object,
  fetchMedia: PropTypes.func
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS(),
  fetchSurveyErrors: state.Survey.get('fetchSurveyErrors').toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchSurvey(surveyId) {
    dispatch(fetchSurvey(surveyId));
  },
  selectSurvey(surveyId) {
    dispatch(selectSurvey(surveyId));
  },
  configureLayout(config) {
    dispatch(configureLayout(config));
  },
  showEditorNav(bool) {
    dispatch(showEditorNav(bool));
  },
  openCopySurveyModal(title) {
    dispatch(openCopySurveyModal(title));
  },
  fetchMedia() {
    dispatch(fetchMedia());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveyBuilderCtnr
);
