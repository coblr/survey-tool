import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummaryMetrics } from './SurveySummaryMetrics';

describe('SurveySummaryMetrics Component', () => {
  const initialProps = {
    metrics: {
      started: 10,
      completed: 8
    },
    survey: {
      projectInfo: {
        audienceIds: []
      }
    },
    audienceStatus: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySummaryMetrics {...props} />);
    expect(component).toBeDefined();
  });
});
