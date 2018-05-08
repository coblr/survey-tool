import React from 'react';
import { shallow } from 'enzyme';

import { TextResponseModalCtnr } from './TextResponseModalCtnr';

describe('TextResponseModalCtnr Container', () => {
  const initialProps = {
    isOpen: false,
    question: {
      questionId: '123',
      text: 'test'
    },
    answer: {
      id: 'a123',
      text: 'ans test'
    },
    textResponses: {
      '123': []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<TextResponseModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
