import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FilterSelector from '../../components/FilterSelector/FilterSelector';

import { updateFilterMapping } from '../../store/api/SurveyReportFilter';

export class FilterSelectorCtnr extends React.PureComponent {
  onSelect(filterId) {
    const { surveyId, mappingId, updateFilterMapping } = this.props;
    const mapping = { mappings: {} };
    mapping.mappings[mappingId] = filterId;
    updateFilterMapping(surveyId, mapping);
  }

  render() {
    return (
      <FilterSelector
        onSelect={filterId => this.onSelect(filterId)}
        {...this.props}
      />
    );
  }
}

FilterSelectorCtnr.propTypes = {
  surveyId: PropTypes.string,
  updateFilterMapping: PropTypes.func,
  mappingId: PropTypes.string
};

const mapStateToProps = state => ({
  surveyId: state.Survey.get('currentSurveyId'),
  surveyFilters: state.SurveyReportFilter.get('surveyFilters').toJS(),
  filterMappings: state.SurveyReportFilter
    .get('filterMappings')
    .toJS(),
  currentFilters: state.SurveyReport.get('currentFilters').toJS()
});

const mapDispatchToProps = dispatch => ({
  updateFilterMapping(surveyId, mapping) {
    dispatch(updateFilterMapping(surveyId, mapping));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  FilterSelectorCtnr
);
