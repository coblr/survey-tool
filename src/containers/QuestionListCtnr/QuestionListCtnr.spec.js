import React from 'react';
import { shallow } from 'enzyme';

import { QuestionListCtnr } from './QuestionListCtnr';

describe('QuestionListCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<QuestionListCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
