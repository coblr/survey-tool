import React from 'react';
import { shallow } from 'enzyme';

import { QuestionOptionModal } from './QuestionOptionModal';

describe('QuestionOptionModal Component', () => {
  const initialProps = {
    question: {
      id: '123',
      type: 'SINGLE_SELECT_LIST'
    },
    updatingQuestions: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionOptionModal {...props} />);
    expect(component).toBeDefined();
  });
});
