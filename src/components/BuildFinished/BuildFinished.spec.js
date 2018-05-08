import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { BuildFinished } from './BuildFinished';

describe('BuildFinished Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<BuildFinished {...props} />);
    expect(component).toBeDefined();
  });
});
