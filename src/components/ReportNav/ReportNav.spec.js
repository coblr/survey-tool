import React from 'react';
import { shallow } from 'enzyme';

import { ReportNav } from './ReportNav';

describe('ReportNav Component', () => {
  const initialProps = {
    location: {
      pathname: '/surveys/123/reports'
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ReportNav {...props} />);
    expect(component).toBeDefined();
  });
});
