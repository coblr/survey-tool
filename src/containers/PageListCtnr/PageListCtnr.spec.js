import React from 'react';
import { shallow } from 'enzyme';

import { PageListCtnr } from './PageListCtnr';

describe('PageListCtnr Container', () => {
  const initialProps = {
    surveyPageMap: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PageListCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
