import React from 'react';
import { shallow } from 'enzyme';

import { LogoUploaderCtnr } from './LogoUploaderCtnr';

describe('LogoUploaderCtnr Container', () => {
  const initialProps = {
    logo: '',
    uploadingLogo: false
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<LogoUploaderCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
