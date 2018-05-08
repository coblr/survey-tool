import React from 'react';
import { shallow } from 'enzyme';

import { PageHeader } from './PageHeader';

describe('PageHeader Component', () => {
  const initialProps = {
    survey: {
      pages: []
    },
    page: {
      id: 'p123'
    },
    showingDeleteAlert: {},
    deletePageErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PageHeader {...props} />);
    expect(component).toBeDefined();
  });
});
