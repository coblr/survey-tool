import React from 'react';
import { shallow } from 'enzyme';

import { SurveyReportCtnr } from './SurveyReportCtnr';

describe('SurveyReportCtnr Container', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {},
    fetchSurveyErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<SurveyReportCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
