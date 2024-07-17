import { Values } from '../types/values';
import { Schema } from '../types/schema';
import { Position } from '../types/position';

export function setValues(
  values: Values,
  schema: Schema,
  path: Position[],
  formData: unknown
): Values {
  console.log('setValues', values, schema, path, formData);
  return values;
}

export function getValue(
  values: Values,
  path: Position[],
  name: string,
  deps: (number | string)[],
  formData: unknown
): unknown {
  console.log('getValue', values, path, name, deps, formData);
  return null;
}
