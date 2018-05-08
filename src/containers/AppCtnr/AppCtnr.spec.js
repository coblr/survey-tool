import React from 'react';
import { shallow } from 'enzyme';

import '../../helpers/mocks/localStorage.mock';

import { AppCtnr } from './AppCtnr';

describe('AppCtnr Container', () => {
  const initialProps = {
    keycloak: {
      init: () => {},
      updateToken: () => {},
      token: '',
      idTokenParsed: {
        preferred_username: 'test_script'
      }
    },
    hydrateUser: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<AppCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
