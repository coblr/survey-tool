import React from 'react';
import { shallow } from 'enzyme';

import { LogoUploader } from './LogoUploader';

describe('LogoUploader Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<LogoUploader {...props} />);
    expect(component).toBeDefined();
  });
});
