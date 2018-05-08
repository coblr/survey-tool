import React from 'react';
import { shallow } from 'enzyme';

import { PromoteInviteCtnr } from './PromoteInviteCtnr';

describe('PromoteInviteCtnr Container', () => {
  const initialProps = {};

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<PromoteInviteCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
