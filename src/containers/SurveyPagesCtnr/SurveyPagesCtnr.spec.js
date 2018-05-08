import React from 'react';
import { shallow } from 'enzyme';

import { SurveyPagesCtnr } from './SurveyPagesCtnr';

describe('SurveyPagesCtnr Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyPagesCtnr {...props} />);
    expect(component).toBeDefined();
  });
});
