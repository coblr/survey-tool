import { fromJS } from 'immutable';
import { CALL_API } from 'redux-api-middleware';
import _ from 'lodash';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

////////////
/// Actions

export const FETCH_SUMMARY_REQUEST =
  'sb-ui/SurveySummary/FETCH_SUMMARY_REQUEST';
export const FETCH_SUMMARY_SUCCESS =
  'sb-ui/SurveySummary/FETCH_SUMMARY_SUCCESS';
export const FETCH_SUMMARY_ERROR =
  'sb-ui/SurveySummary/FETCH_SUMMARY_ERROR';
export const SET_SUMMARY_SCALE =
  'sb-ui/SurveySummary/SET_SUMMARY_SCALE';
export const TIME_TRAVEL = 'sb-ui/SurveySummary/TIME_TRAVEL';

////////////
/// Reducer

//XXX It's entirely possible that many of these properties will
//need to be modified to support many surveys at once. Currenty
//this only represents a single summary because it's only used
//for the summary on the home page.

const initialState = fromJS({
  fetching: false,
  surveySummary: {},
  timeScale: 'day',
  currentTime: new Date(),
  currentUnit: '',
  breakdownData: [],
  breakdownLabels: []
});

export default (state = initialState, action) => {
  const payload = action.payload;
  switch (action.type) {
    case FETCH_SUMMARY_REQUEST: {
      return state.set('fetching', true);
    }

    case FETCH_SUMMARY_ERROR: {
      return state.set('fetching', false);
    }

    case FETCH_SUMMARY_SUCCESS: {
      const scale = state.get('timeScale');
      const time = state.get('currentTime');
      const breakdownData = _processSummaryData(payload, scale, time);
      const breakdownLabels = _buildSummaryLabels(time, scale);

      return state.merge(
        fromJS({
          fetching: false,
          surveySummary: payload,
          breakdownData,
          breakdownLabels
        })
      );
    }

    case SET_SUMMARY_SCALE: {
      const newScale = payload;
      const time = state.get('currentTime');
      const data = state.get('surveySummary').toJS();
      const newUnit = _getTimeUnit(time, newScale);
      let breakdownData = [];
      let breakdownLabels = [];

      if (data) {
        breakdownData = _processSummaryData(data, newScale, time);
        breakdownLabels = _buildSummaryLabels(time, newScale);
      }

      return state.merge(
        fromJS({
          timeScale: newScale,
          currentUnit: newUnit,
          breakdownData,
          breakdownLabels
        })
      );
    }

    case TIME_TRAVEL: {
      const multiplier = payload;
      const factor = 1 * multiplier;
      const scale = state.get('timeScale');
      const time = state.get('currentTime');
      const data = state.get('surveySummary').toJS();
      const newTime = new Date(_getNewTime(time, scale, factor));
      const newUnit = _getTimeUnit(newTime, scale);

      const breakdownData = _processSummaryData(data, scale, newTime);
      const breakdownLabels = _buildSummaryLabels(newTime, scale);

      return state.merge(
        fromJS({
          currentTime: newTime,
          currentUnit: newUnit,
          breakdownData,
          breakdownLabels
        })
      );
    }

    default:
      return state;
  }
};

////////////
/// Creators

export const fetchSurveySummary = (
  surveyId,
  tzHrsOffset = 0,
  start,
  end
) => {
  const paramMap = {
    timeZoneShiftHours: -7, //tzHrsOffset,
    startTs: start,
    endTs: end
  };
  const paramArr = [];
  for (let a in paramMap) {
    if (paramMap[a] !== undefined) {
      paramArr.push(`${a}=${paramMap[a]}`);
    }
  }
  return {
    [CALL_API]: {
      endpoint: `/api/reports/lifecycle/surveys/${surveyId}?${paramArr.join(
        '&'
      )}`,
      method: 'GET',
      types: [
        FETCH_SUMMARY_REQUEST,
        FETCH_SUMMARY_SUCCESS,
        FETCH_SUMMARY_ERROR
      ]
    }
  };
};

export const setSummaryScale = scale => ({
  type: SET_SUMMARY_SCALE,
  payload: scale
});

export const timeTravel = (multiplier = 1) => ({
  type: TIME_TRAVEL,
  payload: multiplier
});

////////////
/// Private Methods

function _getNewTime(time, scale, factor) {
  // clone time to avoid changing the original
  const newTime = new Date(time.toString());
  switch (scale) {
    case 'day':
      return newTime.setDate(time.getDate() + factor);
    case 'month':
      return newTime.setMonth(time.getMonth() + factor);
    case 'year':
      return newTime.setFullYear(time.getFullYear() + factor);
    // no default
  }
}

function _getTimeUnit(time, scale) {
  const dy = time.getDate();
  const mo = MONTHS[time.getMonth()];
  const yr = time.getFullYear();

  switch (scale) {
    case 'day':
      return `${mo} ${dy} ${yr}`;
    case 'month':
      return `${mo} ${yr}`;
    case 'year':
      return `${MONTHS[0]}-${MONTHS[11]} ${yr}`;
    // no default
  }
}

function _processSummaryData(data, scale, time) {
  const processed = [];
  const breakdownType = 'completed';
  let breakdownUnit = 'daily';
  let breakdownCount = 24;

  // context will help us keep breakdowns
  // from 'bleeding' into eachother. Like when
  // looking at a daily breakdown, we only want
  // that day's breakdown, not any other day.
  let context = {};

  switch (scale) {
    case 'day':
      breakdownUnit = 'hourly';
      breakdownCount = 24;
      context.m = time.getMonth() + 1;
      context.d = time.getDate();
      context.y = time.getFullYear() + '';
      break;

    case 'month':
      breakdownUnit = 'daily';
      // counts how many days in current month
      breakdownCount = new Date(
        time.getFullYear(),
        time.getMonth() + 1,
        0
      ).getDate();
      context.m = time.getMonth() + 1;
      context.y = time.getFullYear() + '';
      break;

    case 'year':
      breakdownUnit = 'monthly';
      breakdownCount = 12;
      context.y = time.getFullYear() + '';
      break;

    // no default
  }

  // set up our chart data with all 0's to start
  for (let a = 0; a < breakdownCount; a++) {
    processed.push(0);
  }

  // if there's no data, there's no need to proceed.
  // just return all the 0s that we created in the last step
  if (_.isEmpty(data)) return processed;

  const breakdowns = data.breakdowns[breakdownType][breakdownUnit];
  if (breakdowns) {
    breakdowns.forEach(bd => {
      // use our context vars to make sure that we're
      // only including counts that happen in the unit
      // we're looking at, not all of them. Otherwise
      // counts will 'bleed' into other dates.
      let show = true;
      for (let c in context) {
        if (+bd.key[c] !== +context[c]) {
          show = false;
          break;
        }
      }

      if (show) {
        let dataIndex = bd.key[breakdownUnit[0]];
        // months are 0 based in JS, but 1 based in our data.
        if (breakdownUnit === 'monthly') {
          dataIndex -= 1;
        }
        processed[dataIndex] = bd.count;
      }
    });
  }

  return processed;
}

function _buildSummaryLabels(time, scale) {
  const labels = [];
  const yr = time.getFullYear();
  const mo = time.getMonth();
  const month = MONTHS[time.getMonth()];

  switch (scale) {
    case 'day': {
      for (let a = 0; a < 24; a++) {
        const hr = a < 10 ? `0${a}` : a;
        labels.push(`${hr}:00`);
        if (a % 4 !== 0) {
          labels[a] = '';
        }
      }
      break;
    }

    case 'month': {
      // we are getting the last day of THIS month by
      // getting the number of the day BEFORE the first
      // of NEXT month. i.e. Jan has 31 days because Feb 0 is
      // the day before Feb 1, e.g. Jan 31.
      const daysInMonth = new Date(yr, mo + 1, 0).getDate();

      // create a copy of the current date so we can modify
      const firstMonday = new Date(time);
      firstMonday.setDate(1);
      while (firstMonday.getDay() !== 1) {
        firstMonday.setDate(firstMonday.getDate() + 1);
      }

      let week = 0;
      for (let b = 1; b <= daysInMonth; b++) {
        if (b === firstMonday.getDate() + week) {
          labels.push(`${month} ${b < 10 ? '0' + b : b}`);
          week += 7;
        } else {
          labels.push('');
        }
      }
      break;
    }

    case 'year': {
      Object.assign(labels, MONTHS);
      break;
    }

    // no default
  }

  return labels;
}
