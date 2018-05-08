import React from 'react';
import { shallow } from 'enzyme';

import { ThankYouPageCtnr } from './ThankYouPageCtnr';

describe('ThankYouPageCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<ThankYouPageCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
