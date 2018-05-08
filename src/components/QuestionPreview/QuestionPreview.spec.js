import React from 'react';
import { shallow } from 'enzyme';

import '../../helpers/mocks/localStorage.mock';

import { QuestionPreview } from './QuestionPreview';

describe('QuestionPreview Component', () => {
  const initialProps = {
    survey: {
      pages: []
    },
    page: {
      questions: []
    },
    question: {
      id: '098',
      text: 'Question 1',
      type: 'SINGLE_SELECT_LIST',
      answers: []
    },
    deleteQuestion: () => {},
    collapsedQuestions: {},
    deleteQuestionErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionPreview {...props} />);
    expect(component).toBeDefined();
  });
});
