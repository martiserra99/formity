import type {
  ItemInputs,
  FlowInputs,
  FormInputs,
} from "../../types/state/inputs";

import type { Position } from "../../types/state/position";

import * as ListInputsUtils from "./flow.list";
import * as CondInputsUtils from "./flow.cond";
import * as LoopInputsUtils from "./flow.loop";
import * as SwitchInputsUtils from "./flow.switch";
import * as FormInputsUtils from "./form";

/**
 * Returns the value that is in the given `FlowInputs` object using the following parameters:
 *
 * - `path`: The path within the `FlowInputs` object that contains a `FormInputs` object.
 * - `name`: The name of the value within the `FormInputs` object.
 * - `keys`: The list of keys that is used to access the value within the `FormInputs` object.
 * - `defaultValue`: The default value to return if the value is not found.
 *
 * @param flow The `FlowInputs` object.
 * @param path The path within the `FlowInputs` object that contains a `FormInputs` object.
 * @param name The name of the value within the `FormInputs` object.
 * @param keys The list of keys that is used to access the value within the `FormInputs` object.
 * @param defaultValue The default value to return if the value is not found.
 * @returns The value that is in the given `FlowInputs` object or the default value if the value is not found.
 */
export function get(
  flow: FlowInputs,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown
): unknown {
  let current: ItemInputs = flow;
  for (const position of path) {
    const flow = current as FlowInputs;
    const item = getItem(flow, position);
    if (item) current = item;
    else return defaultValue;
  }
  const form = current as FormInputs;
  return FormInputsUtils.get(form, name, keys, defaultValue);
}

/**
 * Sets the value in the given `FlowInputs` object using the following parameters:
 *
 * - `path`: The path within the `FlowInputs` object that contains a `FormInputs` object.
 * - `name`: The name of the value within the `FormInputs` object.
 * - `keys`: The list of keys that is used to access the value within the `FormInputs` object.
 * - `value`: The value to set.
 *
 * @param flow The `FlowInputs` object.
 * @param path The path within the `FlowInputs` object that contains a `FormInputs` object.
 * @param name The name of the value within the `FormInputs` object.
 * @param keys The list of keys that is used to access the value within the `FormInputs` object.
 * @param data The value to set.
 * @returns The updated `FlowInputs` object.
 */
export function set(
  flow: FlowInputs,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  data: unknown
): FlowInputs {
  const updated: FlowInputs = clone(flow);
  let current: FlowInputs = updated;
  for (let i = 0; i < path.length - 1; i++) {
    const position = path[i];
    const item = getItem(current, position);
    if (item) {
      const next = item as FlowInputs;
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
 * Creates a `FlowInputs` object.
 *
 * @returns The created `FlowInputs` object.
 */
export function create(position: Position): FlowInputs {
  switch (position.type) {
    case "list":
      return ListInputsUtils.create();
    case "cond":
      return CondInputsUtils.create();
    case "loop":
      return LoopInputsUtils.create();
    case "switch":
      return SwitchInputsUtils.create();
  }
}

/**
 * Clones a `FlowInputs` object.
 *
 * @param flow A `FlowInputs` object.
 * @returns The cloned `FlowInputs` object.
 */
export function clone(flow: FlowInputs): FlowInputs {
  switch (flow.type) {
    case "list":
      return ListInputsUtils.clone(flow);
    case "cond":
      return CondInputsUtils.clone(flow);
    case "loop":
      return LoopInputsUtils.clone(flow);
    case "switch":
      return SwitchInputsUtils.clone(flow);
  }
}

/**
 * Returns the `ItemInputs` object at the given position within the given `FlowInputs` object, or `null` if there is no item at the given position.
 *
 * @param flow The `FlowInputs` object.
 * @param position The position within the `FlowInputs` object.
 * @returns The `ItemInputs` object at the given position within the `FlowInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: FlowInputs,
  position: Position
): ItemInputs | null {
  switch (flow.type) {
    case "list":
      return ListInputsUtils.getItem(flow, position);
    case "cond":
      return CondInputsUtils.getItem(flow, position);
    case "loop":
      return LoopInputsUtils.getItem(flow, position);
    case "switch":
      return SwitchInputsUtils.getItem(flow, position);
  }
}

/**
 * Sets the `ItemInputs` object at the given position within the given `FlowInputs` object.
 *
 * @param flow The `FlowInputs` object.
 * @param position The position within the `FlowInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  flow: FlowInputs,
  position: Position,
  item: ItemInputs
): void {
  switch (flow.type) {
    case "list":
      return ListInputsUtils.setItem(flow, position, item);
    case "cond":
      return CondInputsUtils.setItem(flow, position, item);
    case "loop":
      return LoopInputsUtils.setItem(flow, position, item);
    case "switch":
      return SwitchInputsUtils.setItem(flow, position, item);
  }
}
