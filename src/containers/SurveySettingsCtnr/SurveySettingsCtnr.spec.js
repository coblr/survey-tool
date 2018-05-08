import React from 'react';
import { shallow } from 'enzyme';

import { SurveySettingsCtnr } from './SurveySettingsCtnr';

describe('SurveySettingsCtnr Container', () => {
  const initialProps = {
    match: { params: { surveyId: '123' } },
    surveyMap: {},
    updateSurvey: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<SurveySettingsCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
