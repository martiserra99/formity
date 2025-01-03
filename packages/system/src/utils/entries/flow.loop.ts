import type {
  ItemEntries,
  FlowEntries,
  LoopEntries,
} from "../../types/flow/entries";

import type { Position, LoopPosition } from "../../types/flow/position";

/**
 * Creates a `LoopEntries` object.
 *
 * @returns The created `LoopEntries` object.
 */
export function create(): FlowEntries {
  return { type: "loop", list: {} };
}

/**
 * Clones a `LoopEntries` object.
 *
 * @param flow A `LoopEntries` object.
 * @returns The cloned `LoopEntries` object.
 */
export function clone(flow: LoopEntries): FlowEntries {
  return { ...flow, list: { ...flow.list } };
}

/**
 * Returns the `ItemEntries` object at the given position within the given `LoopEntries` object, or `null` if there is no item at the given position.
 *
 * @param flow The `LoopEntries` object.
 * @param position The position within the `LoopEntries` object.
 * @returns The `ItemEntries` object at the given position within the `LoopEntries` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: LoopEntries,
  position: Position
): ItemEntries | null {
  const { slot } = position as LoopPosition;
  if (slot in flow.list) return flow.list[slot];
  return null;
}

/**
 * Sets the `ItemEntries` object at the given position within the given `LoopEntries` object.
 *
 * @param flow The `LoopEntries` object.
 * @param position The position within the `LoopEntries` object.
 * @param item The `ItemEntries` object to set.
 */
export function setItem(
  flow: LoopEntries,
  position: Position,
  item: ItemEntries
): void {
  const { slot } = position as LoopPosition;
  flow.list[slot] = item;
}
