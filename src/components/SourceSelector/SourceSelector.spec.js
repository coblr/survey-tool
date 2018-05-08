import React from 'react';
import { shallow } from 'enzyme';

import { SourceSelector } from './SourceSelector';

describe('SourceSelector Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveySources: {
      '123': []
    },
    location: {
      host: 'localhost'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SourceSelector {...props} />);
    expect(component).toBeDefined();
  });
});
