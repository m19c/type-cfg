import { ReflectionMissingError } from './ReflectionMissingError';

describe('errors/ReflectionMissingError', () => {
  test('works', () => {
    expect(() => {
      throw new ReflectionMissingError();
    }).toThrow(ReflectionMissingError);
  });

  test('instanceof works', () => {
    try {
      throw new ReflectionMissingError();
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(ReflectionMissingError);
    }
  });
});
