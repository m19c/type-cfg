import dflt from '.';
import { cast } from './cast';

describe('cast', () => {
  test('exports the cast function', () => {
    expect(dflt).toBe(cast);
  });
});
