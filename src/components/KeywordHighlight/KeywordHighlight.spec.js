import React from 'react';
import { shallow } from 'enzyme';

import { KeywordHighlight } from './KeywordHighlight';

describe('KeywordHighlight Component', () => {
  const initialProps = {
    children: '',
    regex: /[.]+/,
    highlightClass: 'className'
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<KeywordHighlight {...props} />);
    expect(component).toBeDefined();
  });
});
