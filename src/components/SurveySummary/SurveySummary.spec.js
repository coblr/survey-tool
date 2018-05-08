import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummary } from './SurveySummary';

describe('SurveySummary Component', () => {
  const initialProps = {
    reportState: {
      fetching: false,
      surveySummary: {
        totals: {}
      }
    },
    surveyId: '123',
    surveyMap: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySummary {...props} />);
    expect(component).toBeDefined();
  });
});
