import type {
  ItemValues,
  NestValues,
  FormValues,
} from "../../types/state/values";

import type { Position } from "../../types/state/position";

import * as ListValuesUtils from "./nest.list";
import * as ConditionValuesUtils from "./nest.condition";
import * as LoopValuesUtils from "./nest.loop";
import * as SwitchValuesUtils from "./nest.switch";
import * as JumpValuesUtils from "./nest.jump";
import * as FormValuesUtils from "./form";

/**
 * Returns the value at the given path, name and keys in `NestValues`, falling back to `defaultValue`.
 */
export function get(
  values: NestValues,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown,
): unknown {
  let current: ItemValues = values;
  for (const position of path) {
    const values = current as NestValues;
    const item = getItem(values, position);
    if (item) current = item;
    else return defaultValue;
  }
  const form = current as FormValues;
  return FormValuesUtils.get(form, name, keys, defaultValue);
}

/**
 * Returns a new `NestValues` object with the value at the given path, name and keys set to `data`.
 */
export function set(
  values: NestValues,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  data: unknown,
): NestValues {
  const updated: NestValues = clone(values);
  let current: NestValues = updated;
  for (let i = 0; i < path.length - 1; i++) {
    const position = path[i];
    const item = getItem(current, position);
    if (item) {
      const next = item as NestValues;
      const cloned = clone(next);
      setItem(current, position, cloned);
      current = cloned;
    } else {
      const next = create(path[i + 1]);
      setItem(current, position, next);
      current = next;
    }
  }
  const position = path[path.length - 1];
  const item = getItem(current, position);
  if (item) {
    const form = item as FormValues;
    setItem(current, position, FormValuesUtils.set(form, name, keys, data));
  } else {
    const form: FormValues = { [name]: { data: { here: false }, keys: {} } };
    setItem(current, position, FormValuesUtils.set(form, name, keys, data));
  }
  return updated;
}

export function create(position: Position): NestValues {
  switch (position.type) {
    case "list":
      return ListValuesUtils.create();
    case "condition":
      return ConditionValuesUtils.create();
    case "loop":
      return LoopValuesUtils.create();
    case "switch":
      return SwitchValuesUtils.create();
    case "jump":
      return JumpValuesUtils.create();
  }
}

export function clone(values: NestValues): NestValues {
  switch (values.type) {
    case "list":
      return ListValuesUtils.clone(values);
    case "condition":
      return ConditionValuesUtils.clone(values);
    case "loop":
      return LoopValuesUtils.clone(values);
    case "switch":
      return SwitchValuesUtils.clone(values);
    case "jump":
      return JumpValuesUtils.clone(values);
  }
}

export function getItem(
  values: NestValues,
  position: Position,
): ItemValues | null {
  switch (values.type) {
    case "list":
      return ListValuesUtils.getItem(values, position);
    case "condition":
      return ConditionValuesUtils.getItem(values, position);
    case "loop":
      return LoopValuesUtils.getItem(values, position);
    case "switch":
      return SwitchValuesUtils.getItem(values, position);
    case "jump":
      return JumpValuesUtils.getItem(values);
  }
}

export function setItem(
  values: NestValues,
  position: Position,
  item: ItemValues,
): void {
  switch (values.type) {
    case "list":
      return ListValuesUtils.setItem(values, position, item);
    case "condition":
      return ConditionValuesUtils.setItem(values, position, item);
    case "loop":
      return LoopValuesUtils.setItem(values, position, item);
    case "switch":
      return SwitchValuesUtils.setItem(values, position, item);
    case "jump":
      return JumpValuesUtils.setItem(values, item);
  }
}
