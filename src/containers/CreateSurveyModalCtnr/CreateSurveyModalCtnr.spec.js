import React from 'react';
import { shallow } from 'enzyme';

import { CreateSurveyModalCtnr } from './CreateSurveyModalCtnr';

describe('CreateSurveyModalCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<CreateSurveyModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
