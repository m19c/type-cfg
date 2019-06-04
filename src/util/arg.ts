import { TypeFunction } from '../decorators/types';

export function getTypeDecoratorArguments<T extends object>() {}

export interface ResolvedTypeDecoratorParams<T> {
  options: Partial<T>;
  typeFunction?: TypeFunction;
}
export function resolveTypeDecoratorArguments<T extends object>(
  returnTypeFuncOrOptions: TypeFunction | T | undefined,
  maybeOptions: T | undefined
): ResolvedTypeDecoratorParams<T> {
  if (typeof returnTypeFuncOrOptions === 'function') {
    return {
      typeFunction: returnTypeFuncOrOptions as TypeFunction,
      options: maybeOptions || {},
    };
  }

  return {
    options: returnTypeFuncOrOptions || {},
  };
}
