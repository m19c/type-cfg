import { NoExplicitTypeError } from './NoExplicitTypeError';

describe('errors/NoExplicitTypeError', () => {
  test('works', () => {
    expect(() => {
      throw new NoExplicitTypeError('Config', 'environment');
    }).toThrow(NoExplicitTypeError);
  });

  test('instanceof works', () => {
    try {
      throw new NoExplicitTypeError('Config', 'environment');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(NoExplicitTypeError);
    }
  });
});
