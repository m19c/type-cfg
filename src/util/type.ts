import { TypeFunction } from '../decorators/types';
import { NoExplicitTypeError } from '../errors/NoExplicitTypeError';
import { CannotDetermineTypeError } from '../errors/CannotDetermineTypeError';

interface CreateTypeDeterminerFunctionOptions {
  prototype: Record<string, any>;
  propertyKey: string;
  typeFunction?: TypeFunction;
}

export const allowedReturnTypes: Function[] = [String, Number, Date, Boolean];
export const bannedReturnTypes: Function[] = [Promise, Array, Object, Function];

export type DetermineTypeFunction = Function;
export interface DetermineTypeOptions {
  isArray: boolean;
}

export interface DetermineType {
  determineType: DetermineTypeFunction;
  determineTypeOptions: DetermineTypeOptions;
}

export function createTypeDeterminerFunction({
  prototype,
  propertyKey,
  typeFunction,
}: CreateTypeDeterminerFunctionOptions): DetermineType {
  const determineTypeOptions: DetermineTypeOptions = { isArray: false };
  const designType = Reflect.getMetadata('design:type', prototype, propertyKey);

  if (!typeFunction && (!designType || (designType && bannedReturnTypes.includes(designType)))) {
    throw new NoExplicitTypeError(prototype.constructor.name, propertyKey);
  }

  if (typeFunction) {
    return {
      determineType: () => {
        const returnType = typeFunction();

        if (Array.isArray(returnType)) {
          determineTypeOptions.isArray = true;
        }

        return returnType;
      },
      determineTypeOptions,
    };
  }

  if (designType) {
    return {
      determineType: () => designType,
      determineTypeOptions,
    };
  }

  throw new CannotDetermineTypeError(prototype.constructor.name, propertyKey);
}
