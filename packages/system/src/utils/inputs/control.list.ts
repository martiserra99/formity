import type {
  ItemValues,
  ControlValues,
  ListValues,
} from "../../types/state/values";

import type { Position, ListPosition } from "../../types/state/position";

/**
 * Creates a `ListInputs` object.
 *
 * @returns The created `ListInputs` object.
 */
export function create(): ControlValues {
  return { type: "list", list: {} };
}

/**
 * Clones a `ListInputs` object.
 *
 * @param inputs A `ListInputs` object.
 * @returns The cloned `ListInputs` object.
 */
export function clone(inputs: ListValues): ControlValues {
  return { ...inputs, list: { ...inputs.list } };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `ListInputs` object, or `null` if there is no item at the given position.
 *
 * @param inputs The `ListInputs` object.
 * @param position The position within the `ListInputs` object.
 * @returns The `ItemInputs` object at the given position within the `ListInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  inputs: ListValues,
  position: Position,
): ItemValues | null {
  const { slot } = position as ListPosition;
  if (slot in inputs.list) return inputs.list[slot];
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `ListInputs` object.
 *
 * @param inputs The `ListInputs` object.
 * @param position The position within the `ListInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  inputs: ListValues,
  position: Position,
  item: ItemValues,
): void {
  const { slot } = position as ListPosition;
  inputs.list[slot] = item;
}
