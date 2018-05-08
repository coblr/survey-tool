import React from 'react';
import { shallow } from 'enzyme';

import { PageFooter } from './PageFooter';

describe('PageFooter Component', () => {
  const initialProps = {
    summary: {},
    page: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PageFooter {...props} />);
    expect(component).toBeDefined();
  });
});
