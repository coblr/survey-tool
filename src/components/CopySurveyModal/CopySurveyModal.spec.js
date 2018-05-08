import React from 'react';
import { shallow } from 'enzyme';

import { CopySurveyModal } from './CopySurveyModal';

describe('CopySurveyModal Component', () => {
  const initialProps = {
    copyingSurveys: {},
    copySurveyErrors: {},
    title: 'test'
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<CopySurveyModal {...props} />);
    expect(component).toBeDefined();
  });
});
