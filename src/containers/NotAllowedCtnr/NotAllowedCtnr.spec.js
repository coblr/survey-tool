import React from 'react';
import { shallow } from 'enzyme';

import { NotAllowedCtnr } from './NotAllowedCtnr';

describe('NotAllowedCtnr Container', () => {
  const initialProps = {
    configureLayout: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<NotAllowedCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
