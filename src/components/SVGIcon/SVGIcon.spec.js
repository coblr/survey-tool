import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { SVGIcon } from './SVGIcon';

describe('SVGIcon Component', () => {
  const initialProps = {
    iconId: 'test-lg'
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SVGIcon {...props} />);
    expect(component).toBeDefined();
  });
});
