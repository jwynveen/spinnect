import levelHelper from '../../levelHelper';

it('returns 5x5 for null', () => {
  const result = levelHelper.getLevelConfigByDifficulty()
  expect(result).toEqual({
    height: 5,
    width: 5,
  });
});
it('returns 5x5 for Easy', () => {
  const result = levelHelper.getLevelConfigByDifficulty('Easy')
  expect(result).toEqual({
    height: 5,
    width: 5,
  });
});
it('returns 7x7 for Medium', () => {
  const result = levelHelper.getLevelConfigByDifficulty('Medium')
  expect(result).toEqual({
    height: 7,
    width: 7,
  });
});
it('returns 9x9 for Hard', () => {
  const result = levelHelper.getLevelConfigByDifficulty('Hard')
  expect(result).toEqual({
    height: 9,
    width: 9,
  });
});
it('returns 11x11 for Expert', () => {
  const result = levelHelper.getLevelConfigByDifficulty('Expert')
  expect(result).toEqual({
    height: 11,
    width: 11,
  });
});
it('returns 13x13 for Master', () => {
  const result = levelHelper.getLevelConfigByDifficulty('Master')
  expect(result).toEqual({
    height: 13,
    width: 13,
  });
});
