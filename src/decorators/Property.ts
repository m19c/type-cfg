import { TypeFunction } from './types';
import { getMetadataStorage } from '../metadata';
import { createTypeDeterminerFunction } from '../util/type';
import { resolveTypeDecoratorArguments } from '../util/arg';
import { PropertyMetadataDefaultValue } from '../metadata/definitions/PropertyMetadata';

export interface PropertyOptions {
  source?: string;
  delimiter?: string;
  required?: boolean;
  defaultValue?: PropertyMetadataDefaultValue;
}

export function Property(): PropertyDecorator;
export function Property(options: PropertyOptions): PropertyDecorator;
export function Property(typeFunction: TypeFunction): PropertyDecorator;
export function Property(typeFunction: TypeFunction, options: PropertyOptions): PropertyDecorator;

export function Property(
  typeFunctionOrOptions?: TypeFunction | PropertyOptions,
  maybeOptions?: PropertyOptions
): PropertyDecorator {
  return function captureConfigPropertyTarget(prototype, propertyKey) {
    const name = propertyKey.toString();
    const { options, typeFunction } = resolveTypeDecoratorArguments(
      typeFunctionOrOptions,
      maybeOptions
    );

    getMetadataStorage().collectConfigPropertyMetadata({
      name,
      target: prototype.constructor,
      ...createTypeDeterminerFunction({
        prototype,
        propertyKey: name,
        typeFunction,
      }),
      source: options.source || null,
      delimiter: options.delimiter || null,
      required: options.required || true,
      defaultValue: options.defaultValue,
    });
  };
}
