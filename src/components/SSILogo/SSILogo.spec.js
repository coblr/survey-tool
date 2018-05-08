import React from 'react';
import { shallow } from 'enzyme';

import { SSILogo } from './SSILogo';

describe('SSILogo Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SSILogo {...props} />);
    expect(component).toBeDefined();
  });
});
