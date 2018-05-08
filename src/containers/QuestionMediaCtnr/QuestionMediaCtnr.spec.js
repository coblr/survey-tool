import React from 'react';
import { shallow } from 'enzyme';

import { QuestionMediaCtnr } from './QuestionMediaCtnr';

describe('QuestionMediaCtnr Container', () => {
  const initialProps = {
    question: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<QuestionMediaCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
