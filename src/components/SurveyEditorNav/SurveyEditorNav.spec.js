import React from 'react';
import { shallow } from 'enzyme';

import { SurveyEditorNav } from './SurveyEditorNav';

describe('SurveyEditorNav Component', () => {
  const initialProps = {
    surveyId: '123',
    location: {
      pathname: '/surveys/123/build'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyEditorNav {...props} />);
    expect(component).toBeDefined();
  });
});
