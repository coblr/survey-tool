import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummaryNav } from './SurveySummaryNav';

describe('SurveySummaryNav Component', () => {
  const initialProps = {
    survey: {
      id: 'test123'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySummaryNav {...props} />);
    expect(component).toBeDefined();
  });
});
