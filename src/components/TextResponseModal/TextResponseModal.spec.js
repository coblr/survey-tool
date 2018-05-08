import React from 'react';
import { shallow } from 'enzyme';

import { TextResponseModal } from './TextResponseModal';

describe('TextResponseModal Component', () => {
  const initialProps = {
    question: {
      questionId: '123',
      text: 'test question'
    },
    answer: {
      id: 'a123',
      text: 'answer text'
    },
    textResponses: {
      '123': [
        {
          text: 'blah blah blah',
          id: 'fr123'
        }
      ]
    },
    textResponsePagination: {
      a123: {}
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<TextResponseModal {...props} />);
    expect(component).toBeDefined();
  });
});
