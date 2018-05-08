import React from 'react';
import { shallow } from 'enzyme';

import { SelectListReport } from './SelectListReport';

describe('SelectListReport Component', () => {
  const initialProps = {
    question: {
      answers: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SelectListReport {...props} />);
    expect(component).toBeDefined();
  });
});
