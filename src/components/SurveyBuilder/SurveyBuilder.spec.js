import React from 'react';
import { shallow } from 'enzyme';

import { SurveyBuilder } from './SurveyBuilder';

describe('SurveyBuilder Component', () => {
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
    let component = shallow(<SurveyBuilder {...props} />);
    expect(component).toBeDefined();
  });
});
