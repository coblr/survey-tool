import React from 'react';
import { shallow } from 'enzyme';

import '../../helpers/mocks/localStorage.mock';

import { PromoteNav } from './PromoteNav';

describe('PromoteNav Component', () => {
  const initialProps = {
    survey: {
      id: '123'
    },
    location: {
      pathname: ''
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PromoteNav {...props} />);
    expect(component).toBeDefined();
  });
});
