import 'reflect-metadata';
import * as assert from 'assert';

import AbstractConfig, { Definition, Property, registerEnumType } from '../src';

enum Flag {
  A = 'A',
  B = 'B',
  C = 'C',
}

registerEnumType(Flag, { name: 'Flag' });

@Definition()
class Config extends AbstractConfig {
  @Property(() => [Flag], { source: 'FLAG' })
  flags: Flag[];

  @Property(() => [Number], { source: 'NUMBER_ARRAY' })
  numberArray: number[];

  @Property(() => [Date], { source: 'DATE_ARRAY' })
  dateArray: Date[];

  @Property(() => [String], { source: 'STRING_ARRAY' })
  stringArray: string[];

  @Property(() => [Boolean], { source: 'BOOLEAN_ARRAY' })
  booleanArray: boolean[];

  @Property(() => [Symbol], { source: 'SYMBOL_ARRAY' })
  symbolArray: symbol[];
}

const config = new Config({
  FLAG: 'A,B',
  NUMBER_ARRAY: '1.2,1,3,3,7,4000',
  DATE_ARRAY: '2019-06-04T14:17:59.574Z,2019-05-04T14:17:59.574Z',
  STRING_ARRAY: 'jon doe,lana doe',
  BOOLEAN_ARRAY: 'y,yes,1,n,no,0,nope,haha,trololo',
  SYMBOL_ARRAY: 'a,b,c',
});

console.log(config);
