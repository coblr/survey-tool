import React from 'react';
import { shallow } from 'enzyme';

import { PromoteMobile } from './PromoteMobile';

describe('PromoteMobile Component', () => {
  const initialProps = {
    match: { params: { surveyId: '123' } },
    sendingLeads: {},
    sentLeads: {},
    sendLeadErrors: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PromoteMobile {...props} />);
    expect(component).toBeDefined();
  });
});
