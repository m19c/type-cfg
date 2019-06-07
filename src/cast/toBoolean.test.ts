import { toBoolean } from './toBoolean';

const tests = [
  { value: 'y', expected: true },
  { value: 'yes', expected: true },
  { value: '1', expected: true },
  { value: 'true', expected: true },
  { value: 'n', expected: false },
  { value: 'no', expected: false },
  { value: '0', expected: false },
];

describe('cast/toBoolean', () => {
  tests.forEach(tc => {
    test(`${tc.value} returns ${tc.expected}`, () => {
      expect(toBoolean(tc.value)).toBe(tc.expected);
    });
  });

  test('returns the original boolean value', () => {
    expect(toBoolean(true)).toBeTruthy();
    expect(toBoolean(false)).toBeFalsy();
  });
});
