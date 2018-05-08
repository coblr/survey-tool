import React from 'react';
import { shallow } from 'enzyme';

import { StickyContent } from './StickyContent';

describe('StickyContent Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<StickyContent {...props} />);
    expect(component).toBeDefined();
  });
});
