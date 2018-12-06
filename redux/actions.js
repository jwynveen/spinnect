/*
 * Action Types
 */
export const SAVE_LEVEL_STATS = 'SAVE_LEVEL_STATS';

/*
 * Action Creators
 */
/**
 * Save level stats to user's overall statistics
 * @param {string} difficulty
 * @param {object} stats
 * @param {number} stats.duration - Level duration in ms
 * @returns {{type: string, difficulty: *, stats: *}}
 */
export function saveLevelStats(difficulty, stats) {
  return {
    type: SAVE_LEVEL_STATS,
    difficulty,
    stats,
  };
}
