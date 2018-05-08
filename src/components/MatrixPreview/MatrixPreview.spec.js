import React from 'react';
import { shallow } from 'enzyme';

import { MatrixPreview } from './MatrixPreview';

describe('MatrixPreview Component', () => {
  const initialProps = {
    question: {
      columns: [],
      rows: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<MatrixPreview {...props} />);
    expect(component).toBeDefined();
  });
});
