import React from 'react';
import { shallow } from 'enzyme';

import { NotFoundCtnr } from './NotFoundCtnr';

describe('NotFoundCtnr Container', () => {
  const initialProps = {
    configureLayout: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<NotFoundCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
