import React from 'react';
import { shallow } from 'enzyme';

import { SourceDashboard } from './SourceDashboard';

describe('SourceDashboard Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveySources: {},
    responseSources: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SourceDashboard {...props} />);
    expect(component).toBeDefined();
  });
});
