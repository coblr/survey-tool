import React from 'react';
import { shallow } from 'enzyme';

import { Throbber } from './Throbber';

describe('Throbber Component', () => {
  const initialProps = {
    text: '',
    textOnly: false
  };

  it('renders without crashing', () => {
    const props = initialProps;
    const component = shallow(<Throbber {...props} />);
    expect(component).toBeDefined();
  });

  it('renders just the icon by default', () => {
    const component = shallow(<Throbber />);
    expect(component.find('.Throbber_icon').length).toBe(1);
    expect(component.find('.Throbber_text').length).toBe(0);
  });

  it('renders the icon and text when text is provided', () => {
    const props = { text: 'test' };
    const component = shallow(<Throbber {...props} />);
    expect(component.find('.Throbber_icon').length).toBe(1);
    expect(component.find('.Throbber_text').length).toBe(1);
  });

  it('renders text only, when specified', () => {
    const props = {
      text: 'Only The Lonely',
      textOnly: true
    };
    const component = shallow(<Throbber {...props} />);
    expect(component.find('.Throbber_icon').length).toBe(0);
    expect(component.find('.Throbber_text').length).toBe(1);
    expect(component.find('.Throbber_text').text()).toBe(
      'Only The Lonely'
    );
  });

  it('adds `--show` classes to all elements when showing', () => {
    const props = {
      show: true,
      text: 'test'
    };
    const component = shallow(<Throbber {...props} />);
    expect(component.find('.Throbber--show').length).toBe(1);
    expect(component.find('.Throbber_icon--show').length).toBe(1);
    expect(component.find('.Throbber_text--show').length).toBe(1);
  });
});
