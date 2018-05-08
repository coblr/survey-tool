import React from 'react';
import { shallow } from 'enzyme';

import { ReportWrapper } from './ReportWrapper';

describe('ReportWrapper Component', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ReportWrapper {...props} />);
    expect(component).toBeDefined();
  });
});
