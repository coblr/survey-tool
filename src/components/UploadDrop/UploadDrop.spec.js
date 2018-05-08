import React from 'react';
import { shallow } from 'enzyme';

import { UploadDrop } from './UploadDrop';

describe('UploadDrop Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<UploadDrop {...props} />);
    expect(component).toBeDefined();
  });
});
