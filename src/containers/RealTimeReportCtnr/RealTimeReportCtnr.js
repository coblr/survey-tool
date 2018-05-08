import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import checkAllowDownloads from '../../helpers/checkAllowDownloads';

import ReportWrapper from '../../components/ReportWrapper/ReportWrapper';
import SurveyReportFilter from '../../components/SurveyReportFilter/SurveyReportFilter';
import SurveySourceSummary from '../../components/SurveySourceSummary/SurveySourceSummary';
import SurveyQuestionReport from '../../components/SurveyQuestionReport/SurveyQuestionReport';
import Throbber from '../../components/Throbber/Throbber';
import NotAvailable from '../../components/NotAvailable/NotAvailable';

import { openCreateFilterModal } from '../../store/ui/CreateFilterModal';
import { toggleChart } from '../../store/ui/RealTimeCharts';
import {
  setCurrentFilter,
  fetchSurveyReport
} from '../../store/api/SurveyReport';
import { openReportFilterModal } from '../../store/ui/ReportFilterModal';
import {
  createFilter,
  updateFilterMapping,
  updateFilter,
  deleteFilter
} from '../../store/api/SurveyReportFilter';
import { openDownloadReportModal } from '../../store/ui/DownloadReportModal';

export class RealTimeReportCtnr extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      allowDownload: false
    };
  }

  componentDidMount() {
    this.loadReport();
  }

  shouldComponentUpdate(prevProps) {
    return JSON.stringify(prevProps) !== JSON.stringify(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: { params: { surveyId } },
      surveyMap,
      userId
    } = nextProps;
    const survey = surveyMap[surveyId];
    const allow = checkAllowDownloads({ survey, userId });
    this.setState({ allowDownload: allow });
  }

  componentWillUpdate(nextProps) {
    this.activateTableCharts(nextProps);
  }

  componentDidUpdate(prevProps) {
    this.loadReport(prevProps);
  }

  loadReport(prevProps) {
    let {
      match: { params: { surveyId } },
      currentFilters,
      fetchSurveyReport
    } = this.props;

    this.suggestCurrentFilter();

    currentFilters = currentFilters[surveyId];

    if (!currentFilters) return;

    const rtFilter = currentFilters.realtime;
    let prtFilter;
    if (prevProps && prevProps.currentFilters[surveyId]) {
      prtFilter = prevProps.currentFilters[surveyId].realtime;
    }

    const isDifferent =
      JSON.stringify(rtFilter) !== JSON.stringify(prtFilter);
    if (rtFilter && isDifferent) {
      fetchSurveyReport(surveyId, rtFilter.id);
    }
  }

  suggestCurrentFilter() {
    let {
      match: { params: { surveyId, filterId } },
      surveyFilters,
      filterMappings,
      currentFilters,
      fetchingSurveyFilters,
      fetchingFilterMappings,
      createFilter,
      creatingSurveyFilters,
      updateFilterMapping,
      updatingFilterMappings,
      setCurrentFilter
    } = this.props;

    currentFilters = currentFilters[surveyId];
    surveyFilters = surveyFilters[surveyId];
    filterMappings = filterMappings[surveyId];

    let currentFilter;
    if (currentFilters) {
      currentFilter = currentFilters.realtime;
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

    // Realtime Reports does not exchange filters with
    // Individual Reports, we need to filter those out.
    surveyFilters = surveyFilters.filter(
      f => f.title !== 'INDIVIDUAL'
    );

    // Ideally, the filter we just found should be
    // mapped with the survey. Let's look and find out.
    let mappedFilter;
    if (
      surveyFilters.length &&
      filterMappings &&
      filterMappings.realtime
    ) {
      mappedFilter = surveyFilters.find(
        f => f.id === filterMappings.realtime
      );
    }

    let requestedFilter;
    if (surveyFilters.length) {
      requestedFilter = surveyFilters.find(f => f.id === filterId);
    }

    // if no realtime filters, and no mapped filter
    // we need to create a new filter for the report.
    if (!surveyFilters.length && !mappedFilter && !currentFilter) {
      createFilter(surveyId, {
        surveyId,
        title: 'My Survey Summary'
      });
    }

    // if we have real-time filters but no mapped filter,
    // that means we haven't mapped yet and need to do so.
    // if a filter was requested, map to that one, otherwise
    // map to the first filter we have.
    if (surveyFilters.length && !mappedFilter) {
      const nextFilter = requestedFilter || surveyFilters[0];
      updateFilterMapping(surveyId, {
        mappings: { realtime: nextFilter.id }
      });
    }

    // set the current filter if we have filters and have
    // at least an idea of which filter we want to use, and
    // either that filter is different than the current,
    // or there is no current filter.
    const suggested = requestedFilter || mappedFilter;
    if (
      surveyFilters.length &&
      suggested &&
      (!currentFilter || !_.isEqual(currentFilter, suggested))
    ) {
      setCurrentFilter(
        surveyId,
        'realtime',
        requestedFilter || mappedFilter
      );
    }
  }

  activateTableCharts(nextProps) {
    const {
      match: { params: { surveyId } },
      surveyReports,
      chartMap,
      toggleChart
    } = nextProps;

    if (surveyReports[surveyId]) {
      // the responses are grouped by question
      const questions = surveyReports[surveyId].questionResponses;
      questions.forEach(q => {
        if (!chartMap[q.questionId]) {
          toggleChart(q.questionId, 'table');
        }
      });
    }
  }

  handleFilterUpdate(value) {
    const {
      match: { params: { surveyId } },
      updateFilter,
      currentFilters
    } = this.props;

    const filter = currentFilters[surveyId].realtime;
    filter.title = value;
    updateFilter(surveyId, filter.id, filter);
  }

  handleFilterDelete() {
    const {
      match: { params: { surveyId } },
      deleteFilter,
      currentFilters,
      history
    } = this.props;
    deleteFilter(surveyId, currentFilters[surveyId].realtime.id);
    history.push(`/surveys/${surveyId}/reports/realtime`);
  }

  render() {
    let {
      match: { params: { surveyId } },
      openCreateFilterModal,
      toggleChart,
      chartMap,
      surveyReports,
      surveyFilters,
      fetchingSurveyReports,
      fetchingSurveyFilters,
      fetchingFilterMappings,
      currentFilters,
      openReportFilterModal,
      fetchSurveyReportErrors,
      openDownloadReportModal,
      media
    } = this.props;

    const report = surveyReports[surveyId];
    const error = fetchSurveyReportErrors[surveyId];
    currentFilters = currentFilters[surveyId];

    let currentFilter;
    if (currentFilters) {
      currentFilter = currentFilters.realtime;
    }

    const isFetching = !!(
      fetchingSurveyReports[surveyId] ||
      fetchingSurveyFilters[surveyId] ||
      fetchingFilterMappings[surveyId]
    );

    if (isFetching) {
      return (
        <Throbber
          show={true}
          text="Loading Responses..."
          textOnly={false}
        />
      );
    }

    const reportTitle = !_.isEmpty(currentFilter)
      ? currentFilter.title
      : 'Real-Time Report';

    let deleteFn;
    if (surveyFilters[surveyId]) {
      const usableFilters = surveyFilters[surveyId].filter(
        f => f.title !== 'INDIVIDUAL'
      );

      if (usableFilters.length > 1) {
        deleteFn = () => this.handleFilterDelete();
      }
    }

    return (
      <ReportWrapper
        title={reportTitle}
        allowTitleEdit={true}
        allowMultipleFilters={true}
        openCreateFilterModal={openCreateFilterModal}
        mappingId="realtime"
        updateFilter={value => this.handleFilterUpdate(value)}
        deleteFilter={deleteFn}
        refreshFilter={() => this.loadReport()}
        openDownloadReportModal={() =>
          openDownloadReportModal(currentFilter.id)}
        allowDownload={this.state.allowDownload}>
        {!!currentFilter && (
          <SurveyReportFilter
            currentFilter={currentFilter}
            openReportFilterModal={() =>
              openReportFilterModal(currentFilter)}
          />
        )}

        {!report &&
          error && (
            <NotAvailable reason="Sorry, there was an error fetching the report. Please try again later." />
          )}

        {report &&
          report.sourceBreakdowns && (
            <SurveySourceSummary data={report.sourceBreakdowns} />
          )}

        {report &&
          report.questionResponses &&
          report.questionResponses.map((res, i) => (
            <SurveyQuestionReport
              index={i + 1}
              key={i}
              question={res}
              chartMap={chartMap}
              toggleChart={toggleChart}
              showActions={true}
              filter={currentFilter}
              media={media}
            />
          ))}
      </ReportWrapper>
    );
  }
}

RealTimeReportCtnr.propTypes = {
  match: PropTypes.object,
  openCreateFilterModal: PropTypes.func,
  openReportFilterModal: PropTypes.func,
  toggleChart: PropTypes.func,
  chartMap: PropTypes.object,
  surveyFilters: PropTypes.object,
  filterMappings: PropTypes.object,
  updateFilterMapping: PropTypes.func,
  updatingFilterMappings: PropTypes.object,
  fetchingSurveyFilters: PropTypes.object,
  fetchingFilterMappings: PropTypes.object,
  currentFilters: PropTypes.object,
  setCurrentFilter: PropTypes.func,
  fetchSurveyReport: PropTypes.func,
  fetchingSurveyReports: PropTypes.object,
  surveyReports: PropTypes.object,
  createFilter: PropTypes.func,
  creatingSurveyFilters: PropTypes.object,
  updateFilter: PropTypes.func,
  deleteFilter: PropTypes.func,
  fetchSurveyReportErrors: PropTypes.object,
  history: PropTypes.object,
  openDownloadReportModal: PropTypes.func,
  media: PropTypes.object,
  surveyMap: PropTypes.object,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  chartMap: state.RealTimeCharts.get('chartDisplayMap').toJS(),
  surveyFilters: state.SurveyReportFilter.get('surveyFilters').toJS(),
  filterMappings: state.SurveyReportFilter
    .get('filterMappings')
    .toJS(),
  updatingFilterMappings: state.SurveyReportFilter
    .get('updatingFilterMappings')
    .toJS(),
  creatingSurveyFilters: state.SurveyReportFilter
    .get('creatingSurveyFilters')
    .toJS(),
  fetchingSurveyFilters: state.SurveyReportFilter
    .get('fetchingSurveyFilters')
    .toJS(),
  fetchingFilterMappings: state.SurveyReportFilter
    .get('fetchingFilterMappings')
    .toJS(),
  currentFilters: state.SurveyReport.get('currentFilters').toJS(),
  surveyReports: state.SurveyReport.get('surveyReports').toJS(),
  fetchingSurveyReports: state.SurveyReport
    .get('fetchingSurveyReports')
    .toJS(),
  fetchSurveyReportErrors: state.SurveyReport
    .get('fetchSurveyReportErrors')
    .toJS(),
  media: state.Media.get('media').toJS(),
  surveyMap: state.Survey.get('surveyMap').toJS(),
  userId: state.User.get('id')
});

const mapDispatchToProps = dispatch => ({
  openCreateFilterModal() {
    dispatch(openCreateFilterModal());
  },
  toggleChart(questionId, chart) {
    dispatch(toggleChart(questionId, chart));
  },
  fetchSurveyReport(surveyId, filterId) {
    dispatch(fetchSurveyReport(surveyId, filterId));
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
  updateFilter(surveyId, filterId, filter) {
    dispatch(updateFilter(surveyId, filterId, filter));
  },
  deleteFilter(surveyId, filterId) {
    dispatch(deleteFilter(surveyId, filterId));
  },
  openDownloadReportModal(filterId) {
    dispatch(openDownloadReportModal(filterId));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  RealTimeReportCtnr
);
