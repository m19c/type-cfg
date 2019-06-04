const truthy = ['yes', 'y', '1'];

export function toBoolean(value: any): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string' && truthy.includes(value.toLowerCase())) {
    return true;
  }

  return false;
}
