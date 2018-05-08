import React from 'react';
import { shallow } from 'enzyme';

import { SurveyResponses } from './SurveyResponses';

describe('SurveyResponses Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyResponses {...props} />);
    expect(component).toBeDefined();
  });
});
