import React from 'react';
import { shallow } from 'enzyme';

import { QuestionActionNav } from './QuestionActionNav';

describe('QuestionActionNav Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionActionNav {...props} />);
    expect(component).toBeDefined();
  });
});
