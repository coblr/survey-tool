import React from 'react';
import { shallow } from 'enzyme';

import { QuestionEditorCtnr } from './QuestionEditorCtnr';

describe('QuestionEditorCtnr Container', () => {
  const initialProps = {
    survey: {
      pages: []
    },
    page: {
      questions: []
    },
    question: {
      id: '123'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<QuestionEditorCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
