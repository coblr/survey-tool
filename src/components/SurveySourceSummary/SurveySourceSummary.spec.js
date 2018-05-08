import React from 'react';
import { shallow } from 'enzyme';

import { SurveySourceSummary } from './SurveySourceSummary';

describe('SurveySourceSummary Component', () => {
  const initialProps = {
    data: []
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySourceSummary {...props} />);
    expect(component).toBeDefined();
  });
});
