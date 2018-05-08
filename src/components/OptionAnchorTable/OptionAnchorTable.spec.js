import React from 'react';
import { shallow } from 'enzyme';

import { OptionAnchorTable } from './OptionAnchorTable';

describe('OptionAnchorTable Component', () => {
  const initialProps = {
    name: '',
    options: [],
    anchorEnabled: false,
    exclusiveEnabed: false,
    randomized: true
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<OptionAnchorTable {...props} />);
    expect(component).toBeDefined();
  });
});
