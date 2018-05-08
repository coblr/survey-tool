import React from 'react';
import { shallow } from 'enzyme';

import { SurveyPages } from './SurveyPages';

describe('SurveyPages Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyPages {...props} />);
    expect(component).toBeDefined();
  });
});
