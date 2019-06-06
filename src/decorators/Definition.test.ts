import * as md from '../metadata';
import { Definition } from './Definition';

class TargetClass {}

describe('decorators/Definition', () => {
  test('calls the metadata storage collector', () => {
    const storage = {
      collectDefinitionMetadata: jest.fn(),
    };
    // eslint-disable-next-line no-multi-assign
    const mock = ((md as any).getMetadataStorage = jest.fn(() => storage));

    Definition()(TargetClass);

    expect(storage.collectDefinitionMetadata).toHaveBeenCalledWith({
      target: TargetClass,
      name: TargetClass.name,
    });

    mock.mockRestore();
  });
});
