import React from 'react';
import { shallow } from 'enzyme';

import { Paginator } from './Paginator';

describe('Paginator Component', () => {
  const initialProps = {
    config: {
      first: 1,
      last: 1,
      number: 1,
      numberOfElements: 1,
      size: 1,
      totalElements: 1,
      totalPages: 1
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<Paginator {...props} />);
    expect(component).toBeDefined();
  });
});
