import React from 'react';
import { shallow } from 'enzyme';

import { ReorderCtnr } from './ReorderCtnr';

describe('ReorderCtnr Container', () => {
  const initialProps = {
    match: {
      params: {
        surveyId: '123'
      }
    },
    surveyMap: {},
    surveyPageMap: {},
    updatePageOrder: () => {},
    updateQuestionOrder: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<ReorderCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
