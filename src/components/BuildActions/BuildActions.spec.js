import React from 'react';
import { shallow } from 'enzyme';

import { BuildActions } from './BuildActions';

describe('BuildActions Component', () => {
  const initialProps = {
    survey: {
      id: '123'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<BuildActions {...props} />);
    expect(component).toBeDefined();
  });
});
