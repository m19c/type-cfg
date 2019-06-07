import * as acc from './accumulate';
import { Config } from './Config';

describe('Config', () => {
  test('calls the accumulate function', () => {
    // eslint-disable-next-line no-multi-assign
    const mock = (acc as any).accumulate = jest.fn();

    class AccumulateCallTestConfig extends Config {}

    const config = new AccumulateCallTestConfig();
    expect(config).toBeInstanceOf(Config);

    expect(mock).toHaveBeenCalled();

    mock.mockRestore();
  });
});
