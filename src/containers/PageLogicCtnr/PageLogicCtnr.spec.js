import React from 'react';
import { shallow } from 'enzyme';

import { PageLogicCtnr } from './PageLogicCtnr';

describe('PageLogicCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PageLogicCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
