import { CannotCastToTypeError } from './CannotCastToTypeError';

describe('errors/CannotCastToTypeError', () => {
  test('works', () => {
    expect(() => {
      throw new CannotCastToTypeError('test', 'test', 'value', 'string');
    }).toThrow(CannotCastToTypeError);
  });

  test('instanceof works', () => {
    try {
      throw new CannotCastToTypeError('test', 'test', 'value', 'string');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(CannotCastToTypeError);
    }
  });
});
