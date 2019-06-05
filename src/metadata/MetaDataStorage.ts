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

  collectDefinitionMetadata(item: DefinitionMetadata): void {
    this.definitions.push(item);
  }

  findDefinitionByInstance(value: any): DefinitionMetadata | null {
    return (
      this.definitions.filter(definition => value instanceof definition.target).shift() || null
    );
  }

  findDefinitionByValue(value: any): DefinitionMetadata | null {
    return this.definitions.filter(definition => value === definition.target).shift() || null;
  }

  collectConfigPropertyMetadata(item: PropertyMetadata): void {
    this.properties.push(item);
  }

  findPropertiesByInstance(value: any): PropertyMetadata[] {
    return this.properties.filter(property => value instanceof property.target);
  }

  collectEnumMetadata(item: EnumMetadata): void {
    this.enums.push(item);
  }

  findEnum(value: any): EnumMetadata | null {
    return this.enums.filter(item => item.value === value).shift() || null;
  }
}
