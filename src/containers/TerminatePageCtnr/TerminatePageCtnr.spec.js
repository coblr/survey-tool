import React from 'react';
import { shallow } from 'enzyme';

import { TerminatePageCtnr } from './TerminatePageCtnr';

describe('TerminatePageCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<TerminatePageCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
