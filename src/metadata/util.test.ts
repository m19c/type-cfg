import { ensureReflectMetadataExists } from './util';
import { ReflectionMissingError } from '../errors/ReflectionMissingError';

describe('metadata/util', () => {
  test('throws an error if Reflect is not present', () => {
    (global as any).Reflect = undefined;

    expect(() => ensureReflectMetadataExists()).toThrow(ReflectionMissingError);
  });
});
