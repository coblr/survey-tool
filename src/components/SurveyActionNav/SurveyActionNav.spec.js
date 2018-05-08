import React from 'react';
import { shallow } from 'enzyme';

import { SurveyActionNav } from './SurveyActionNav';

describe('SurveyActionNav Component', () => {
  const initialProps = {
    survey: {
      projectInfo: {}
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyActionNav {...props} />);
    expect(component).toBeDefined();
  });
});
