import React from 'react';
import { shallow } from 'enzyme';

import { AppSubHeaderCtnr } from './AppSubHeaderCtnr';

describe('AppSubHeaderCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<AppSubHeaderCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
