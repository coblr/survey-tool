import React from 'react';
import { shallow } from 'enzyme';

import { TerminatePage } from './TerminatePage';

describe('TerminatePage Component', () => {
  const initialProps = {
    survey: {
      terminateConclusion: {}
    },
    page: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<TerminatePage {...props} />);
    expect(component).toBeDefined();
  });
});
