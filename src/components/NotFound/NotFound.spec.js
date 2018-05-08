import React from 'react';
import { shallow } from 'enzyme';

import { NotFound } from './NotFound';

describe('NotFound Component', () => {
  const initialProps = {
    showAppActions: () => {},
    showPageHeader: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<NotFound {...props} />);
    expect(component).toBeDefined();
  });
});
