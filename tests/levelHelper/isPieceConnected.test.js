import levelHelper from '../../levelHelper';

/* Sample Level
 * ┏┫┗
 * ┣╋┣
 * ┛┣┗
 */
const sampleLevel = [
  [
    {sides: [1, 1, 0, 0], isConnected: false},
    {sides: [0, 1, 1, 1], isConnected: false},
    {sides: [1, 0, 0, 1], isConnected: false},
  ],
  [
    {sides: [1, 1, 0, 1], isConnected: false},
    {sides: [1, 1, 1, 1], isConnected: false},
    {sides: [1, 1, 0, 1], isConnected: false},
  ],
  [
    {sides: [0, 0, 1, 1], isConnected: false},
    {sides: [1, 1, 0, 1], isConnected: false},
    {sides: [1, 0, 0, 1], isConnected: false},
  ],
];
it('returns if row not found', () => {
  const result = levelHelper.isPieceConnected(sampleLevel, 3, 0);
  expect(result).toEqual(sampleLevel);
});
it('returns if column not found', () => {
  const result = levelHelper.isPieceConnected(sampleLevel, 0, 3);
  expect(result).toEqual(sampleLevel);
});

it('returns true if corner is connected', () => {
  const result = levelHelper.isPieceConnected(sampleLevel, 0, 0);
  expect(result[0][0].isConnected).toBeTruthy();
});
it('returns true if edge is connected', () => {
  const result = levelHelper.isPieceConnected(sampleLevel, 1, 0);
  expect(result[1][0].isConnected).toBeTruthy();
});

it('returns false if corner is disconnected', () => {
  const result = levelHelper.isPieceConnected(sampleLevel, 2, 0);
  expect(result[2][0].isConnected).toBeFalsy();
});
it('returns false if edge is disconnected', () => {
  const result = levelHelper.isPieceConnected(sampleLevel, 0, 1);
  expect(result[0][1].isConnected).toBeFalsy();
});
