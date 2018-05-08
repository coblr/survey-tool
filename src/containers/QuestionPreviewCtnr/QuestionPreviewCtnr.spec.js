import React from 'react';
import { shallow } from 'enzyme';

import { QuestionPreviewCtnr } from './QuestionPreviewCtnr';

describe('QuestionPreviewCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<QuestionPreviewCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
