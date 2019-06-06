import { RequiredPropertyMissingError } from './RequiredPropertyMissingError';

describe('errors/RequiredPropertyMissingError', () => {
  test('works', () => {
    expect(() => {
      throw new RequiredPropertyMissingError('environment', 'NODE_ENV');
    }).toThrow(RequiredPropertyMissingError);
  });

  test('instanceof works', () => {
    try {
      throw new RequiredPropertyMissingError('environment', 'NODE_ENV');
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err).toBeInstanceOf(RequiredPropertyMissingError);
    }
  });
});
