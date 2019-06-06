import { toNumber } from './toNumber';

describe('cast/toNumber', () => {
  test('works with a simple number', () => {
    expect(toNumber('1')).toBe(1);
  });

  test('works with a float', () => {
    expect(toNumber('1.2')).toBe(1.2);
  });

  test('throws an error if the value is not valid', () => {
    expect(() => toNumber('0a')).toThrow();
    expect(() => toNumber('1,2')).toThrow();
  });
});
