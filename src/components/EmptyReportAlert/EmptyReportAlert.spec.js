import React from 'react';
import { shallow } from 'enzyme';

import { EmptyReportAlert } from './EmptyReportAlert';

describe('EmptyReportAlert Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<EmptyReportAlert {...props} />);
    expect(component).toBeDefined();
  });
});
