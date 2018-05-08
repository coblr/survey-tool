import React from 'react';
import { shallow } from 'enzyme';

import { ToasterCtnr } from './ToasterCtnr';

describe('ToasterCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<ToasterCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
