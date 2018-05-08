import React from 'react';
import { shallow } from 'enzyme';

import { Intro } from './Intro';

describe('Intro Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<Intro {...props} />);
    expect(component).toBeDefined();
  });
});
