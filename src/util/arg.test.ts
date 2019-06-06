import * as arg from './arg';

describe('util/arg', () => {
  describe('resolveTypeDecoratorArguments', () => {
    test('returns an object with options if the first argument is not a function', () => {
      expect(arg.resolveTypeDecoratorArguments({}, undefined)).toMatchSnapshot();
    });

    test('returns the typeFunction as well as the options', () => {
      expect(arg.resolveTypeDecoratorArguments(() => String, {})).toMatchSnapshot();
    });
  });
});
