import React from 'react';
import { shallow } from 'enzyme';

import { ChartSelector } from './ChartSelector';

describe('ChartSelector Component', () => {
  const initialProps = {
    supportedCharts: ['table', 'bar', 'pie']
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ChartSelector {...props} />);
    expect(component).toBeDefined();
  });
});
