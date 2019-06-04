import { toString } from './toString';
import { toNumber } from './toNumber';
import { toBoolean } from './toBoolean';
import { toDate } from './toDate';
import { toEnumValue } from './toEnumValue';
import { getMetadataStorage } from '../metadata';

interface CastOptions {
  type: any;
  isArray?: boolean;
  delimiter?: string;
}

export function cast(
  raw: any,
  { type, isArray = false, delimiter = ',' }: CastOptions
): null | any {
  let result: any = null;

  if (type === String) {
    result = toString(raw);
  } else if (type === Number) {
    result = toNumber(raw);
  } else if (type === Date) {
    result = toDate(raw);
  } else if (type === Boolean) {
    result = toBoolean(raw);
  } else if (type === Symbol) {
    result = Symbol(raw);
  } else if (isArray && delimiter && typeof raw === 'string') {
    result = raw.split(delimiter).map(item => cast(item, { type: type[0] }));
  }

  const possibleEnum = getMetadataStorage().findEnum(type);
  if (possibleEnum) {
    result = toEnumValue(possibleEnum.value, raw);
  }

  if (result === null) {
    throw new Error(`unsuccessful cast - value: "${raw}"`);
  }

  return result;
}
