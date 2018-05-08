import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummaryControls } from './SurveySummaryControls';

describe('SurveySummaryControls Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySummaryControls {...props} />);
    expect(component).toBeDefined();
  });
});
