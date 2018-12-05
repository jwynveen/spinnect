import levelHelper from '../../levelHelper';

/* Sample Level
 * ┏┫┗
 * ┣╋┣
 * ┛┣┗
 */
const sampleLevel = [
  [
    { sides: [1, 1, 0, 0], isConnected: false },
    { sides: [0, 1, 1, 1], isConnected: false },
    { sides: [1, 0, 0, 1], isConnected: false },
  ],
  [
    { sides: [1, 1, 0, 1], isConnected: false },
    { sides: [1, 1, 1, 1], isConnected: false },
    { sides: [1, 1, 0, 1], isConnected: false },
  ],
  [
    { sides: [0, 0, 1, 1], isConnected: false },
    { sides: [1, 1, 0, 1], isConnected: false },
    { sides: [1, 0, 0, 1], isConnected: false },
  ],
];
it('returns level as ASCII', () => {
  const result = levelHelper.levelToASCII(sampleLevel);
  expect(result).toEqual(
    '┏┫┗\n'
    + '┣╋┣\n'
    + '┛┣┗',
  );
});
