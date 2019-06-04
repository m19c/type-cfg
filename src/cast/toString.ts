export function toString(value: any): string {
  if (typeof value === 'string') {
    return value;
  }

  return `${value}`;
}
