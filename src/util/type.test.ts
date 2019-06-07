import * as type from './type';
import { Property } from '../decorators/Property';
import { NoExplicitTypeError } from '../errors/NoExplicitTypeError';

describe('util/type', () => {
  describe('createTypeDeterminerFunction', () => {
    test('works without typeFunction', () => {
      class WorksWithTypeFunctionConfig {
        @Property()
        environment: string;
      }

      const result = type.createTypeDeterminerFunction({
        prototype: WorksWithTypeFunctionConfig.prototype,
        propertyKey: 'environment',
      });

      expect(result.determineType()).toBe(String);
      expect(result.determineTypeOptions).toMatchObject({ isArray: false });
    });

    test('throws an error if typeFunction and designType is not defined', () => {
      class ThrowsAnErrorWithoutTypeAndDesignFunction {
        environment: string;
      }

      expect(() => type.createTypeDeterminerFunction({
        prototype: ThrowsAnErrorWithoutTypeAndDesignFunction.prototype,
        propertyKey: 'environment',
      })).toThrow(NoExplicitTypeError);
    });

    test('works with a type function', () => {
      class WithTypeFunctionConfig {
        environment: string;
      }

      const result = type.createTypeDeterminerFunction({
        prototype: WithTypeFunctionConfig.prototype,
        propertyKey: 'environment',
        typeFunction: () => String,
      });

      expect(result.determineType()).toBe(String);
      expect(result.determineTypeOptions).toMatchObject({ isArray: false });
    });

    test('works with arrays', () => {
      class WithTypeFunctionConfig {
        environment: string[];
      }

      const result = type.createTypeDeterminerFunction({
        prototype: WithTypeFunctionConfig.prototype,
        propertyKey: 'environment',
        typeFunction: () => [String],
      });

      expect(result.determineType()[0]).toBe(String);
      expect(result.determineTypeOptions).toMatchObject({ isArray: true });
    });
  });
});
