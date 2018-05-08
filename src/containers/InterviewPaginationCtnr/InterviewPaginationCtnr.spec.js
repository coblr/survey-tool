import React from 'react';
import { shallow } from 'enzyme';

import { InterviewPaginationCtnr } from './InterviewPaginationCtnr';

describe('InterviewPaginationCtnr Container', () => {
  const initialProps = {
    pagination: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<InterviewPaginationCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
