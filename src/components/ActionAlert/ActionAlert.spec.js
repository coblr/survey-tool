import React from 'react';
import { shallow } from 'enzyme';

import { ActionAlert } from './ActionAlert';

describe('ActionAlert Component', () => {
  const initialProps = {
    className: '',
    children: '',
    dismissLabel: '',
    confirmLabel: '',
    dismissAction: () => {},
    confirmAction: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ActionAlert {...props} />);
    expect(component).toBeDefined();
  });
});
