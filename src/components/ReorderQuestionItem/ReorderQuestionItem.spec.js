import React from 'react';
import { shallow } from 'enzyme';

import { ReorderQuestionItem } from './ReorderQuestionItem';

describe('ReorderQuestionItem Component', () => {
  const initialProps = {
    question: {},
    deleteQuestionAlerts: {},
    deleteQuestionErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ReorderQuestionItem {...props} />);
    expect(component).toBeDefined();
  });
});
