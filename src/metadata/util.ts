import { ReflectionMissingError } from '../errors/ReflectionMissingError';

export function ensureReflectMetadataExists(): void {
  if (
    typeof Reflect !== 'object' ||
    typeof Reflect.decorate !== 'function' ||
    typeof Reflect.metadata !== 'function'
  ) {
    throw new ReflectionMissingError();
  }
}

export function getGlobalVariable(): typeof global {
  return global;
}
