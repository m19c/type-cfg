import { getMetadataStorage } from '../metadata';

export function Definition(): ClassDecorator {
  return function captureConfigDefinitionTarget(target: Function): void {
    getMetadataStorage().collectDefinitionMetadata({
      target,
      name: target.name,
    });
  };
}
