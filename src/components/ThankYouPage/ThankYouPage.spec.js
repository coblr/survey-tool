import React from 'react';
import { shallow } from 'enzyme';

import { ThankYouPage } from './ThankYouPage';

describe('ThankYouPage Component', () => {
  const initialProps = {
    survey: {
      thankYouConclusion: {}
    },
    page: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<ThankYouPage {...props} />);
    expect(component).toBeDefined();
  });
});
