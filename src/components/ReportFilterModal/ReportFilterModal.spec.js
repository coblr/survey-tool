import React from 'react';
import { shallow } from 'enzyme';

import { ReportFilterModal } from './ReportFilterModal';

describe('ReportFilterModal Component', () => {
  const initialProps = {
    filter: {
      statuses: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ReportFilterModal {...props} />);
    expect(component).toBeDefined();
  });
});
