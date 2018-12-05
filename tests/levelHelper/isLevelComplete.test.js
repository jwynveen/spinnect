import levelHelper from '../../levelHelper';

it('returns true if all connected', () => {
  const sampleLevel = [
    [
      { sides: [1, 1, 0, 0], isConnected: true },
      { sides: [0, 1, 1, 1], isConnected: true },
      { sides: [1, 0, 0, 1], isConnected: true },
    ],
    [
      { sides: [1, 1, 0, 1], isConnected: true },
      { sides: [1, 1, 1, 1], isConnected: true },
      { sides: [1, 1, 0, 1], isConnected: true },
    ],
    [
      { sides: [0, 0, 1, 1], isConnected: true },
      { sides: [1, 1, 0, 1], isConnected: true },
      { sides: [1, 0, 0, 1], isConnected: true },
    ],
  ];
  const result = levelHelper.isLevelComplete(sampleLevel);
  expect(result).toBeTruthy();
});

it('returns false if none connected', () => {
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
  const result = levelHelper.isLevelComplete(sampleLevel);
  expect(result).toBeFalsy();
});

it('returns false if mixture of connected and disconnected', () => {
  const sampleLevel = [
    [
      { sides: [1, 1, 0, 0], isConnected: true },
      { sides: [0, 1, 1, 1], isConnected: true },
      { sides: [1, 0, 0, 1], isConnected: false },
    ],
    [
      { sides: [1, 1, 0, 1], isConnected: true },
      { sides: [1, 1, 1, 1], isConnected: true },
      { sides: [1, 1, 0, 1], isConnected: true },
    ],
    [
      { sides: [0, 0, 1, 1], isConnected: true },
      { sides: [1, 1, 0, 1], isConnected: true },
      { sides: [1, 0, 0, 1], isConnected: true },
    ],
  ];
  const result = levelHelper.isLevelComplete(sampleLevel);
  expect(result).toBeFalsy();
});
