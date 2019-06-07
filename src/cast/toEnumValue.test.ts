import { toEnumValue } from './toEnumValue';

describe('cast/toEnumValue', () => {
  test('returns the actual enum value', () => {
    expect(toEnumValue({ A: 1 }, 1)).toBe(1);
  });

  test('throws an error if the value is not present', () => {
    expect(() => toEnumValue({ A: 1 }, 2)).toThrow();
  });

  test('works with a real world example', () => {
    enum Environment {
      Development = 'development',
      Production = 'production',
    }
    expect(toEnumValue(Environment, 'development')).toBe(Environment.Development);
    expect(toEnumValue(Environment, 'production')).toBe(Environment.Production);
  });
});
