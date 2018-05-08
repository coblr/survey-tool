import React from 'react';
import { shallow } from 'enzyme';

import { FilterSelectorCtnr } from './FilterSelectorCtnr';

describe('FilterSelectorCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<FilterSelectorCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
