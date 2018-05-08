import React from 'react';
import { shallow } from 'enzyme';

import { TextReport } from './TextReport';

describe('TextReport Component', () => {
  const initialProps = {
    question: {
      questionId: '123',
      counts: [
        {
          answer: {}
        }
      ]
    },
    textResponses: {
      '123': []
    },
    recentTextResponses: {
      a123: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<TextReport {...props} />);
    expect(component).toBeDefined();
  });
});
