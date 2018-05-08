import React from 'react';
import { shallow } from 'enzyme';

import { CreateFilterModalCtnr } from './CreateFilterModalCtnr';

describe('CreateFilterModalCtnr Container', () => {
  const initialProps = {
    surveyId: '123',
    creatingFilters: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<CreateFilterModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
