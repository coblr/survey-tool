import React from 'react';
import { shallow } from 'enzyme';

import { UploadButton } from './UploadButton';

describe('UploadButton Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<UploadButton {...props} />);
    expect(component).toBeDefined();
  });
});
