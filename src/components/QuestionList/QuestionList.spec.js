import React from 'react';
import { shallow } from 'enzyme';

import { QuestionList } from './QuestionList';

describe('QuestionList Component', () => {
  const initialProps = {
    survey: {},
    page: {
      questions: []
    },
    surveyQuestionMap: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionList {...props} />);
    expect(component).toBeDefined();
  });
});
