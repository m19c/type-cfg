export function toEnumValue<T extends { [key: string]: any }>(set: T, value: any): any {
  const isValid = Object.keys(set).some(key => set[key] === value);

  if (!isValid) {
    throw new Error(`Invalid value ${value} (not found in: ${set})`);
  }

  return value;
}
