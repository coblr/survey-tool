import React from 'react';
import { shallow } from 'enzyme';

import { QuestionOptionModalCtnr } from './QuestionOptionModalCtnr';

describe('QuestionOptionModalCtnr Container', () => {
  const initialProps = {
    question: {
      mandatory: false,
      required: false,
      answers: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<QuestionOptionModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
