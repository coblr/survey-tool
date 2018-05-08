import React from 'react';
import { shallow } from 'enzyme';

import { SurveyPromote } from './SurveyPromote';

describe('SurveyPromote Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    location: {
      pathname: '/surveys/123/promote'
    },
    surveyMap: {},
    fetchSurveyErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyPromote {...props} />);
    expect(component).toBeDefined();
  });
});
