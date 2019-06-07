<div align="center">
  <img src="https://github.com/m19c/type-cfg/raw/master/logo.png" width="200px" />
  <br />
  <br />
  <p>Declare your configuration schema using classes and decorators.</p>
  <a href="https://travis-ci.org/m19c/type-cfg">
    <img src="https://travis-ci.org/m19c/type-cfg.svg?branch=master">
  </a>
  <a href="https://badge.fury.io/js/type-cfg">
    <img src="https://badge.fury.io/js/type-cfg.svg">
  </a>
  <a href="https://david-dm.org/m19c/type-cfg">
    <img src="https://david-dm.org/m19c/type-cfg.svg">
  </a>
  <a href="https://codecov.io/gh/m19c/type-cfg">
    <img src="https://img.shields.io/codecov/c/github/m19c/type-cfg.svg">
  </a>
</div>

## Motivation

We all know the pain that comes with using environment variables in your application. Since each variable is a string you have to cast the content of it to actually use it.

With _type-cfg_ there is just one declartion for your entire application: one config to rule them all.

## Installation

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
import TypeConfig, { Definition, Property } from 'type-cfg';

@Definition()
class Config extends TypeConfig {
  @Property({ source: 'NODE_ENV' })
  environment: string;
}

const config = new Config();

if (config.environment === 'development') {
  // ...
}
```

## Examples

- [Basic Usage](https://github.com/m19c/type-cfg/blob/master/examples/simple.ts)
- [Arrays](https://github.com/m19c/type-cfg/blob/master/examples/array.ts)
- [Nested](https://github.com/m19c/type-cfg/blob/master/examples/nested.ts)
- [TypeDI](https://github.com/m19c/type-cfg/blob/master/examples/typedi.ts)

### Decorators

#### `@Definition`

Scope: Class Decorator

**Configuration**

-

**Usage**

```typescript
@Definition();
```

#### `@Property`

Scope: Property Decorator

**Configuration**

| Property       | Required | Default | Description                                                                                     |
| -------------- | -------- | ------- | ----------------------------------------------------------------------------------------------- |
| `source`       | ❌       | -       | The environment variable / object key as a string of the value you want to acquire              |
| `delimiter`    | ❌       | `,`     | The delimiter used to split the value into an array                                             |
| `required`     | ❌       | `true`  | Marks the property as required                                                                  |
| `defaultValue` | ❌       | -       | The default value. Note that the `defaultValue` will be applied even if the value is `required` |

**Usage**

```typescript
@Property();
@Property(options: PropertyOptions);
@Property(typeFunction: TypeFunction);
@Property(typeFunction: TypeFunction, options: PropertyOptions);
```

### Accumulate

Once your configuration is decorated you can _accumulate_ it...

#### ...by using a function call

```typescript
import { accumulate } from 'type-cfg';

const config = new MyConfig();
accumulate(config);

// ...
```

#### ...by using the abstract class

```typescript
import TypeConfig, { Definition, Property } from 'type-cfg';

class MyConfig extends TypeConfig {
  // ...
}

const config = new MyConfig();

// ...
```

## Thank you

A huge thanks goes to the creators of _TypeGraphQL_ and _TypeORM_. They gave me the inspiration to not only manage GraphQL schemas and Database relations but also configurations.
