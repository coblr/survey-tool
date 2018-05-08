import React from 'react';
import { shallow } from 'enzyme';

import { QuestionTypeList } from './QuestionTypeList';

describe('QuestionTypeList Component', () => {
  const initialProps = {
    className: '',
    listTitle: '',
    listType: '',
    showPreview: () => {},
    clearPreview: () => {},
    onSelect: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionTypeList {...props} />);
    expect(component).toBeDefined();
  });
});
