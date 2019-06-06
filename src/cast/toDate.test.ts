import { toDate } from './toDate';

describe('cast/toDate', () => {
  test('is able to return a date', () => {
    expect(toDate(new Date().toISOString())).toBeInstanceOf(Date);
  });

  test('throws an error if the date string is invalid', () => {
    expect(() => toDate('')).toThrow();
  });
});
