import React from 'react';
import { shallow } from 'enzyme';

import { SurveyBuilderCtnr } from './SurveyBuilderCtnr';

describe('SurveyBuilderCtnr Container', () => {
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
    let container = shallow(<SurveyBuilderCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
