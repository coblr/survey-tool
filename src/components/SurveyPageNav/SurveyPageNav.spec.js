import React from 'react';
import { shallow } from 'enzyme';

import { SurveyPageNav } from './SurveyPageNav';

describe('SurveyPageNav Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyPageNav {...props} />);
    expect(component).toBeDefined();
  });
});
