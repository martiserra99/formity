import type {
  ItemInputs,
  ControlInputs,
  FormInputs,
} from "../../types/state/inputs";

import type { Position } from "../../types/state/position";

import * as ListInputsUtils from "./control.list";
import * as ConditionInputsUtils from "./control.condition";
import * as LoopInputsUtils from "./control.loop";
import * as SwitchInputsUtils from "./control.switch";
import * as FormInputsUtils from "./form";

/**
 * Returns the value that is in the given `ControlInputs` object using the following parameters:
 *
 * - `path`: The path within the `ControlInputs` object that contains a `FormInputs` object.
 * - `name`: The name of the value within the `FormInputs` object.
 * - `keys`: The list of keys that is used to access the value within the `FormInputs` object.
 * - `defaultValue`: The default value to return if the value is not found.
 *
 * @param inputs The `ControlInputs` object.
 * @param path The path within the `ControlInputs` object that contains a `FormInputs` object.
 * @param name The name of the value within the `FormInputs` object.
 * @param keys The list of keys that is used to access the value within the `FormInputs` object.
 * @param defaultValue The default value to return if the value is not found.
 * @returns The value that is in the given `ControlInputs` object or the default value if the value is not found.
 */
export function get(
  inputs: ControlInputs,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown,
): unknown {
  let current: ItemInputs = inputs;
  for (const position of path) {
    const inputs = current as ControlInputs;
    const item = getItem(inputs, position);
    if (item) current = item;
    else return defaultValue;
  }
  const form = current as FormInputs;
  return FormInputsUtils.get(form, name, keys, defaultValue);
}

/**
 * Sets the value in the given `ControlInputs` object using the following parameters:
 *
 * - `path`: The path within the `ControlInputs` object that contains a `FormInputs` object.
 * - `name`: The name of the value within the `FormInputs` object.
 * - `keys`: The list of keys that is used to access the value within the `FormInputs` object.
 * - `value`: The value to set.
 *
 * @param inputs The `ControlInputs` object.
 * @param path The path within the `ControlInputs` object that contains a `FormInputs` object.
 * @param name The name of the value within the `FormInputs` object.
 * @param keys The list of keys that is used to access the value within the `FormInputs` object.
 * @param data The value to set.
 * @returns The updated `ControlInputs` object.
 */
export function set(
  inputs: ControlInputs,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  data: unknown,
): ControlInputs {
  const updated: ControlInputs = clone(inputs);
  let current: ControlInputs = updated;
  for (let i = 0; i < path.length - 1; i++) {
    const position = path[i];
    const item = getItem(current, position);
    if (item) {
      const next = item as ControlInputs;
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
    const form = item as FormInputs;
    setItem(current, position, FormInputsUtils.set(form, name, keys, data));
  } else {
    const form: FormInputs = { [name]: { data: { here: false }, keys: {} } };
    setItem(current, position, FormInputsUtils.set(form, name, keys, data));
  }
  return updated;
}

/**
 * Creates a `ControlInputs` object.
 *
 * @returns The created `ControlInputs` object.
 */
export function create(position: Position): ControlInputs {
  switch (position.type) {
    case "list":
      return ListInputsUtils.create();
    case "condition":
      return ConditionInputsUtils.create();
    case "loop":
      return LoopInputsUtils.create();
    case "switch":
      return SwitchInputsUtils.create();
  }
}

/**
 * Clones a `ControlInputs` object.
 *
 * @param inputs A `ControlInputs` object.
 * @returns The cloned `ControlInputs` object.
 */
export function clone(inputs: ControlInputs): ControlInputs {
  switch (inputs.type) {
    case "list":
      return ListInputsUtils.clone(inputs);
    case "condition":
      return ConditionInputsUtils.clone(inputs);
    case "loop":
      return LoopInputsUtils.clone(inputs);
    case "switch":
      return SwitchInputsUtils.clone(inputs);
  }
}

/**
 * Returns the `ItemInputs` object at the given position within the given `ControlInputs` object, or `null` if there is no item at the given position.
 *
 * @param inputs The `ControlInputs` object.
 * @param position The position within the `ControlInputs` object.
 * @returns The `ItemInputs` object at the given position within the `ControlInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  inputs: ControlInputs,
  position: Position,
): ItemInputs | null {
  switch (inputs.type) {
    case "list":
      return ListInputsUtils.getItem(inputs, position);
    case "condition":
      return ConditionInputsUtils.getItem(inputs, position);
    case "loop":
      return LoopInputsUtils.getItem(inputs, position);
    case "switch":
      return SwitchInputsUtils.getItem(inputs, position);
  }
}

/**
 * Sets the `ItemInputs` object at the given position within the given `ControlInputs` object.
 *
 * @param inputs The `ControlInputs` object.
 * @param position The position within the `ControlInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  inputs: ControlInputs,
  position: Position,
  item: ItemInputs,
): void {
  switch (inputs.type) {
    case "list":
      return ListInputsUtils.setItem(inputs, position, item);
    case "condition":
      return ConditionInputsUtils.setItem(inputs, position, item);
    case "loop":
      return LoopInputsUtils.setItem(inputs, position, item);
    case "switch":
      return SwitchInputsUtils.setItem(inputs, position, item);
  }
}
