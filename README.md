# type-cfg

## Usage

1. Install the node package:
   `npm install type-cfg --save` OR `yarn add type-cfg`
1. You also need to install `reflect-metadata` shim:
   `npm install reflect-metadata --save` OR `yarn add reflect-metadata`
1. Add `reflect-metadata` to your app-entry file:
   `import 'reflect-metadata';`
1. 🔥 Enjoy!

## Documentation

### Basic Usage

```typescript
import { Config as AbstractConfig, Definition, Property } from 'type-cfg';

@Definition()
class Config extends AbstractConfig {
  @Property({ source: 'NODE_ENV' })
  environment: string;
}

const config = new Config();

if (config.environment === 'development') {
  // ...
}
```

### Decorators

#### `@Definition`

...

#### `@Property`

...

### Accumulate

#### ...by using a function call

...

#### ...by using the abstract class

...

## Examples

- [Basic Usage](https://github.com/m19c/type-cfg/blob/master/examples/simple.ts)
- [Arrays](https://github.com/m19c/type-cfg/blob/master/examples/array.ts)
- [Nested](https://github.com/m19c/type-cfg/blob/master/examples/nested.ts)
