import React from 'react';
import { shallow } from 'enzyme';

import { PromoteSample } from './PromoteSample';

describe('PromoteSample Component', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {
      '123': {
        title: 'test title'
      }
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PromoteSample {...props} />);
    expect(component).toBeDefined();
  });
});
