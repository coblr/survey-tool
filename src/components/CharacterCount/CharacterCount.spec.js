import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import CharacterCount from './CharacterCount';

describe('CharacterCount', () => {
  let props = {
    input: 'test',
    limit: 100
  };

  it('renders without crashing', () => {
    expect(shallow(<CharacterCount {...props} />)).toBeDefined();
  });

  it('renders the number of characters remaining when < limit', () => {
    const component = shallow(<CharacterCount {...props} />);
    expect(component.find('span').text()).toBe(
      '96 characters remaining.'
    );
  });

  it('renders the number of characters over when > limit', () => {
    props.input = 'longtext';
    props.limit = 4;

    const component = shallow(<CharacterCount {...props} />);
    expect(component.find('span').text()).toBe(
      'Too long by 4 characters.'
    );
  });
});
