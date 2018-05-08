import React from 'react';
import { shallow } from 'enzyme';

import { SSIIcon } from './SSIIcon';

describe('SSIIcon Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SSIIcon {...props} />);
    expect(component).toBeDefined();
  });
});
