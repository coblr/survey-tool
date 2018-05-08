import React from 'react';
import { shallow } from 'enzyme';

import { ReorderPageItem } from './ReorderPageItem';

describe('ReorderPageItem Component', () => {
  const initialProps = {
    page: {},
    deletePageAlerts: {},
    deletePageErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ReorderPageItem {...props} />);
    expect(component).toBeDefined();
  });
});
