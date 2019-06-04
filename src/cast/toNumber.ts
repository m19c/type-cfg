// https://jsperf.com/type-config-number-cast
export function toNumber(value: any): number {
  if (typeof value === 'number') {
    return value;
  }

  return value * 1;
}
