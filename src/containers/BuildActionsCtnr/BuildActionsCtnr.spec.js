import React from 'react';
import { shallow } from 'enzyme';

import { BuildActionsCtnr } from './BuildActionsCtnr';

describe('BuildActionsCtnr Container', () => {
  const initialProps = {
    surveyId: '123',
    surveyMap: {
      '123': {}
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<BuildActionsCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
