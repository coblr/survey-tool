import React from 'react';
import { shallow } from 'enzyme';

import { DownloadReportModal } from './DownloadReportModal';

describe('DownloadReportModal Component', () => {
  const initialProps = {
    downloadParams: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<DownloadReportModal {...props} />);
    expect(component).toBeDefined();
  });
});
