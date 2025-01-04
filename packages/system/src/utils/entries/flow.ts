import type {
  ItemEntries,
  FlowEntries,
  FormEntries,
} from "../../types/flow/entries";

import type { Position } from "../../types/flow/position";

import * as ListEntriesUtils from "./flow.list";
import * as CondEntriesUtils from "./flow.cond";
import * as LoopEntriesUtils from "./flow.loop";
import * as SwitchEntriesUtils from "./flow.switch";
import * as FormEntriesUtils from "./form";

/**
 * Returns the value that is in the given `FlowEntries` object using the following parameters:
 *
 * - `path`: The path within the `FlowEntries` object that contains a `FormEntries` object.
 * - `name`: The name of the value within the `FormEntries` object.
 * - `keys`: The list of keys that is used to access the value within the `FormEntries` object.
 * - `defaultValue`: The default value to return if the value is not found.
 *
 * @param flow The `FlowEntries` object.
 * @param path The path within the `FlowEntries` object that contains a `FormEntries` object.
 * @param name The name of the value within the `FormEntries` object.
 * @param keys The list of keys that is used to access the value within the `FormEntries` object.
 * @param defaultValue The default value to return if the value is not found.
 * @returns The value that is in the given `FlowEntries` object or the default value if the value is not found.
 */
export function get(
  flow: FlowEntries,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown
): unknown {
  let current: ItemEntries = flow;
  for (const position of path) {
    const flow = current as FlowEntries;
    const item = getItem(flow, position);
    if (item) current = item;
    else return defaultValue;
  }
  const form = current as FormEntries;
  return FormEntriesUtils.get(form, name, keys, defaultValue);
}

/**
 * Sets the value in the given `FlowEntries` object using the following parameters:
 *
 * - `path`: The path within the `FlowEntries` object that contains a `FormEntries` object.
 * - `name`: The name of the value within the `FormEntries` object.
 * - `keys`: The list of keys that is used to access the value within the `FormEntries` object.
 * - `value`: The value to set.
 *
 * @param flow The `FlowEntries` object.
 * @param path The path within the `FlowEntries` object that contains a `FormEntries` object.
 * @param name The name of the value within the `FormEntries` object.
 * @param keys The list of keys that is used to access the value within the `FormEntries` object.
 * @param data The value to set.
 * @returns The updated `FlowEntries` object.
 */
export function set(
  flow: FlowEntries,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  data: unknown
): FlowEntries {
  const updated: FlowEntries = clone(flow);
  let current: FlowEntries = updated;
  for (let i = 0; i < path.length - 1; i++) {
    const position = path[i];
    const item = getItem(current, position);
    if (item) {
      const next = item as FlowEntries;
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
    const form = item as FormEntries;
    setItem(current, position, FormEntriesUtils.set(form, name, keys, data));
  } else {
    const form: FormEntries = { [name]: { data: { here: false }, keys: {} } };
    setItem(current, position, FormEntriesUtils.set(form, name, keys, data));
  }
  return updated;
}

/**
 * Creates a `FlowEntries` object.
 *
 * @returns The created `FlowEntries` object.
 */
export function create(position: Position): FlowEntries {
  switch (position.type) {
    case "list":
      return ListEntriesUtils.create();
    case "cond":
      return CondEntriesUtils.create();
    case "loop":
      return LoopEntriesUtils.create();
    case "switch":
      return SwitchEntriesUtils.create();
  }
}

/**
 * Clones a `FlowEntries` object.
 *
 * @param flow A `FlowEntries` object.
 * @returns The cloned `FlowEntries` object.
 */
export function clone(flow: FlowEntries): FlowEntries {
  switch (flow.type) {
    case "list":
      return ListEntriesUtils.clone(flow);
    case "cond":
      return CondEntriesUtils.clone(flow);
    case "loop":
      return LoopEntriesUtils.clone(flow);
    case "switch":
      return SwitchEntriesUtils.clone(flow);
  }
}

/**
 * Returns the `ItemEntries` object at the given position within the given `FlowEntries` object, or `null` if there is no item at the given position.
 *
 * @param flow The `FlowEntries` object.
 * @param position The position within the `FlowEntries` object.
 * @returns The `ItemEntries` object at the given position within the `FlowEntries` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: FlowEntries,
  position: Position
): ItemEntries | null {
  switch (flow.type) {
    case "list":
      return ListEntriesUtils.getItem(flow, position);
    case "cond":
      return CondEntriesUtils.getItem(flow, position);
    case "loop":
      return LoopEntriesUtils.getItem(flow, position);
    case "switch":
      return SwitchEntriesUtils.getItem(flow, position);
  }
}

/**
 * Sets the `ItemEntries` object at the given position within the given `FlowEntries` object.
 *
 * @param flow The `FlowEntries` object.
 * @param position The position within the `FlowEntries` object.
 * @param item The `ItemEntries` object to set.
 */
export function setItem(
  flow: FlowEntries,
  position: Position,
  item: ItemEntries
): void {
  switch (flow.type) {
    case "list":
      return ListEntriesUtils.setItem(flow, position, item);
    case "cond":
      return CondEntriesUtils.setItem(flow, position, item);
    case "loop":
      return LoopEntriesUtils.setItem(flow, position, item);
    case "switch":
      return SwitchEntriesUtils.setItem(flow, position, item);
  }
}
