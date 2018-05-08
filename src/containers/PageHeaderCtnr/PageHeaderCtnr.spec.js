import React from 'react';
import { shallow } from 'enzyme';

import { PageHeaderCtnr } from './PageHeaderCtnr';

describe('PageHeaderCtnr Container', () => {
  const initialProps = {
    showingDeleteAlert: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PageHeaderCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
