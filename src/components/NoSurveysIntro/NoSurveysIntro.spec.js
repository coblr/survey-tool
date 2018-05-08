import React from 'react';
import { shallow } from 'enzyme';

import NoSurveysIntro from './NoSurveysIntro';

describe('NoSurveysIntro', () => {
  let props = {
    openCreateSurveyModal: () => {}
  };

  it('renders without crashing', () => {
    expect(shallow(<NoSurveysIntro {...props} />)).toBeDefined();
  });
});
