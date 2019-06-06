import { toString } from './toString';

describe('cast/toString', () => {
  test('casts everything to a string', () => {
    expect(toString(1)).toBe('1');

    const date = new Date();
    expect(toString(date)).toBe(date.toString());

    expect(toString(1.2)).toBe('1.2');
  });
});
