import { getMetadataStorage } from './metadata';
import { RequiredPropertyMissingError } from './errors/RequiredPropertyMissingError';
import cast from './cast';
import { CannotCastToTypeError } from './errors/CannotCastToTypeError';

const STANDARD_DELIMITER = ',';
const metadataStorage = getMetadataStorage();

export interface Haystack {
  [key: string]: any | undefined;
}

export function accumulate<T extends any>(item: T, haystack: Haystack = process.env): T {
  const definition = metadataStorage.findDefinitionByInstance(item);

  if (!definition) {
    throw new Error();
  }

  const properties = metadataStorage.findPropertiesByInstance(item);

  properties.forEach(property => {
    const type = property.determineType();

    const child = metadataStorage.findDefinitionByValue(type);
    if (child) {
      // eslint-disable-next-line no-param-reassign,new-cap
      item[property.name] = new type();
      accumulate(item[property.name], haystack);
      return;
    }

    const source = property.source || property.name;
    const rawValue = haystack[source];
    const isValueAvailable = !!rawValue;
    const isDefaultValueAvailable = typeof property.defaultValue !== 'undefined';

    if (property.required && !isValueAvailable && !isDefaultValueAvailable) {
      throw new RequiredPropertyMissingError(property.name, source);
    }

    if (!isValueAvailable && isDefaultValueAvailable) {
      // eslint-disable-next-line no-param-reassign
      item[property.name] = property.defaultValue;
      return;
    }

    try {
      // eslint-disable-next-line no-param-reassign
      item[property.name] = cast(rawValue, {
        type,
        isArray: property.determineTypeOptions.isArray,
        delimiter: property.delimiter || STANDARD_DELIMITER,
      });
    } catch (err) {
      throw new CannotCastToTypeError(property.name, source, rawValue, type, err);
    }
  });

  return item;
}
