import React from 'react';
import { shallow } from 'enzyme';

import { InlineEditorCtnr } from './InlineEditorCtnr';

describe('InlineEditorCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<InlineEditorCtnr {...props} />);
    expect(component).toBeDefined();
  });
});
