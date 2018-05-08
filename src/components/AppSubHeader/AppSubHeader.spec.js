import React from 'react';
import { shallow } from 'enzyme';

import { AppSubHeader } from './AppSubHeader';

describe('AppSubHeader Component', () => {
  const initialProps = {
    globalState: {
      appSubHeaderIcon: '',
      appSubHeaderTitle: '',
      showAppSubHeaderBtn: false
    },
    openCreateSurveyModal: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<AppSubHeader {...props} />);
    expect(component).toBeDefined();
  });
});
