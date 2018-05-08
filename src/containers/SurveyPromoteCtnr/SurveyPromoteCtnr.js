import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveyPromote from '../../components/SurveyPromote/SurveyPromote';
import AppSubHeaderCtnr from '../../containers/AppSubHeaderCtnr/AppSubHeaderCtnr';
import SurveyBuilderNav from '../../components/SurveyBuilderNav/SurveyBuilderNav';

import {
  configureLayout,
  showEditorNav
} from '../../store/ui/Global';
import { fetchSurvey, selectSurvey } from '../../store/api/Survey';
import { fetchResponseSources } from '../../store/api/SurveyResponse';
import {
  fetchSurveySources,
  toggleSourceProp
} from '../../store/api/SurveySource';
import { toggleDisableAlert } from '../../store/ui/SourceDashboard';

export class SurveyPromoteCtnr extends React.PureComponent {
  componentDidMount() {
    const {
      match: { params: { surveyId } },
      fetchSurvey,
      selectSurvey,
      configureLayout,
      fetchResponseSources,
      fetchSurveySources
    } = this.props;

    configureLayout({
      showAppActions: true,
      showBuildNav: true,
      showEditorNav: false,
      appBodyBackground: '#FFF'
    });

    fetchSurvey(surveyId);
    selectSurvey(surveyId);
    fetchSurveySources(surveyId);
    fetchResponseSources(surveyId);
  }

  componentDidUpdate(prevProps) {
    this.checkSurvey(prevProps);
    // if the survey has project info, we might need
    // to make a few additional queries.
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
    const surveyExists = prevSurvey && survey;
    const fetchErrors = fetchSurveyErrors[surveyId];

    if (!surveyExists && !!fetchErrors) {
      if (fetchErrors.status === 404) {
        history.push('/404');
      }
      if (fetchErrors.status === 403) {
        history.push('/403');
      }
    }
  }

  render() {
    const {
      match: { params: { surveyId } },
      location,
      surveyMap
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
          <SurveyPromote {...this.props} />
        </div>
      </div>
    );
  }
}

SurveyPromoteCtnr.propTypes = {
  match: PropTypes.object,
  surveyMap: PropTypes.object,
  fetchSurvey: PropTypes.func,
  selectSurvey: PropTypes.func,
  configureLayout: PropTypes.func,
  location: PropTypes.object,
  fetchSurveyErrors: PropTypes.object,
  history: PropTypes.object,
  fetchResponseSources: PropTypes.func,
  fetchSurveySources: PropTypes.func
};

const mapStateToProps = state => ({
  surveyMap: state.Survey.get('surveyMap').toJS(),
  fetchSurveyErrors: state.Survey.get('fetchSurveyErrors').toJS(),
  responseSources: state.SurveyResponse.get('responseSources').toJS(),
  surveySources: state.SurveySource.get('surveySources').toJS(),
  sourceAlerts: state.SourceDashboard.get('sourceAlerts').toJS()
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
  fetchResponseSources(surveyId) {
    dispatch(fetchResponseSources(surveyId));
  },
  fetchSurveySources(surveyId) {
    dispatch(fetchSurveySources(surveyId));
  },
  toggleDisableAlert(sourceId) {
    dispatch(toggleDisableAlert(sourceId));
  },
  toggleSourceProp(surveyId, source, prop) {
    dispatch(toggleSourceProp(surveyId, source, prop));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveyPromoteCtnr
);
