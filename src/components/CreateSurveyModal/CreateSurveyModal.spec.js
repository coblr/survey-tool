import React from 'react';
import { shallow } from 'enzyme';

import { CreateSurveyModal } from './CreateSurveyModal';

describe('CreateSurveyModal Component', () => {
  const initialProps = {
    creatingSurvey: false,
    createSurveyError: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<CreateSurveyModal {...props} />);
    expect(component).toBeDefined();
  });
});
