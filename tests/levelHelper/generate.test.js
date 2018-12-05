import levelHelper from '../../levelHelper';

it('returns level with correct number of rows', () => {
  const result = levelHelper.generate(4, 5);
  expect(result.length).toEqual(4);
});
it('returns level with correct number of columns', () => {
  const result = levelHelper.generate(4, 5);

  for (const row of result) {
    expect(row.length).toEqual(5);
  }
});

it('returns fully connected level', () => {
  let result = levelHelper.generate(4, 4);

  console.log(levelHelper.levelToASCII(result));

  for (let rowIdx = 0; rowIdx < 4; rowIdx++) {
    for (let colIdx = 0; colIdx < 5; colIdx++) {
      result = levelHelper.isPieceConnected(result, rowIdx, colIdx);
    }
  }

  const isComplete = levelHelper.isLevelComplete(result);
  expect(isComplete).toBeTruthy();
});
