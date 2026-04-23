import type {
  ItemInputs,
  ControlInputs,
  LoopInputs,
} from "../../types/state/inputs";

import type { Position, LoopPosition } from "../../types/state/position";

/**
 * Creates a `LoopInputs` object.
 *
 * @returns The created `LoopInputs` object.
 */
export function create(): ControlInputs {
  return { type: "loop", list: {} };
}

/**
 * Clones a `LoopInputs` object.
 *
 * @param inputs A `LoopInputs` object.
 * @returns The cloned `LoopInputs` object.
 */
export function clone(inputs: LoopInputs): ControlInputs {
  return { ...inputs, list: { ...inputs.list } };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `LoopInputs` object, or `null` if there is no item at the given position.
 *
 * @param inputs The `LoopInputs` object.
 * @param position The position within the `LoopInputs` object.
 * @returns The `ItemInputs` object at the given position within the `LoopInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  inputs: LoopInputs,
  position: Position,
): ItemInputs | null {
  const { slot } = position as LoopPosition;
  if (slot in inputs.list) return inputs.list[slot];
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `LoopInputs` object.
 *
 * @param inputs The `LoopInputs` object.
 * @param position The position within the `LoopInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  inputs: LoopInputs,
  position: Position,
  item: ItemInputs,
): void {
  const { slot } = position as LoopPosition;
  inputs.list[slot] = item;
}
