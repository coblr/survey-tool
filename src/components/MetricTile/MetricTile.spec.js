import React from 'react';
import { shallow } from 'enzyme';

import { MetricTile } from './MetricTile';

describe('MetricTile Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<MetricTile {...props} />);
    expect(component).toBeDefined();
  });
});
