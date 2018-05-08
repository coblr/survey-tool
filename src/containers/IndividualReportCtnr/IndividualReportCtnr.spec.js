import React from 'react';
import { shallow } from 'enzyme';

import { IndividualReportCtnr } from './IndividualReportCtnr';

describe('IndividualReportCtnr Container', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    interviews: {},
    interviewResponses: {},
    fetchingInterviews: {},
    fetchingInterviewResponses: {},
    fetchingSurveyFilters: {},
    fetchingFilterMappings: {},
    currentFilters: {},
    surveyInterviewPagination: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<IndividualReportCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
