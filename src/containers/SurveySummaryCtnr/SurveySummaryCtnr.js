import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SurveySummary from '../../components/SurveySummary/SurveySummary';

import {
  fetchSurveySummary,
  setSummaryScale,
  timeTravel
} from '../../store/api/SurveySummary';
import { fetchSurvey } from '../../store/api/Survey';
import { fetchAudienceStatus } from '../../store/api/ProjectAudience';

export class SurveySummaryCtnr extends React.PureComponent {
  componentDidMount() {
    const { surveyId, surveyMap } = this.props;
    const survey = surveyMap[surveyId];

    this.props.setSummaryScale('day');
    this.props.fetchSurvey(surveyId);
    this.props.fetchSummary(surveyId);

    if (survey && survey.projectInfo) {
      this.fetchAudienceStatus(survey);
    }
  }

  componentWillUpdate(nextProps) {
    const {
      surveyId: oldSurveyId,
      surveyMap: oldSurveyMap
    } = this.props;
    const {
      surveyId: newSurveyId,
      surveyMap: newSurveyMap
    } = nextProps;

    // re-request all info if the survey ID changes
    if (oldSurveyId !== newSurveyId) {
      this.props.fetchSurvey(newSurveyId);
      this.props.fetchSummary(newSurveyId);
    }

    // only if we have project info, re-request audience status
    const oldSurvey = oldSurveyMap[oldSurveyId];
    const newSurvey = newSurveyMap[newSurveyId];
    const oldProjectInfo = oldSurvey && oldSurvey.oldProjectInfo;
    const newProjectInfo = newSurvey && newSurvey.oldProjectInfo;

    if (!oldProjectInfo && newProjectInfo) {
      this.fetchAudienceStatus(newSurvey);
    }
  }

  fetchAudienceStatus(survey) {
    const { fetchAudienceStatus } = this.props;
    const projectInfo = survey.projectInfo;
    if (projectInfo) {
      projectInfo.audienceIds.forEach(audId => {
        fetchAudienceStatus(projectInfo.projectId, audId);
      });
    }
  }

  render() {
    return <SurveySummary {...this.props} />;
  }
}

SurveySummaryCtnr.propTypes = {
  surveyId: PropTypes.string,
  reportState: PropTypes.object,
  fetchSummary: PropTypes.func,
  timeTravel: PropTypes.func,
  setSummaryScale: PropTypes.func,
  fetchSurvey: PropTypes.func,
  surveyMap: PropTypes.object,
  audienceStatus: PropTypes.object,
  fetchAudienceStatus: PropTypes.func
};

const mapStateToProps = state => ({
  reportState: state.SurveySummary.toJS(),
  surveyMap: state.Survey.get('surveyMap').toJS(),
  audienceStatus: state.ProjectAudience.get('audienceStatus').toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchSummary(surveyId, tzHrsOffset, start, end) {
    dispatch(fetchSurveySummary(surveyId, tzHrsOffset, start, end));
  },
  setSummaryScale(scale) {
    dispatch(setSummaryScale(scale));
  },
  timeTravel(multiplier) {
    dispatch(timeTravel(multiplier));
  },
  fetchSurvey(surveyId) {
    dispatch(fetchSurvey(surveyId));
  },
  fetchAudienceStatus(projectId, audienceId) {
    dispatch(fetchAudienceStatus(projectId, audienceId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  SurveySummaryCtnr
);
