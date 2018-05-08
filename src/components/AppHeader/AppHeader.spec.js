import React from 'react';
import { shallow } from 'enzyme';

import '../../helpers/mocks/localStorage.mock';

import { AppHeader } from './AppHeader';

describe('AppHeader Component', () => {
  const initialProps = {
    title: 'Test App Title',
    showAppActions: false,
    userState: {},
    logout: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<AppHeader {...props} />);
    expect(component).toBeDefined();
  });
});
