import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { DropDownList } from './DropDownList';

describe('DropDownList Component', () => {
  const initialProps = {
    question: {
      answers: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<DropDownList {...props} />);
    expect(component).toBeDefined();
  });
});
