import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { QuestionSelector } from './QuestionSelector';

describe('QuestionSelector Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionSelector {...props} />);
    expect(component).toBeDefined();
  });
});
