import React from 'react';
import { shallow } from 'enzyme';

import { SurveyPromoteCtnr } from './SurveyPromoteCtnr';

describe('SurveyPromoteCtnr Container', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {},
    fetchSurveyErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<SurveyPromoteCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
