export function toDate(value: any): Date {
  const result = new Date(value);

  if (Number.isNaN(result.getTime())) {
    throw new Error(`Unable to parse date value: ${value}`);
  }

  return result;
}
