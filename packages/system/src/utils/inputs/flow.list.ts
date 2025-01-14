import type {
  ItemInputs,
  FlowInputs,
  ListInputs,
} from "../../types/state/inputs";

import type { Position, ListPosition } from "../../types/state/position";

/**
 * Creates a `ListInputs` object.
 *
 * @returns The created `ListInputs` object.
 */
export function create(): FlowInputs {
  return { type: "list", list: {} };
}

/**
 * Clones a `ListInputs` object.
 *
 * @param flow A `ListInputs` object.
 * @returns The cloned `ListInputs` object.
 */
export function clone(flow: ListInputs): FlowInputs {
  return { ...flow, list: { ...flow.list } };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `ListInputs` object, or `null` if there is no item at the given position.
 *
 * @param flow The `ListInputs` object.
 * @param position The position within the `ListInputs` object.
 * @returns The `ItemInputs` object at the given position within the `ListInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: ListInputs,
  position: Position
): ItemInputs | null {
  const { slot } = position as ListPosition;
  if (slot in flow.list) return flow.list[slot];
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `ListInputs` object.
 *
 * @param flow The `ListInputs` object.
 * @param position The position within the `ListInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  flow: ListInputs,
  position: Position,
  item: ItemInputs
): void {
  const { slot } = position as ListPosition;
  flow.list[slot] = item;
}
