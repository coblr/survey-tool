import React from 'react';
import { shallow } from 'enzyme';

import { SurveyBuilderNav } from './SurveyBuilderNav';

describe('SurveyBuilderNav Component', () => {
  const initialProps = {
    surveyId: '123',
    location: {
      pathname: '/surveys/123/build'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyBuilderNav {...props} />);
    expect(component).toBeDefined();
  });
});
