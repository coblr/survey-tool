import React from 'react';
import { shallow } from 'enzyme';

import { PageLogic } from './PageLogic';

describe('PageLogic Component', () => {
  const initialProps = {
    survey: {
      pages: []
    },
    page: {
      id: 'p123'
    },
    surveyPageMap: {},
    surveyQuestionMap: {},
    isEditing: {},
    pageLogic: {
      p123: {
        branchStatements: []
      }
    }
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<PageLogic {...props} />);
    expect(component).toBeDefined();
  });
});
