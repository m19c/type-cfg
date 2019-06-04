import { ClassType } from '../util/ClassType';

export type ConfigTypeValue = ClassType | Function | object | symbol;
export type TypeFunction = (returns?: void) => ConfigTypeValue;
