import React from 'react';
import { shallow } from 'enzyme';

import { Reorder } from './Reorder';

describe('Reorder Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<Reorder {...props} />);
    expect(component).toBeDefined();
  });
});
