import React from 'react';
import { shallow } from 'enzyme';

import { UserSearchCtnr } from './UserSearchCtnr';

describe('UserSearchCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<UserSearchCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
