import { toEnumValue } from './toEnumValue';

describe('cast/toEnumValue', () => {
  test('returns the actual enum value', () => {
    expect(toEnumValue({ A: 1 }, 1)).toBe(1);
  });

  test('throws an error if the value is not present', () => {
    expect(() => toEnumValue({ A: 1 }, 2)).toThrow();
  });
});
