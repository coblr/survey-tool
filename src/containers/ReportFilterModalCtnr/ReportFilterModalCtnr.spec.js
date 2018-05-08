import React from 'react';
import { shallow } from 'enzyme';

import { ReportFilterModalCtnr } from './ReportFilterModalCtnr';

describe('ReportFilterModalCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<ReportFilterModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
