import { CannotDetermineTypeError } from './CannotDetermineTypeError';

describe('errors/CannotDetermineTypeError', () => {
  test('works', () => {
    expect(() => {
      throw new CannotDetermineTypeError('Config', 'environment');
    }).toThrow(CannotDetermineTypeError);
  });

  test('instanceof works', () => {
    try {
      throw new CannotDetermineTypeError('Config', 'environment');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(CannotDetermineTypeError);
    }
  });
});
