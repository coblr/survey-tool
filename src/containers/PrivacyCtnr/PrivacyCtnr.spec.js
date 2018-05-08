import React from 'react';
import { shallow } from 'enzyme';

import { PrivacyCtnr } from './PrivacyCtnr';

describe('PrivacyCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PrivacyCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
