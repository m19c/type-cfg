import * as index from '.';
import { Definition } from './decorators/Definition';
import { Property } from './decorators/Property';
import { accumulate } from './accumulate';
import { registerEnumType } from './registerEnumType';
import { Config } from './Config';

describe('index', () => {
  test('returns all modules', () => {
    expect(index.Definition).toBe(Definition);
    expect(index.Property).toBe(Property);
    expect(index.accumulate).toBe(accumulate);
    expect(index.registerEnumType).toBe(registerEnumType);
    expect(index.default).toBe(Config);
  });
});
