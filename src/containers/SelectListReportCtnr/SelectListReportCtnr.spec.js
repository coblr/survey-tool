import React from 'react';
import { shallow } from 'enzyme';

import { SelectListReportCtnr } from './SelectListReportCtnr';

describe('SelectListReportCtnr Container', () => {
  const initialProps = {
    question: {
      questionId: '123'
    },
    textResponses: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<SelectListReportCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
