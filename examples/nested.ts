import 'reflect-metadata';
import * as assert from 'assert';

import AbstractConfig, { Definition, Property, registerEnumType } from '../src';

@Definition()
class Database {
  @Property({ source: 'PG_USER' })
  username: string;

  @Property({ source: 'PG_PASSWORD' })
  password: string;

  @Property({ source: 'PG_HOST' })
  hostName: string;
}

enum Environment {
  Production = 'production',
  Development = 'development',
}

registerEnumType(Environment, { name: 'Environment' });

@Definition()
class Config extends AbstractConfig {
  @Property(() => Environment, { source: 'NODE_ENV' })
  environment: Environment;

  @Property()
  database: Database;

  get isDevelopment() {
    return this.environment === Environment.Development;
  }
}

const config = new Config({
  NODE_ENV: 'development',
  PG_HOST: 'localhost',
  PG_USER: 'root',
  PG_PASSWORD: 'root',
});

assert.deepEqual(config.environment, Environment.Development);
assert.deepEqual(config.isDevelopment, true);
assert.deepEqual(config.database.hostName, 'localhost');
assert.deepEqual(config.database.username, 'root');
assert.deepEqual(config.database.password, 'root');

console.log(config);
