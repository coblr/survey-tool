import React from 'react';
import { shallow } from 'enzyme';

import { PromoteOnline } from './PromoteOnline';

describe('PromoteOnline Component', () => {
  const initialProps = {
    match: { params: { surveyId: '123' } },
    sendingLeads: {},
    sentLeads: {},
    sendLeadErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PromoteOnline {...props} />);
    expect(component).toBeDefined();
  });
});
