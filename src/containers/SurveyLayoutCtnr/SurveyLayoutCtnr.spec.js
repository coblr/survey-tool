import React from 'react';
import { shallow } from 'enzyme';

import { SurveyLayoutCtnr } from './SurveyLayoutCtnr';

describe('SurveyLayoutCtnr Container', () => {
  const initialProps = {
    match: { params: { surveyId: '123' } },
    surveyMap: {},
    updateSurvey: () => {},
    uploads: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<SurveyLayoutCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
