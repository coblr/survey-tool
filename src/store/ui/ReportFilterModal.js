import { fromJS } from 'immutable';

////////////
/// Actions

export const OPEN_MODAL = 'sb-ui/ReportFilterModal/OPEN_MODAL';
export const DISMISS_MODAL = 'sb-ui/ReportFilterModal/DISMISS_MODAL';
export const SET_EXPANDED_SECTION =
  'sb-ui/ReportFilterModal/SET_EXPANDED_SECTION';
export const TOGGLE_FILTER_PARAM =
  'sb-ui/ReportFilterModal/TOGGLE_FILTER_PARAM';
export const SET_FILTER_PARAM =
  'sb-ui/ReportFilterModal/SET_FILTER_PARAM';
export const CLEAR_FILTER = 'sb-ui/ReportFilterModal/CLEAR_FILTER';

////////////
/// Reducer

const initialState = fromJS({
  isOpen: false,
  filter: {},
  expandedSection: ''
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case OPEN_MODAL: {
      return state.merge(
        fromJS({
          isOpen: true,
          filter: payload.filter || {}
        })
      );
    }

    case DISMISS_MODAL: {
      return state.merge(initialState);
    }

    case SET_EXPANDED_SECTION: {
      return state.set('expandedSection', payload);
    }

    case TOGGLE_FILTER_PARAM: {
      const { section, param } = payload;
      const filter = state.get('filter').toJS();
      filter[section] = filter[section] || [];

      const paramIndex = filter[section].indexOf(param);
      if (paramIndex === -1) {
        filter[section].push(param);
      } else {
        filter[section].splice(paramIndex, 1);
      }

      return state.merge(fromJS({ filter }));
    }

    case SET_FILTER_PARAM: {
      const { param, value } = payload;
      const filter = state.get('filter').toJS();

      filter[param] = value;

      return state.merge(fromJS({ filter }));
    }

    case CLEAR_FILTER: {
      const filter = state.get('filter').toJS();
      delete filter[payload.section];
      return state.set('filter', fromJS(filter));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const openReportFilterModal = filter => ({
  type: OPEN_MODAL,
  payload: { filter }
});

export const dismissReportFilterModal = () => ({
  type: DISMISS_MODAL
});

export const setExpandedSection = section => ({
  type: SET_EXPANDED_SECTION,
  payload: section
});

export const toggleFilterParam = (section, param) => ({
  type: TOGGLE_FILTER_PARAM,
  payload: { section, param }
});

export const setFilterParam = (param, value) => ({
  type: SET_FILTER_PARAM,
  payload: { param, value }
});

export const clearFilter = section => ({
  type: CLEAR_FILTER,
  payload: { section }
});
