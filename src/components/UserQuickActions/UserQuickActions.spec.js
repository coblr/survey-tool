import React from 'react';
import { shallow } from 'enzyme';

import UserQuickActions from './UserQuickActions';

describe('UserQuickActions', () => {
  let props = {
    firstName: 'Test',
    lastName: 'McTesterson',
    logout: () => {}
  };

  it('renders without crashing', () => {
    expect(shallow(<UserQuickActions {...props} />)).toBeDefined();
  });

  it('should show the user name as First L.', () => {
    const component = shallow(<UserQuickActions {...props} />);
    expect(component.find('.UserQuickActions_toggle').text()).toBe(
      'Test M.'
    );
  });
});
