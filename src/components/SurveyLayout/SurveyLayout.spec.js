import React from 'react';
import { shallow } from 'enzyme';

import { SurveyLayout } from './SurveyLayout';

describe('SurveyLayout Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {},
    onChange: () => {},
    onSubmit: () => {},
    allowBacktrack: {
      value: false
    },
    footer: {
      value: ''
    },
    engineTitle: {
      value: ''
    },
    logoUrl: 'some/aws/url/',
    updatingSurveys: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyLayout {...props} />);
    expect(component).toBeDefined();
  });
});
