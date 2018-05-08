import React from 'react';
import { shallow } from 'enzyme';

import { FileUploaderCtnr } from './FileUploaderCtnr';

describe('FileUploaderCtnr Container', () => {
  const initialProps = {
    uploads: {},
    enqueued: {},
    uploading: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<FileUploaderCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
