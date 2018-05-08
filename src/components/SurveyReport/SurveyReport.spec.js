import React from 'react';
import { shallow } from 'enzyme';

import { SurveyReport } from './SurveyReport';

describe('SurveyReport Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    fetchSurveyErrors: {},
    surveyMap: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyReport {...props} />);
    expect(component).toBeDefined();
  });
});
