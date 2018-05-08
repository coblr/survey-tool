import React from 'react';
import { shallow } from 'enzyme';

import { QuestionDivider } from './QuestionDivider';

describe('QuestionDivider Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionDivider {...props} />);
    expect(component).toBeDefined();
  });
});
