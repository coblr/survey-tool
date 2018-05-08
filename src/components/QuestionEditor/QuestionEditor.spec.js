import React from 'react';
import { shallow } from 'enzyme';

import { QuestionEditor } from './QuestionEditor';

describe('QuestionEditor Component', () => {
  const initialProps = {
    survey: {
      pages: []
    },
    page: {
      questions: []
    },
    question: {
      id: 'q123'
    },
    updateQuestionErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionEditor {...props} />);
    expect(component).toBeDefined();
  });
});
