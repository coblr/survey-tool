import { fromJS } from 'immutable';

////////////
/// Actions

export const TOGGLE_CHART_DISPLAY =
  'sb-ui/RealTimeCharts/TOGGLE_CHART_DISPLAY';

////////////
/// Reducer

const initialState = fromJS({
  chartDisplayMap: {}
});

export default (state = initialState, action) => {
  const payload = action.payload;
  // const meta = action.meta;
  switch (action.type) {
    case TOGGLE_CHART_DISPLAY: {
      const qId = payload.questionId;
      const chart = payload.chart;
      const chartDisplayMap = state.get('chartDisplayMap').toJS();

      chartDisplayMap[qId] = chartDisplayMap[qId] || [];
      const chartIndex = chartDisplayMap[qId].indexOf(chart);

      if (chartIndex < 0) {
        chartDisplayMap[qId].push(chart);
      } else {
        chartDisplayMap[qId].splice(chartIndex, 1);
      }

      return state.merge(fromJS({ chartDisplayMap }));
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const toggleChart = (questionId, chart) => ({
  type: TOGGLE_CHART_DISPLAY,
  payload: { questionId, chart }
});
