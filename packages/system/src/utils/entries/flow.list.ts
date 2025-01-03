import type {
  ItemEntries,
  FlowEntries,
  ListEntries,
} from "../../types/flow/entries";

import type { Position, ListPosition } from "../../types/flow/position";

/**
 * Creates a `ListEntries` object.
 *
 * @returns The created `ListEntries` object.
 */
export function create(): FlowEntries {
  return { type: "list", list: {} };
}

/**
 * Clones a `ListEntries` object.
 *
 * @param flow A `ListEntries` object.
 * @returns The cloned `ListEntries` object.
 */
export function clone(flow: ListEntries): FlowEntries {
  return { ...flow, list: { ...flow.list } };
}

/**
 * Returns the `ItemEntries` object at the given position within the given `ListEntries` object, or `null` if there is no item at the given position.
 *
 * @param flow The `ListEntries` object.
 * @param position The position within the `ListEntries` object.
 * @returns The `ItemEntries` object at the given position within the `ListEntries` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: ListEntries,
  position: Position
): ItemEntries | null {
  const { slot } = position as ListPosition;
  if (slot in flow.list) return flow.list[slot];
  return null;
}

/**
 * Sets the `ItemEntries` object at the given position within the given `ListEntries` object.
 *
 * @param flow The `ListEntries` object.
 * @param position The position within the `ListEntries` object.
 * @param item The `ItemEntries` object to set.
 */
export function setItem(
  flow: ListEntries,
  position: Position,
  item: ItemEntries
): void {
  const { slot } = position as ListPosition;
  flow.list[slot] = item;
}
