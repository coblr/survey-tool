import React from 'react';
import { shallow } from 'enzyme';

import { UserSearch } from './UserSearch';

describe('UserSearch Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<UserSearch {...props} />);
    expect(component).toBeDefined();
  });
});
