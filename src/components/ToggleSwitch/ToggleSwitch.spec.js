import React from 'react';
import { shallow } from 'enzyme';

import { ToggleSwitch } from './ToggleSwitch';

describe('ToggleSwitch Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ToggleSwitch {...props} />);
    expect(component).toBeDefined();
  });
});
