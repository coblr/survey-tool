import React from 'react';
import { shallow } from 'enzyme';

import { App } from './App';

describe('App Component', () => {
  const initialProps = {
    match: { params: { surveyId: '123' } },
    realmAccess: {
      roles: []
    },
    keycloak: {
      authenticated: true
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<App {...props} />);
    expect(component).toBeDefined();
  });
});
