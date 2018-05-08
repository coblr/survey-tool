import React from 'react';
import { shallow } from 'enzyme';

import { ReorderForm } from './ReorderForm';

describe('ReorderForm Component', () => {
  const initialProps = {
    match: { params: { surveyId: 123 } },
    surveyMap: {},
    surveyPageMap: {},
    surveyQuestionMap: {},
    reorderQuestionErrors: {},
    moveQuestionErrors: {},
    pageOrder: [],
    reorderPageErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ReorderForm {...props} />);
    expect(component).toBeDefined();
  });
});
