import React from 'react';
import { shallow } from 'enzyme';

import { Toaster } from './Toaster';

describe('Toaster Component', () => {
  const initialProps = {
    notifications: [],
    dismissToaster: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<Toaster {...props} />);
    expect(component).toBeDefined();
  });
});
