import React from 'react';
import { shallow } from 'enzyme';

import { ResponseSummary } from './ResponseSummary';

describe('ResponseSummary Component', () => {
  const initialProps = {
    data: []
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ResponseSummary {...props} />);
    expect(component).toBeDefined();
  });
});
