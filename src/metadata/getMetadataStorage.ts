import { MetadataStorage } from './MetaDataStorage';
import { getGlobalVariable } from './util';

declare global {
  namespace NodeJS {
    interface Global {
      TypeConfigMetadataStorage?: MetadataStorage;
    }
  }
}

export function getMetadataStorage() {
  const root = getGlobalVariable();

  if (!root.TypeConfigMetadataStorage) {
    root.TypeConfigMetadataStorage = new MetadataStorage();
  }

  return root.TypeConfigMetadataStorage!;
}
