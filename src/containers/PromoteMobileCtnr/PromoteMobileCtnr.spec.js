import React from 'react';
import { shallow } from 'enzyme';

import { PromoteMobileCtnr } from './PromoteMobileCtnr';

describe('PromoteMobileCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PromoteMobileCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
