import React from 'react';
import { shallow } from 'enzyme';

import { ModalDialogHeader } from './ModalDialogHeader';

describe('ModalDialogHeader Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ModalDialogHeader {...props} />);
    expect(component).toBeDefined();
  });
});
