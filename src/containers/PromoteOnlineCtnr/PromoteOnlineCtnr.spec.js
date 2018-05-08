import React from 'react';
import { shallow } from 'enzyme';

import { PromoteOnlineCtnr } from './PromoteOnlineCtnr';

describe('PromoteOnlineCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PromoteOnlineCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
