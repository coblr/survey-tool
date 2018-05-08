import React from 'react';
import { shallow } from 'enzyme';

import { QuestionMedia } from './QuestionMedia';

describe('QuestionMedia Component', () => {
  const initialProps = {
    mediaSize: 'original',
    placedImage: {
      image: { id: '123' },
      size: 'MEDIUM'
    },
    uploadingMedia: false,
    uploadMediaError: {},
    setMediaSize: () => {},
    onSubmit: () => {},
    media: {}
  };

  it('renders without crashing', () => {
    const props = initialProps;
    let component = shallow(<QuestionMedia {...props} />);
    expect(component).toBeDefined();
  });
});
