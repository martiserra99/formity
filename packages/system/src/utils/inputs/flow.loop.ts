import type {
  ItemInputs,
  FlowInputs,
  LoopInputs,
} from "../../types/state/inputs";

import type { Position, LoopPosition } from "../../types/state/position";

/**
 * Creates a `LoopInputs` object.
 *
 * @returns The created `LoopInputs` object.
 */
export function create(): FlowInputs {
  return { type: "loop", list: {} };
}

/**
 * Clones a `LoopInputs` object.
 *
 * @param flow A `LoopInputs` object.
 * @returns The cloned `LoopInputs` object.
 */
export function clone(flow: LoopInputs): FlowInputs {
  return { ...flow, list: { ...flow.list } };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `LoopInputs` object, or `null` if there is no item at the given position.
 *
 * @param flow The `LoopInputs` object.
 * @param position The position within the `LoopInputs` object.
 * @returns The `ItemInputs` object at the given position within the `LoopInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: LoopInputs,
  position: Position
): ItemInputs | null {
  const { slot } = position as LoopPosition;
  if (slot in flow.list) return flow.list[slot];
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `LoopInputs` object.
 *
 * @param flow The `LoopInputs` object.
 * @param position The position within the `LoopInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  flow: LoopInputs,
  position: Position,
  item: ItemInputs
): void {
  const { slot } = position as LoopPosition;
  flow.list[slot] = item;
}
