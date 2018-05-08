import React from 'react';
import { shallow } from 'enzyme';

import UploadPreview from './UploadPreview';

describe('UploadPreview Component', () => {
  const initialProps = {
    width: 100,
    height: 100,
    enqueued: true,
    src: ''
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<UploadPreview {...props} />);
    expect(component).toBeDefined();
  });
});
