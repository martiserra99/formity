import type {
  ItemInputs,
  FlowInputs,
  CondInputs,
} from "../../types/state/inputs";

import type { Position, CondPosition } from "../../types/state/position";

/**
 * Creates a `CondInputs` object.
 *
 * @returns The created `CondInputs` object.
 */
export function create(): FlowInputs {
  return { type: "cond", then: {}, else: {} };
}

/**
 * Clones a `CondInputs` object.
 *
 * @param flow A `CondInputs` object.
 * @returns The cloned `CondInputs` object.
 */
export function clone(flow: CondInputs): FlowInputs {
  return { ...flow, then: { ...flow.then }, else: { ...flow.else } };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `CondInputs` object, or `null` if there is no item at the given position.
 *
 * @param flow The `CondInputs` object.
 * @param position The position within the `CondInputs` object.
 * @returns The `ItemInputs` object at the given position within the `CondInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: CondInputs,
  position: Position
): ItemInputs | null {
  const { path, slot } = position as CondPosition;
  if (slot in flow[path]) return flow[path][slot];
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `CondInputs` object.
 *
 * @param flow The `CondInputs` object.
 * @param position The position within the `CondInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  flow: CondInputs,
  position: Position,
  item: ItemInputs
): void {
  const { path, slot } = position as CondPosition;
  flow[path][slot] = item;
}
