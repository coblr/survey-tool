import React from 'react';
import { shallow } from 'enzyme';

import { UserQuickActionsCtnr } from './UserQuickActionsCtnr';

describe('UserQuickActionsCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<UserQuickActionsCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
