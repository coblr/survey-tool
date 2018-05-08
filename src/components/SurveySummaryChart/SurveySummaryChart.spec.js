import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummaryChart } from './SurveySummaryChart';

describe('SurveySummaryChart Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySummaryChart {...props} />);
    expect(component).toBeDefined();
  });
});
