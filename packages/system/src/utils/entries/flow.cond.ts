import type {
  ItemEntries,
  FlowEntries,
  CondEntries,
} from "../../types/flow/entries";

import type { Position, CondPosition } from "../../types/flow/position";

/**
 * Creates a `CondEntries` object.
 *
 * @returns The created `CondEntries` object.
 */
export function create(): FlowEntries {
  return { type: "cond", then: {}, else: {} };
}

/**
 * Clones a `CondEntries` object.
 *
 * @param flow A `CondEntries` object.
 * @returns The cloned `CondEntries` object.
 */
export function clone(flow: CondEntries): FlowEntries {
  return { ...flow, then: { ...flow.then }, else: { ...flow.else } };
}

/**
 * Returns the `ItemEntries` object at the given position within the given `CondEntries` object, or `null` if there is no item at the given position.
 *
 * @param flow The `CondEntries` object.
 * @param position The position within the `CondEntries` object.
 * @returns The `ItemEntries` object at the given position within the `CondEntries` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: CondEntries,
  position: Position
): ItemEntries | null {
  const { path, slot } = position as CondPosition;
  if (slot in flow[path]) return flow[path][slot];
  return null;
}

/**
 * Sets the `ItemEntries` object at the given position within the given `CondEntries` object.
 *
 * @param flow The `CondEntries` object.
 * @param position The position within the `CondEntries` object.
 * @param item The `ItemEntries` object to set.
 */
export function setItem(
  flow: CondEntries,
  position: Position,
  item: ItemEntries
): void {
  const { path, slot } = position as CondPosition;
  flow[path][slot] = item;
}
