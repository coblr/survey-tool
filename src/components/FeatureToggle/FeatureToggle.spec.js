import React from 'react';
import { shallow } from 'enzyme';

import { FeatureToggle } from './FeatureToggle';

describe('FeatureToggle Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<FeatureToggle {...props} />);
    expect(container).toBeDefined();
  });
});
