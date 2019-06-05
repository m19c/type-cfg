import { MetadataStorage } from './MetaDataStorage';
import { getGlobalVariable } from './util';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      TypeConfigMetadataStorage?: MetadataStorage;
    }
  }
}

export function getMetadataStorage(): MetadataStorage {
  const root = getGlobalVariable();

  if (!root.TypeConfigMetadataStorage) {
    root.TypeConfigMetadataStorage = new MetadataStorage();
  }

  return root.TypeConfigMetadataStorage;
}
