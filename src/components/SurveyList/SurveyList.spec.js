import React from 'react';
import { shallow } from 'enzyme';

import { SurveyList } from './SurveyList';

describe('SurveyList Component', () => {
  const initialProps = {
    surveys: [],
    currentSurvey: {},
    filteredSurveys: [],
    filterKeywordRegex: /^[^.]+$/,
    onSelectSurvey: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<SurveyList {...props} />);
    expect(component).toBeDefined();
  });
});
