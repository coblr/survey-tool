import React from 'react';
import { shallow } from 'enzyme';

import { ModalDialogFooter } from './ModalDialogFooter';

describe('ModalDialogFooter Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ModalDialogFooter {...props} />);
    expect(component).toBeDefined();
  });
});
