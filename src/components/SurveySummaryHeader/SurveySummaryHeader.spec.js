import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummaryHeader } from './SurveySummaryHeader';

describe('SurveySummaryHeader Component', () => {
  const initialProps = {
    survey: {
      title: 'test123'
    },
    surveyState: {
      updatingSurveys: {}
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySummaryHeader {...props} />);
    expect(component).toBeDefined();
  });
});
