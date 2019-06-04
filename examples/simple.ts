import 'reflect-metadata';
import * as assert from 'assert';

import { Config as AbstractConfig, Definition, Property, registerEnumType } from '../src';

enum Environment {
  Production = 'production',
  Development = 'development',
}

registerEnumType(Environment, { name: 'Environment' });

@Definition()
class Config extends AbstractConfig {
  @Property(() => Environment, { source: 'NODE_ENV' })
  environment: Environment;

  get isDevelopment() {
    return this.environment === Environment.Development;
  }
}

const config = new Config({
  NODE_ENV: 'development',
});

assert.deepEqual(config.environment, Environment.Development);
assert.deepEqual(config.isDevelopment, true);

console.log(config);
