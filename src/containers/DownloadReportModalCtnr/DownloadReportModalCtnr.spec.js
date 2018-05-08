import React from 'react';
import { shallow } from 'enzyme';

import { DownloadReportModalCtnr } from './DownloadReportModalCtnr';

describe('DownloadReportModalCtnr Container', () => {
  const initialProps = {
    setDownloadParam: () => {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let container = shallow(<DownloadReportModalCtnr {...props} />);
    expect(container).toBeDefined();
  });
});
