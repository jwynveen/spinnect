import levelHelper from '../../levelHelper';

/* Sample Level
 * ┏┳┓
 * ┣╋┫
 * ┗┻┛
 */
const sampleLevel = [
  [
    { sides: [1, 1, 0, 0], isConnected: true },
    { sides: [1, 1, 1, 0], isConnected: true },
    { sides: [0, 1, 1, 0], isConnected: true },
  ],
  [
    { sides: [1, 1, 0, 1], isConnected: true },
    { sides: [1, 1, 1, 1], isConnected: true },
    { sides: [0, 1, 1, 1], isConnected: true },
  ],
  [
    { sides: [1, 0, 0, 1], isConnected: true },
    { sides: [1, 0, 1, 1], isConnected: true },
    { sides: [0, 0, 1, 1], isConnected: true },
  ],
];
it('returns disconnected level', () => {
  let result = levelHelper.shuffleLevel(sampleLevel);

  console.log(levelHelper.levelToASCII(result));

  for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
    for (let colIdx = 0; colIdx < 3; colIdx++) {
      result = levelHelper.isPieceConnected(result, rowIdx, colIdx);
    }
  }

  const isComplete = levelHelper.isLevelComplete(result);
  expect(isComplete).toBeFalsy();
});

it.only('sets isConnected on each piece', () => {
  const result = levelHelper.shuffleLevel(sampleLevel);

  console.log(levelHelper.levelToASCII(result));

  for (let rowIdx = 0; rowIdx < sampleLevel.length; rowIdx++) {
    for (let colIdx = 0; colIdx < sampleLevel[rowIdx].length; colIdx++) {
      const initialIsConnected = result[rowIdx][colIdx].isConnected;

      const expectedResult = levelHelper.isPieceConnected(result, rowIdx, colIdx);

      expect({
        rowIdx,
        colIdx,
        result: expectedResult[rowIdx][colIdx].isConnected,
      }).toEqual({
        rowIdx,
        colIdx,
        result: initialIsConnected,
      });
    }
  }
});
