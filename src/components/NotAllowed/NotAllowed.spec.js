import React from 'react';
import { shallow } from 'enzyme';

import { NotAllowed } from './NotAllowed';

describe('NotAllowed Component', () => {
  const initialProps = {
    showAppActions: () => {},
    showPageHeader: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<NotAllowed {...props} />);
    expect(component).toBeDefined();
  });
});
