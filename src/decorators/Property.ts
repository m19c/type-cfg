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

// eslint-disable-next-line import/export
export function Property(): PropertyDecorator;
// eslint-disable-next-line import/export
export function Property(options: PropertyOptions): PropertyDecorator;
// eslint-disable-next-line import/export
export function Property(typeFunction: TypeFunction): PropertyDecorator;
// eslint-disable-next-line import/export
export function Property(typeFunction: TypeFunction, options: PropertyOptions): PropertyDecorator;

// eslint-disable-next-line import/export
export function Property(
  typeFunctionOrOptions?: TypeFunction | PropertyOptions,
  maybeOptions?: PropertyOptions
): PropertyDecorator {
  return function captureConfigPropertyTarget(prototype, propertyKey): void {
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
