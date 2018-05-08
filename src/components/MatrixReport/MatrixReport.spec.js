import React from 'react';
import { shallow } from 'enzyme';

import { MatrixReport } from './MatrixReport';

describe('MatrixReport Component', () => {
  const initialProps = {
    question: {
      responseCount: 0,
      rows: [
        {
          columns: [
            {
              text: 'ColA',
              count: 1
            }
          ]
        }
      ]
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<MatrixReport {...props} />);
    expect(component).toBeDefined();
  });
});
