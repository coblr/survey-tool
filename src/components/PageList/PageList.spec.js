import React from 'react';
import { shallow } from 'enzyme';

import { PageList } from './PageList';

describe('PageList Component', () => {
  const initialProps = {
    survey: {
      id: '123',
      pages: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PageList {...props} />);
    expect(component).toBeDefined();
  });
});
