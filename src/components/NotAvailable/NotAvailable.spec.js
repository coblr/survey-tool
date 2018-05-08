import React from 'react';
import { shallow } from 'enzyme';

import { NotAvailable } from './NotAvailable';

describe('NotAvailable Component', () => {
  const initialProps = {
    error: {
      status: 403,
      message: 'Something Wrong'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<NotAvailable {...props} />);
    expect(component).toBeDefined();
  });
});
