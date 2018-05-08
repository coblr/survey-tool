import React from 'react';
import { shallow } from 'enzyme';

import { InterviewNavigator } from './InterviewNavigator';

describe('InterviewNavigator Component', () => {
  const initialProps = {
    interviews: []
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<InterviewNavigator {...props} />);
    expect(component).toBeDefined();
  });
});
