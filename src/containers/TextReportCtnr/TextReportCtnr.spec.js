import React from 'react';
import { shallow } from 'enzyme';

import { TextReportCtnr } from './TextReportCtnr';

describe('TextReportCtnr Container', () => {
  const initialProps = {
    question: {
      questionId: '123'
    },
    textResponses: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<TextReportCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
