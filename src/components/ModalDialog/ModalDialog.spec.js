import React from 'react';
import { shallow } from 'enzyme';

import { ModalDialog } from './ModalDialog';

describe('ModalDialog Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ModalDialog {...props} />);
    expect(component).toBeDefined();
  });
});
