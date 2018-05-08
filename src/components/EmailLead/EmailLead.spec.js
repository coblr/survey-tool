import React from 'react';
import { shallow } from 'enzyme';

import { EmailLead } from './EmailLead';

describe('EmailLead Component', () => {
  const initialProps = {
    match: { params: { surveyId: '123' } },
    sendingLeads: {},
    sentLeads: {},
    sendLeadErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<EmailLead {...props} />);
    expect(component).toBeDefined();
  });
});
