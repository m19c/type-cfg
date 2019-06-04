import { ReflectionMissingError } from '../errors/ReflectionMissingError';

export function ensureReflectMetadataExists() {
  if (
    typeof Reflect !== 'object' ||
    typeof Reflect.decorate !== 'function' ||
    typeof Reflect.metadata !== 'function'
  ) {
    throw new ReflectionMissingError();
  }
}

export function getGlobalVariable() {
  return global;
}
