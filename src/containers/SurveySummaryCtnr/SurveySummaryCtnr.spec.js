import React from 'react';
import { shallow } from 'enzyme';

import { SurveySummaryCtnr } from './SurveySummaryCtnr';

describe('SurveySummaryCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<SurveySummaryCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
