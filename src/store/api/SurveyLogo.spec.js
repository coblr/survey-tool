import { fromJS } from 'immutable';

import '../../helpers/mocks/URL.mock';

import reducer, * as actions from './SurveyLogo';

describe('SurveyLogo Duck', () => {
  it('sets a flag when the logo starts to upload', () => {
    const state = fromJS({
      uploadingLogo: false
    });
    const action = {
      type: actions.UPLOAD_LOGO_REQUEST
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        uploadingLogo: true
      })
    );
  });

  it('saves the upload response and removes the upload flag', () => {
    const state = fromJS({
      uploadingLogo: true,
      logo: ''
    });
    const action = {
      type: actions.UPLOAD_LOGO_SUCCESS,
      payload: { logoUrl: 'someURL' }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        uploadingLogo: false,
        logo: 'someURL'
      })
    );
  });

  it('saves any error that happens while uploading', () => {
    const state = fromJS({
      uploadingLogo: true,
      uploadLogoError: {}
    });
    const action = {
      type: actions.UPLOAD_LOGO_ERROR,
      payload: {
        status: 400,
        response: {
          errorMessage: 'Some Error'
        }
      }
    };
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        uploadingLogo: false,
        uploadLogoError: {
          status: 400,
          message: 'Some Error'
        }
      })
    );
  });
});
