import { DetermineType } from '../../util/type';

type DefaultValue = string | boolean | symbol | number;
export type PropertyMetadataDefaultValue =
  | null
  | DefaultValue
  | (() => DefaultValue | null)
  | DefaultValue[];

export interface PropertyMetadata extends DetermineType {
  name: string;
  target: Function;
  source: null | string;
  delimiter: null | string;
  required: boolean;
  defaultValue: undefined | PropertyMetadataDefaultValue;
}
