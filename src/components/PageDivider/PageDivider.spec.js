import React from 'react';
import { shallow } from 'enzyme';

import { PageDivider } from './PageDivider';

describe('PageDivider Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PageDivider {...props} />);
    expect(component).toBeDefined();
  });
});
