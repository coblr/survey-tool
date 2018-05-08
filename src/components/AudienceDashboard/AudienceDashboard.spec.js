import React from 'react';
import { shallow } from 'enzyme';

import { AudienceDashboard } from './AudienceDashboard';

describe('AudienceDashboard Component', () => {
  const initialProps = {
    survey: {
      projectInfo: {}
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<AudienceDashboard {...props} />);
    expect(component).toBeDefined();
  });
});
