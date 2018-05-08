import React from 'react';
import { shallow } from 'enzyme';

import { CopySurveyModalCtnr } from './CopySurveyModalCtnr';

describe('CopySurveyModalCtnr Container', () => {
  const initialProps = {
    copyingSurveys: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<CopySurveyModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
