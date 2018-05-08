import React from 'react';
import { shallow } from 'enzyme';

import { SurveySettings } from './SurveySettings';

describe('SurveySettings Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {},
    onChange: () => {},
    onSubmit: () => {},
    allowMultipleFinishes: {
      value: false
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveySettings {...props} />);
    expect(component).toBeDefined();
  });
});
