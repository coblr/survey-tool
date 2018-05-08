import React from 'react';
import { shallow } from 'enzyme';

import { UploadForm } from './UploadForm';

describe('UploadForm Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<UploadForm {...props} />);
    expect(component).toBeDefined();
  });
});
