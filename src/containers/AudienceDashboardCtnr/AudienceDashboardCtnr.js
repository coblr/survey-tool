import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AudienceDashboard from '../../components/AudienceDashboard/AudienceDashboard';

import { fetchAudienceStatus } from '../../store/api/ProjectAudience';

export class AudienceDashboardCtnr extends React.PureComponent {
  componentDidMount() {
    this.refreshAudienceStatuses();
  }

  componentDidUpdate(prevProps) {
    const { survey } = this.props;
    const { survey: prevSurvey } = prevProps;

    if (!!prevSurvey && prevSurvey.id !== survey.id) {
      this.refreshAudienceStatuses();
    }
  }

  refreshAudienceStatuses() {
    const { survey, fetchAudienceStatus } = this.props;
    survey.projectInfo.audienceIds.forEach(audienceId => {
      fetchAudienceStatus(survey.projectInfo.projectId, audienceId);
    });
  }

  render() {
    return (
      <AudienceDashboard
        refreshAudienceStatuses={() => this.refreshAudienceStatuses()}
        {...this.props}
      />
    );
  }
}

AudienceDashboardCtnr.propTypes = {
  survey: PropTypes.object,
  fetchingAudienceStatus: PropTypes.object,
  fetchAudienceStatus: PropTypes.func
};

const mapStateToProps = state => ({
  audienceStatus: state.ProjectAudience.get('audienceStatus').toJS(),
  fetchingAudienceStatus: state.ProjectAudience
    .get('fetchingAudienceStatus')
    .toJS(),
  fetchAudienceStatusErrors: state.ProjectAudience
    .get('fetchAudienceStatusErrors')
    .toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchAudienceStatus(projectId, audienceId) {
    dispatch(fetchAudienceStatus(projectId, audienceId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  AudienceDashboardCtnr
);
