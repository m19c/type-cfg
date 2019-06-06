import { cast } from './cast';
import { registerEnumType } from '../registerEnumType';

describe('cast/cast', () => {
  test('is able to cast a string', () => {
    expect(cast(1, { type: String })).toBe('1');
  });

  test('is able to cast a number', () => {
    expect(cast('1', { type: Number })).toBe(1);
  });

  test('is able to cast a date', () => {
    const raw = new Date();
    const casted = cast(raw.toISOString(), { type: Date });
    expect(casted.toISOString()).toBe(raw.toISOString());
  });

  test('is able to cast a boolean', () => {
    expect(cast('y', { type: Boolean })).toBeTruthy();
    expect(cast('yes', { type: Boolean })).toBeTruthy();
    expect(cast('1', { type: Boolean })).toBeTruthy();
    expect(cast('true', { type: Boolean })).toBeTruthy();
    expect(cast('0', { type: Boolean })).toBeFalsy();
    expect(cast('asdf', { type: Boolean })).toBeFalsy();
  });

  test('is able to cast a value to a symbol', () => {
    const casted = cast('a', { type: Symbol });
    expect(typeof casted).toBe('symbol');
  });

  test('is able to cast a value to an enum value', () => {
    enum Test {
      A = 1,
    }
    registerEnumType(Test, { name: 'Test' });

    expect(cast(1, { type: Test })).toBe(1);
  });

  describe('is able to create an array of...', () => {
    test('...strings', () => {
      expect(cast('a,b,c', { type: [String], isArray: true, delimiter: ',' })).toEqual([
        'a',
        'b',
        'c',
      ]);
    });

    test('...numbers', () => {
      expect(cast('1,2,3', { type: [Number], isArray: true, delimiter: ',' })).toEqual([1, 2, 3]);
    });

    test('...dates', () => {
      const d1 = new Date();
      const d2 = new Date();

      expect(
        cast([d1, d2].map(value => value.toISOString()).join(','), { type: [Date], isArray: true })
      ).toEqual([d1, d2]);
    });

    test('...booleans', () => {
      expect(cast('1,y,yes,no,0,true,false', { type: [Boolean], isArray: true })).toEqual([
        true,
        true,
        true,
        false,
        false,
        true,
        false,
      ]);
    });

    test('...symbols', () => {
      const [e1, e2, e3] = cast('1,2,3', { type: [Symbol], isArray: true });

      expect(typeof e1).toBe('symbol');
      expect(typeof e2).toBe('symbol');
      expect(typeof e3).toBe('symbol');
    });

    test('...enums', () => {
      enum TestArray {
        A = 'A',
        B = 'B',
      }
      registerEnumType(TestArray, { name: 'TestArray' });

      expect(cast('A,B', { type: [TestArray], isArray: true })).toEqual(['A', 'B']);
    });
  });

  test('throws an error', () => {
    expect(() => cast(1, { type: null })).toThrow();
  });
});
