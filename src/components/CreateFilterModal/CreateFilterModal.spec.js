import React from 'react';
import { shallow } from 'enzyme';

import { CreateFilterModal } from './CreateFilterModal';

describe('CreateFilterModal Component', () => {
  const initialProps = {
    creatingFilters: {},
    surveyId: 's123'
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<CreateFilterModal {...props} />);
    expect(component).toBeDefined();
  });
});
