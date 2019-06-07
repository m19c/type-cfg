import { accumulate } from './accumulate';
import { Definition } from './decorators/Definition';
import { Property } from './decorators/Property';
import { RequiredPropertyMissingError } from './errors/RequiredPropertyMissingError';
import { CannotCastToTypeError } from './errors/CannotCastToTypeError';

describe('accumulate', () => {
  test('throws an error without @Definition()', () => {
    expect(() => accumulate(new (class {})())).toThrow();
  });

  test('returns an empty class if there are no properties', () => {
    @Definition()
    class EmptyConfigTest {}

    const config = new EmptyConfigTest();
    expect(Object.keys(accumulate(config))).toHaveLength(0);
  });

  test('throws an error if there is no value for a required property', () => {
    @Definition()
    class MissingPropertyConfig {
      @Property()
      thisPropertyDoesNotExist: string;
    }

    expect(() => accumulate(new MissingPropertyConfig())).toThrow(RequiredPropertyMissingError);
  });

  test('applies the defaultValue', () => {
    @Definition()
    class DefaultValueConfig {
      @Property({ defaultValue: 1337 })
      value: number;
    }

    expect(accumulate(new DefaultValueConfig())).toMatchObject({ value: 1337 });
  });

  test('throws a CannotCastToTypeError', () => {
    @Definition()
    class CannotCastToTypeErrorConfig {
      @Property()
      value: number;
    }

    expect(() => accumulate(new CannotCastToTypeErrorConfig(), { value: 'a' })).toThrow(
      CannotCastToTypeError
    );
  });

  test('is able to extract the values into the config object', () => {
    @Definition()
    class ConfigA {
      @Property()
      firstName: string;
    }

    @Definition()
    class ConfigB {
      @Property()
      lastName: string;

      @Property()
      configA: ConfigA;
    }

    @Definition()
    class Config {
      @Property()
      age: number;

      @Property()
      configB: ConfigB;
    }

    const config = new Config();
    accumulate(config, {
      age: 1337,
      firstName: 'Jon',
      lastName: 'Doe',
    });

    expect(config.age).toBe(1337);
    expect(config.configB.lastName).toBe('Doe');
    expect(config.configB.configA.firstName).toBe('Jon');
  });
});
