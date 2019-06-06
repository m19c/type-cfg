// https://jsperf.com/type-config-number-cast
export function toNumber(value: any): number {
  if (typeof value === 'number') {
    return value;
  }

  const result = value * 1;

  if (Number.isNaN(result)) {
    throw new Error('invalid number');
  }

  return result;
}
