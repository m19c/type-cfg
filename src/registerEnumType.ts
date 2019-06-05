import { getMetadataStorage } from './metadata';

interface RegisterEnumTypeOptions {
  name: string;
}

export function registerEnumType<T extends object>(
  value: T,
  options: RegisterEnumTypeOptions
): void {
  getMetadataStorage().collectEnumMetadata({
    name: options.name,
    value,
  });
}
