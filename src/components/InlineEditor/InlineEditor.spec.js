import React from 'react';
import { shallow } from 'enzyme';

import { InlineEditor } from './InlineEditor';

describe('InlineEditor Component', () => {
  const initialProps = {
    editorId: 'awesomeEditor',
    isEditing: {},
    editorErrors: {},
    updatedValues: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<InlineEditor {...props} />);
    expect(component).toBeDefined();
  });
});
