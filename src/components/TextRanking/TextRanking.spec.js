import React from 'react';
import { shallow } from 'enzyme';

import { TextRanking } from './TextRanking';

describe('TextRanking Component', () => {
  const initialProps = {
    question: {
      answers: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<TextRanking {...props} />);
    expect(component).toBeDefined();
  });
});
