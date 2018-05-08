import React from 'react';
import { shallow } from 'enzyme';

import { Home } from './Home';

describe('Home Component', () => {
  const initialProps = {
    surveyState: {
      surveys: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<Home {...props} />);
    expect(component).toBeDefined();
  });
});
