import { fromJS } from 'immutable';

import '../../helpers/mocks/URL.mock';

import reducer, * as actions from './Media';

describe('Media Duck', () => {
  describe('Fetching Media', () => {
    it('sets a request flag while media is fetched', () => {
      const state = fromJS({
        fetchingMedia: false
      });
      const action = {
        type: actions.FETCH_MEDIA_REQUEST
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingMedia: true
        })
      );
    });

    it('stores fetched media and removes the request flag', () => {
      const state = fromJS({
        fetchingMedia: true,
        media: {}
      });
      const action = {
        type: actions.FETCH_MEDIA_SUCCESS,
        payload: [{ id: 'media1' }, { id: 'media2' }]
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          fetchingMedia: false,
          media: {
            media1: { id: 'media1' },
            media2: { id: 'media2' }
          }
        })
      );
    });

    it('stores any fetch error and removes the request flag', () => {
      const state = fromJS({
        fetchingMedia: true,
        fetchMediaError: {}
      });
      const action = {
        type: actions.FETCH_MEDIA_ERROR,
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
          fetchingMedia: false,
          fetchMediaError: {
            status: 400,
            message: 'Some Error'
          }
        })
      );
    });
  });

  describe('Uploading Media', () => {
    it('sets a flag when the media starts to upload', () => {
      const state = fromJS({
        uploadingMedia: false
      });
      const action = {
        type: actions.UPLOAD_MEDIA_REQUEST
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          uploadingMedia: true
        })
      );
    });

    it('saves the upload response and removes the upload flag', () => {
      const state = fromJS({
        uploadingMedia: true,
        media: {}
      });
      const action = {
        type: actions.UPLOAD_MEDIA_SUCCESS,
        payload: { id: 'mediaId1' }
      };
      const nextState = reducer(state, action);
      expect(nextState).toEqual(
        fromJS({
          uploadingMedia: false,
          media: {
            mediaId1: { id: 'mediaId1' }
          }
        })
      );
    });

    it('saves any error that happens while uploading', () => {
      const state = fromJS({
        uploadingMedia: true,
        uploadMediaError: {}
      });
      const action = {
        type: actions.UPLOAD_MEDIA_ERROR,
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
          uploadingMedia: false,
          uploadMediaError: {
            status: 400,
            message: 'Some Error'
          }
        })
      );
    });
  });

  it('Removes Media from the list', () => {
    const state = fromJS({
      media: [
        {
          id: 'media1',
          name: 'test.jpg'
        }
      ]
    });
    const action = actions.removeMedia('media1');
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        media: []
      })
    );
  });

  it('Clears upload errors', () => {
    const state = fromJS({
      uploadMediaError: {
        status: 404,
        message: '404 - Not Found'
      }
    });
    const action = actions.clearMediaErrors();
    const nextState = reducer(state, action);
    expect(nextState).toEqual(
      fromJS({
        uploadMediaError: {}
      })
    );
  });
});
