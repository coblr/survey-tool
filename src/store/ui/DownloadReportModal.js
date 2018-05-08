import { fromJS } from 'immutable';

////////////
/// Actions

export const SET_DOWNLOAD_PARAM =
  'sb-ui/DownloadReportModal/SET_DOWNLOAD_PARAM';
export const OPEN_MODAL = 'sb-ui/DownloadReportModal/OPEN_MODAL';
export const DISMISS_MODAL =
  'sb-ui/DownloadReportModal/DISMISS_MODAL';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  filterId: '',
  downloadParams: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  const meta = action.meta || {};

  switch (action.type) {
    case SET_DOWNLOAD_PARAM: {
      const downloadParams = state.get('downloadParams').toJS();
      downloadParams[payload.param] = payload.value;
      if (!payload.value) {
        delete downloadParams[payload.param];
      }
      return state.set('downloadParams', fromJS(downloadParams));
    }

    case OPEN_MODAL: {
      const downloadParams = state.get('downloadParams').toJS();

      const nextState = {
        isOpen: true,
        downloadParams
      };
      if (meta.filterId) {
        nextState.filterId = meta.filterId;
        nextState.downloadParams.filterId = meta.filterId;
      }

      return state.merge(fromJS(nextState));
    }

    case DISMISS_MODAL: {
      return state.merge(
        fromJS({
          isOpen: false,
          downloadParams: {},
          filterId: ''
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openDownloadReportModal = filterId => ({
  type: OPEN_MODAL,
  meta: { filterId: filterId || '' }
});

export const dismissDownloadReportModal = () => ({
  type: DISMISS_MODAL
});

export const setDownloadParam = (param, value) => ({
  type: SET_DOWNLOAD_PARAM,
  payload: { param, value }
});
