import React from 'react';
import { shallow } from 'enzyme';

import { SurveyQuestionReport } from './SurveyQuestionReport';

describe('SurveyQuestionReport Component', () => {
  const initialProps = {
    question: {
      id: '123',
      text: 'Question 1',
      type: 'SINGLE_SELECT_LIST',
      answers: []
    },
    deleteQuestion: () => {},
    chartMap: {
      '123': []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyQuestionReport {...props} />);
    expect(component).toBeDefined();
  });
});
