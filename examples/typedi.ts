import Container, { Service, Inject } from 'typedi';
import * as assert from 'assert';

import AbstractConfig, { Definition, Property } from '../src';

process.env.MY_ENV_VAR = 'development';

@Service()
@Definition()
class Config extends AbstractConfig {
  constructor() {
    super();
  }

  @Property({ source: 'MY_ENV_VAR' })
  environment: string;
}

@Service()
class Controller {
  @Inject()
  private readonly config: Config;

  action() {
    if (this.config.environment === 'development') {
      return 'Yeah!';
    }

    return 'Nayyy!';
  }
}

const controller = Container.get(Controller);

assert.strictEqual('Yeah!', controller.action());
