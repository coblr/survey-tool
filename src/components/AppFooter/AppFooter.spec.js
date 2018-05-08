import React from 'react';
import { shallow } from 'enzyme';

import AppFooter from './AppFooter';

describe('AppFooter Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<AppFooter {...props} />);
    expect(component).toBeDefined();
  });
});
