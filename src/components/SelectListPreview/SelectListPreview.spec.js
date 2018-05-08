import React from 'react';
import { shallow } from 'enzyme';

import { SelectListPreview } from './SelectListPreview';

describe('SelectListPreview Component', () => {
  const initialProps = {
    question: {
      answers: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SelectListPreview {...props} />);
    expect(component).toBeDefined();
  });
});
