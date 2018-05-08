import React from 'react';
import { shallow } from 'enzyme';

import { HomeCtnr } from './HomeCtnr';

describe('HomeCtnr Container', () => {
  const initialProps = {
    surveyState: {
      surveys: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<HomeCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
