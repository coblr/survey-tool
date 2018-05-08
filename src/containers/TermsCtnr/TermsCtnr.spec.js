import React from 'react';
import { shallow } from 'enzyme';

import { TermsCtnr } from './TermsCtnr';

describe('TermsCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<TermsCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
