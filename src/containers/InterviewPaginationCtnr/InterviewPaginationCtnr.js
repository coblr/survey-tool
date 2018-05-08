import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paginator from '../../components/Paginator/Paginator';

import { fetchInterviews } from '../../store/api/SurveyInterview';

export class InterviewPaginationCtnr extends React.PureComponent {
  render() {
    const {
      surveyId,
      filterId,
      pagination,
      fetchInterviews
    } = this.props;

    if (!pagination[surveyId]) return null;
    return (
      <Paginator
        config={pagination[surveyId]}
        onChange={page => fetchInterviews(surveyId, filterId, page)}
      />
    );
  }
}

InterviewPaginationCtnr.propTypes = {
  surveyId: PropTypes.string,
  filterId: PropTypes.string,
  pagination: PropTypes.object,
  fetchInterviews: PropTypes.func
};

const mapStateToProps = state => ({
  pagination: state.SurveyInterview
    .get('surveyInterviewPagination')
    .toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchInterviews(surveyId, filterId, page) {
    dispatch(fetchInterviews(surveyId, filterId, page));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  InterviewPaginationCtnr
);
