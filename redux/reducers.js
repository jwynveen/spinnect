import { combineReducers } from 'redux';
import {
  SAVE_LEVEL_STATS,
} from './actions';

const initialState = {
  userStatistics: {
    Easy: {
      bestTime: 0,
      totalCompleted: 0,
      averageTime: 0,
    },
    Medium: {
      bestTime: 0,
      totalCompleted: 0,
      averageTime: 0,
    },
    Hard: {
      bestTime: 0,
      totalCompleted: 0,
      averageTime: 0,
    },
  },
};

function userStatistics(state = initialState.userStatistics, action) {
  switch (action.type) {
    case SAVE_LEVEL_STATS: {
      const { difficulty, stats } = action;
      const { duration } = stats;
      const previousStats = state[difficulty];

      const bestTime = !previousStats.bestTime || duration < previousStats.bestTime
        ? duration
        : previousStats.bestTime;
      const totalCompleted = previousStats.totalCompleted + 1;
      const averageTime = (
        (previousStats.totalCompleted * previousStats.averageTime)
        + duration)
        / totalCompleted;

      return Object.assign({}, state, {
        [difficulty]: {
          bestTime,
          totalCompleted,
          averageTime,
        },
      });
    }
    default:
      return state;
  }
}

const reducers = combineReducers({
  userStatistics,
});

export default reducers;
