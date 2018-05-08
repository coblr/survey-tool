import React from 'react';
import { shallow } from 'enzyme';

import { FilterSelector } from './FilterSelector';

describe('FilterSelector Component', () => {
  const initialProps = {
    surveyId: '123',
    surveyFilters: {
      '123': []
    },
    filterMappings: {},
    mappingId: 'realtime',
    currentFilters: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<FilterSelector {...props} />);
    expect(component).toBeDefined();
  });
});
