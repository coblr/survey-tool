import React from 'react';
import { shallow } from 'enzyme';

import { RealTimeReportCtnr } from './RealTimeReportCtnr';

describe('RealTimeReportCtnr Container', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyFilters: {},
    filterMappings: {},
    surveyReports: {},
    fetchingSurveyFilters: {},
    fetchingFilterMappings: {},
    fetchingSurveyReports: {},
    currentFilters: {
      realtime: {}
    },
    fetchSurveyReportErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<RealTimeReportCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
