import React from 'react';
import { shallow } from 'enzyme';

import { TextRankingReport } from './TextRankingReport';

describe('TextRankingReport Component', () => {
  const initialProps = {
    question: {
      answers: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<TextRankingReport {...props} />);
    expect(component).toBeDefined();
  });
});
