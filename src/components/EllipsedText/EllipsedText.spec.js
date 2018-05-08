import React from 'react';
import { shallow } from 'enzyme';

import { EllipsedText } from './EllipsedText';

describe('EllipsedText Component', () => {
  const initialProps = {
    length: '42',
    children: 'testText'
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<EllipsedText {...props} />);
    expect(component).toBeDefined();
  });
});
