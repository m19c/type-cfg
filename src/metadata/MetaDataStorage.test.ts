/* eslint @typescript-eslint/no-non-null-assertion: 0 */

import { MetadataStorage } from './MetaDataStorage';

jest.mock('./util.ts');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const util = require('./util');

describe('metadata/MetaDataStorage', () => {
  test('constructor', () => {
    const mds = new MetadataStorage();
    expect(mds).toBeInstanceOf(MetadataStorage);

    expect(util.ensureReflectMetadataExists).toHaveBeenCalledTimes(1);
    util.ensureReflectMetadataExists.mockRestore();
  });

  describe('collect', () => {
    let mds: null | MetadataStorage = null;

    beforeEach(() => {
      mds = new MetadataStorage();
    });

    afterEach(() => {
      mds = null;
    });

    test('collectDefinitionMetadata', () => {
      mds!.collectDefinitionMetadata({
        name: 'Test',
        target: () => {},
      });

      expect(mds).toMatchSnapshot();
    });

    test('collectPropertyMetadata', () => {
      mds!.collectPropertyMetadata({
        name: 'Test',
        target: () => {},
        source: 'TEST_ENV_VAR',
        defaultValue: null,
        delimiter: null,
        determineType: () => {},
        determineTypeOptions: { isArray: true },
        required: false,
      });

      expect(mds).toMatchSnapshot();
    });

    test('collectEnumMetadata', () => {
      mds!.collectEnumMetadata({
        name: 'Test',
        value: {
          A: 1,
          B: 2,
        },
      });

      expect(mds).toMatchSnapshot();
    });
  });

  describe('find', () => {
    class Config {}
    enum Environment {
      Development = 'development',
      Production = 'production',
    }

    let mds: null | MetadataStorage;
    beforeAll(() => {
      mds = new MetadataStorage();

      mds!.collectDefinitionMetadata({
        name: 'Config',
        target: Config,
      });

      mds!.collectPropertyMetadata({
        name: 'environment',
        target: Config,
        source: 'NODE_ENV',
        defaultValue: null,
        delimiter: null,
        determineType: () => Environment,
        determineTypeOptions: { isArray: false },
        required: false,
      });

      mds!.collectPropertyMetadata({
        name: 'domain',
        target: Config,
        source: 'DOMAIN',
        defaultValue: null,
        delimiter: null,
        determineType: () => String,
        determineTypeOptions: { isArray: false },
        required: false,
      });

      mds!.collectEnumMetadata({
        name: 'Environment',
        value: Environment,
      });
    });

    afterAll(() => {
      mds = null;
    });

    test('findEnum', () => {
      expect(mds!.findEnum('notFound')).toBeNull();
      expect(mds!.findEnum(Environment)).not.toBeNull();
    });

    test('findDefinitionByInstance', () => {
      class NotFound {}
      const nfi = new NotFound();

      expect(mds!.findDefinitionByInstance(nfi)).toBeNull();
      expect(mds!.findDefinitionByInstance(new Config())).not.toBeNull();
    });

    test('findDefinitionByValue', () => {
      class NotFound {}

      expect(mds!.findDefinitionByValue(NotFound)).toBeNull();
      expect(mds!.findDefinitionByValue(Config)).not.toBeNull();
    });

    test('findPropertiesByInstance', () => {
      class NotFound {}

      expect(mds!.findPropertiesByInstance(new NotFound())).toHaveLength(0);
      expect(mds!.findPropertiesByInstance(new Config())).toHaveLength(2);
    });
  });
});
