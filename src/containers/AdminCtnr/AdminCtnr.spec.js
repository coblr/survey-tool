import React from 'react';
import { shallow } from 'enzyme';

import '../../helpers/mocks/localStorage.mock';

import { AdminCtnr } from './AdminCtnr';

describe('AdminCtnr Container', () => {
  localStorage.setItem(
    'user-info',
    JSON.stringify({
      realmAccess: {
        roles: []
      }
    })
  );

  const initialProps = {
    configureLayout: () => {},
    clearOwner: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<AdminCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
