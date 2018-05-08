import React from 'react';
import { shallow } from 'enzyme';

import { SurveyPreviewBtn } from './SurveyPreviewBtn';

describe('SurveyPreviewBtn Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyPreviewBtn {...props} />);
    expect(component).toBeDefined();
  });
});
