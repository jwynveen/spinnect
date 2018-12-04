import levelHelper from '../../levelHelper';

it('converts single 1', () => {
  const result = levelHelper.pieceToASCII('1000');
  expect(result).toEqual('╺');
});
it('converts single 2', () => {
  const result = levelHelper.pieceToASCII('0100');
  expect(result).toEqual('╻');
});
it('converts single 3', () => {
  const result = levelHelper.pieceToASCII('0010');
  expect(result).toEqual('╸');
});
it('converts single 4', () => {
  const result = levelHelper.pieceToASCII('0001');
  expect(result).toEqual('╹');
});

it('converts corner 1', () => {
  const result = levelHelper.pieceToASCII('1100');
  expect(result).toEqual('┏');
});
it('converts corner 2', () => {
  const result = levelHelper.pieceToASCII('0110');
  expect(result).toEqual('┓');
});
it('converts corner 3', () => {
  const result = levelHelper.pieceToASCII('0011');
  expect(result).toEqual('┛');
});
it('converts corner 4', () => {
  const result = levelHelper.pieceToASCII('1001');
  expect(result).toEqual('┗');
});

it('converts straight 1', () => {
  const result = levelHelper.pieceToASCII('1010');
  expect(result).toEqual('━');
});
it('converts single 2', () => {
  const result = levelHelper.pieceToASCII('0101');
  expect(result).toEqual('┃');
});

it('converts triple 1', () => {
  const result = levelHelper.pieceToASCII('1110');
  expect(result).toEqual('┳');
});
it('converts triple 2', () => {
  const result = levelHelper.pieceToASCII('0111');
  expect(result).toEqual('┫');
});
it('converts triple 3', () => {
  const result = levelHelper.pieceToASCII('1011');
  expect(result).toEqual('┻');
});
it('converts triple 4', () => {
  const result = levelHelper.pieceToASCII('1101');
  expect(result).toEqual('┣');
});

it('converts quad', () => {
  const result = levelHelper.pieceToASCII('1111');
  expect(result).toEqual('╋');
});
