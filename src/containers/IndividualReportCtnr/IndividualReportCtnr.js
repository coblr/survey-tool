import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import ReportWrapper from '../../components/ReportWrapper/ReportWrapper';
import SurveyReportFilter from '../../components/SurveyReportFilter/SurveyReportFilter';
import SurveyResponses from '../../components/SurveyResponses/SurveyResponses';
import ResponseSummary from '../../components/ResponseSummary/ResponseSummary';
import SurveyQuestionReport from '../../components/SurveyQuestionReport/SurveyQuestionReport';
import Throbber from '../../components/Throbber/Throbber';
import NotAvailable from '../../components/NotAvailable/NotAvailable';

import { openReportFilterModal } from '../../store/ui/ReportFilterModal';
import {
  fetchInterviews,
  fetchInterviewResponses,
  deleteInterview,
  showDeleteAlert,
  hideDeleteAlert,
  updateInterview,
  fetchInterviewDetails
} from '../../store/api/SurveyInterview';
import { setCurrentFilter } from '../../store/api/SurveyReport';
import {
  createFilter,
  updateFilterMapping
} from '../../store/api/SurveyReportFilter';

export class IndividualReportCtnr extends React.PureComponent {
  componentDidMount() {
    this.loadReport();
  }

  shouldComponentUpdate(prevProps) {
    return !_.isEqual(prevProps, this.props);
  }

  componentDidUpdate(prevProps) {
    this.loadReport(prevProps);
  }

  loadReport(prevProps) {
    let {
      match: { params: { surveyId, interviewId } },
      fetchInterviewResponses,
      currentFilters,
      fetchInterviews,
      fetchInterviewDetails
    } = this.props;

    if (interviewId) {
      let isDifferentId;
      if (prevProps) {
        const prevId = prevProps.match.params.interviewId;
        isDifferentId = interviewId !== prevId;
      }
      if (!prevProps || isDifferentId) {
        fetchInterviewDetails(surveyId, interviewId);
        fetchInterviewResponses(surveyId, interviewId);
      }
      return;
    }

    this.suggestCurrentFilter();
    currentFilters = currentFilters[surveyId];
    if (!currentFilters) return;

    const curFilter = currentFilters.individual;
    let prevFilter;
    let prevId;
    if (prevProps) {
      prevId = prevProps.match.params.interviewId;
      if (prevProps.currentFilters[surveyId]) {
        prevFilter = prevProps.currentFilters[surveyId].individual;
      }
    }
    const isDifferent =
      JSON.stringify(curFilter) !== JSON.stringify(prevFilter);

    // load if filters change, or we came from detail view
    if ((curFilter && isDifferent) || prevId) {
      fetchInterviews(surveyId, curFilter ? curFilter.id : null);
    }
  }

  suggestCurrentFilter() {
    let {
      match: { params: { surveyId } },
      surveyFilters,
      filterMappings,
      currentFilters,
      creatingSurveyFilters,
      fetchingSurveyFilters,
      fetchingFilterMappings,
      updatingFilterMappings,
      createFilter,
      updateFilterMapping,
      setCurrentFilter
    } = this.props;

    currentFilters = currentFilters[surveyId];
    surveyFilters = surveyFilters[surveyId];
    filterMappings = filterMappings[surveyId];

    let currentFilter;
    if (currentFilters) {
      currentFilter = currentFilters.individual;
    }

    // if we don't have any filters or mappings yet
    // there's nothing to do here. Get out.
    if (!surveyFilters || !filterMappings) return;
    if (
      fetchingSurveyFilters[surveyId] ||
      fetchingFilterMappings[surveyId] ||
      creatingSurveyFilters[surveyId] ||
      updatingFilterMappings[surveyId]
    )
      return;

    // Individual Reports only uses a single filter
    // so first things first, find that filter.
    let individualFilter = surveyFilters.find(
      f => f.title === 'INDIVIDUAL'
    );

    // Ideally, the filter we just found should be
    // mapped with the survey. Let's look and find out.
    let mappedFilter;
    if (
      surveyFilters &&
      filterMappings &&
      filterMappings.individual
    ) {
      mappedFilter = surveyFilters.find(
        f => f.id === filterMappings.individual
      );
    }

    // if no individual filter, and no mapped filter
    // we need to create a new filter for the report.
    if (!currentFilter && !individualFilter && !mappedFilter) {
      createFilter(surveyId, { surveyId, title: 'INDIVIDUAL' });
    }

    // if we have an individual filter, but no mapped
    // filter, that means we haven't mapped it yet.
    if (individualFilter && !mappedFilter && !currentFilter) {
      updateFilterMapping(surveyId, {
        mappings: { individual: individualFilter.id }
      });
    }

    // finally, if we have our filter and it's been
    // mapped, set it as the current filter to be
    // used by the other UI components.
    const isDifferent =
      JSON.stringify(individualFilter) !==
      JSON.stringify(currentFilter);
    if (individualFilter && mappedFilter && isDifferent) {
      setCurrentFilter(surveyId, 'individual', individualFilter);
    }
  }

  render() {
    const {
      match: { params: { surveyId, interviewId } },
      fetchingInterviews,
      fetchingInterviewResponses,
      fetchingSurveyFilters,
      fetchingFilterMappings
    } = this.props;

    const isFetching = !!(
      fetchingInterviews[surveyId] ||
      fetchingInterviewResponses[surveyId] ||
      fetchingSurveyFilters[surveyId] >= 0 ||
      fetchingFilterMappings[surveyId] >= 0
    );

    if (isFetching) {
      const throbText = !interviewId
        ? 'Loading Response...'
        : 'Loading Response Data...';

      return <Throbber show={true} text={throbText} />;
    }

    return interviewId ? this.renderDetails() : this.renderPlural();
  }

  renderPlural() {
    let {
      match: { params: { surveyId } },
      interviews,
      currentFilters,
      openReportFilterModal
    } = this.props;

    const report = interviews[surveyId];
    currentFilters = currentFilters[surveyId];

    let currentFilter;
    if (currentFilters) {
      currentFilter = currentFilters.individual;
    }

    if (!report || !currentFilter) return null;
    return (
      <ReportWrapper
        title="Individual Responses"
        refreshFilter={() => this.loadReport()}>
        <SurveyReportFilter
          currentFilter={currentFilter}
          openReportFilterModal={() =>
            openReportFilterModal(currentFilter)}
        />
        <SurveyResponses
          surveyId={surveyId}
          filterId={currentFilter.id}
          responses={report}
          {...this.props}
        />
      </ReportWrapper>
    );
  }

  renderDetails() {
    const {
      match: { params: { surveyId, interviewId } },
      interviewResponses,
      fetchingInterviews,
      toggleExclude,
      media
    } = this.props;
    const responses = interviewResponses[interviewId];

    let { interviews } = this.props;
    interviews = interviews[surveyId];

    let interview;
    if (interviews) {
      interview = interviews.find(i => i.interviewId === interviewId);
    }

    if (!interview && !fetchingInterviews[surveyId]) {
      return (
        <NotAvailable
          reason="Sorry, the response you're looking for doesn't exist."
          escapeUrl={`/surveys/${surveyId}/reports/individual`}
        />
      );
    }

    return (
      <ReportWrapper
        surveyId={surveyId}
        title={`Response Id: ${interviewId}`}>
        {interview && (
          <ResponseSummary
            data={[interview]}
            surveyId={surveyId}
            toggleExclude={toggleExclude}
          />
        )}

        {!responses && (
          <NotAvailable reason="Sorry, there was an error fetching the report. Please try again later." />
        )}

        {responses &&
          responses.map((resp, i) => (
            <SurveyQuestionReport
              key={i}
              index={i + 1}
              question={resp}
              interviewId={interviewId}
              media={media}
            />
          ))}
      </ReportWrapper>
    );
  }
}

IndividualReportCtnr.propTypes = {
  match: PropTypes.object,
  fetchInterviews: PropTypes.func,
  fetchInterviewResponses: PropTypes.func,
  interviews: PropTypes.object,
  interviewResponses: PropTypes.object,
  openReportFilterModal: PropTypes.func,
  chartMap: PropTypes.object,
  fetchingInterviews: PropTypes.object,
  fetchingInterviewResponses: PropTypes.object,
  currentFilters: PropTypes.object,
  setCurrentFilter: PropTypes.func,
  surveyFilters: PropTypes.object,
  filterMappings: PropTypes.object,
  createFilter: PropTypes.func,
  updateFilterMapping: PropTypes.func,
  creatingSurveyFilters: PropTypes.object,
  fetchingSurveyFilters: PropTypes.object,
  fetchingFilterMappings: PropTypes.object,
  updatingFilterMappings: PropTypes.object,
  updateInterview: PropTypes.func,
  fetchInterviewDetails: PropTypes.func,
  toggleExclude: PropTypes.func,
  media: PropTypes.object
};

const mapStateToProps = state => ({
  interviews: state.SurveyInterview.get('surveyInterviews').toJS(),
  interviewResponses: state.SurveyInterview
    .get('interviewResponses')
    .toJS(),
  fetchingInterviews: state.SurveyInterview
    .get('fetchingInterviews')
    .toJS(),
  fetchingInterviewResponses: state.SurveyInterview
    .get('fetchingInterviewResponses')
    .toJS(),
  surveyFilters: state.SurveyReportFilter.get('surveyFilters').toJS(),
  filterMappings: state.SurveyReportFilter
    .get('filterMappings')
    .toJS(),
  currentFilters: state.SurveyReport.get('currentFilters').toJS(),
  creatingSurveyFilters: state.SurveyReportFilter
    .get('creatingSurveyFilters')
    .toJS(),
  fetchingSurveyFilters: state.SurveyReportFilter
    .get('fetchingSurveyFilters')
    .toJS(),
  fetchingFilterMappings: state.SurveyReportFilter
    .get('fetchingFilterMappings')
    .toJS(),
  updatingFilterMappings: state.SurveyReportFilter
    .get('updatingFilterMappings')
    .toJS(),
  showDeleteAlerts: state.SurveyInterview
    .get('showDeleteAlerts')
    .toJS(),
  updatingInterviews: state.SurveyInterview
    .get('updatingInterviews')
    .toJS(),
  media: state.Media.get('media').toJS()
});

const mapDispatchToProps = dispatch => ({
  fetchInterviews(surveyId, filterId) {
    dispatch(fetchInterviews(surveyId, filterId));
  },
  fetchInterviewDetails(surveyId, interviewId) {
    dispatch(fetchInterviewDetails(surveyId, interviewId));
  },
  fetchInterviewResponses(surveyId, interviewId) {
    dispatch(fetchInterviewResponses(surveyId, interviewId));
  },
  openReportFilterModal(filter) {
    dispatch(openReportFilterModal(filter));
  },
  createFilter(surveyId, filter) {
    dispatch(createFilter(surveyId, filter));
  },
  updateFilterMapping(surveyId, mapping) {
    dispatch(updateFilterMapping(surveyId, mapping));
  },
  setCurrentFilter(surveyId, mappingId, filter) {
    dispatch(setCurrentFilter(surveyId, mappingId, filter));
  },
  deleteInterview(surveyId, interview) {
    dispatch(deleteInterview(surveyId, interview)).then(res => {
      if (!res.error) {
        dispatch(hideDeleteAlert(interview.interviewId));
      }
    });
  },
  showDeleteAlert(interviewId) {
    dispatch(showDeleteAlert(interviewId));
  },
  hideDeleteAlert(interviewId) {
    dispatch(hideDeleteAlert(interviewId));
  },
  toggleExclude(surveyId, interview) {
    interview.excluded = !interview.excluded;
    dispatch(updateInterview(surveyId, interview));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  IndividualReportCtnr
);
