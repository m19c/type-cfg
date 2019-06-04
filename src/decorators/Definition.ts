import { ClassType } from '../util/ClassType';
import { getMetadataStorage } from '../metadata';

export function Definition(nameOrOptions?: string | {}, maybeOptions?: {}): ClassDecorator {
  return function captureConfigDefinitionTarget(target: Function) {
    getMetadataStorage().collectDefinitionMetadata({
      target,
      name: (typeof nameOrOptions === 'string' ? nameOrOptions : null) || target.name,
    });
  };
}
