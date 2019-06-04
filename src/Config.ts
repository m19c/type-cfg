import { accumulate, Haystack } from './accumulate';

export abstract class Config {
  constructor(haystack?: Haystack) {
    accumulate(this, haystack);
  }
}
