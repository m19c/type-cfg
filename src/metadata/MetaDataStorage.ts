import { ensureReflectMetadataExists } from './util';
import { DefinitionMetadata } from './definitions/DefinitionMetadata';
import { PropertyMetadata } from './definitions/PropertyMetadata';
import { EnumMetadata } from './definitions/EnumMetadata';

export class MetadataStorage {
  private definitions: DefinitionMetadata[] = [];
  private properties: PropertyMetadata[] = [];
  private enums: EnumMetadata[] = [];

  constructor() {
    ensureReflectMetadataExists();
  }

  collectDefinitionMetadata(item: DefinitionMetadata) {
    this.definitions.push(item);
  }

  findDefinitionByInstance(value: any) {
    return (
      this.definitions.filter(definition => value instanceof definition.target).shift() || null
    );
  }

  findDefinitionByValue(value: any) {
    return this.definitions.filter(definition => value === definition.target).shift() || null;
  }

  collectConfigPropertyMetadata(item: PropertyMetadata) {
    this.properties.push(item);
  }

  findPropertiesByInstance(value: any) {
    return this.properties.filter(property => value instanceof property.target);
  }

  collectEnumMetadata(item: EnumMetadata) {
    this.enums.push(item);
  }

  findEnum(value: any) {
    return this.enums.filter(item => item.value === value).shift() || null;
  }
}
