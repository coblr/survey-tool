import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import KeywordFilter from './KeywordFilter';

describe('KeywordFilter', () => {
  let props = {};

  it('renders without crashing', () => {
    expect(shallow(<KeywordFilter {...props} />)).toBeDefined();
  });
});
