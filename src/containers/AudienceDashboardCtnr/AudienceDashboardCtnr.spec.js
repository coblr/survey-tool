import React from 'react';
import { shallow } from 'enzyme';

import { AudienceDashboardCtnr } from './AudienceDashboardCtnr';

describe('AudienceDashboardCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<AudienceDashboardCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
