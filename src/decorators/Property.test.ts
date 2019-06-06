import * as md from '../metadata';
import { Property } from './Property';

describe('Property', () => {
  test('calls the metadata storage collector', () => {
    const storage = {
      collectPropertyMetadata: jest.fn(),
    };
    // eslint-disable-next-line no-multi-assign
    const getMetadataStorage = ((md as any).getMetadataStorage = jest.fn(() => storage));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class TargetClass {
      @Property()
      test: string;
    }

    expect(storage.collectPropertyMetadata).toHaveBeenCalled();
    expect(getMetadataStorage).toHaveBeenCalled();

    const [first] = storage.collectPropertyMetadata.mock.calls;
    expect(first).toMatchSnapshot();
  });
});
