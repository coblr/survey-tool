import React from 'react';
import { shallow } from 'enzyme';

import { SurveyReportFilter } from './SurveyReportFilter';

describe('SurveyReportFilter Component', () => {
  const initialProps = {
    currentFilter: {
      id: '123',
      statuses: []
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyReportFilter {...props} />);
    expect(component).toBeDefined();
  });
});
