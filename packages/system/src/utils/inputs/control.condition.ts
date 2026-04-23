import type {
  ItemInputs,
  ControlInputs,
  ConditionInputs,
} from "../../types/state/inputs";

import type { Position, ConditionPosition } from "../../types/state/position";

/**
 * Creates a `CondInputs` object.
 *
 * @returns The created `CondInputs` object.
 */
export function create(): ControlInputs {
  return { type: "condition", then: {}, else: {} };
}

/**
 * Clones a `CondInputs` object.
 *
 * @param inputs A `CondInputs` object.
 * @returns The cloned `CondInputs` object.
 */
export function clone(inputs: ConditionInputs): ControlInputs {
  return { ...inputs, then: { ...inputs.then }, else: { ...inputs.else } };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `CondInputs` object, or `null` if there is no item at the given position.
 *
 * @param inputs The `CondInputs` object.
 * @param position The position within the `CondInputs` object.
 * @returns The `ItemInputs` object at the given position within the `CondInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  inputs: ConditionInputs,
  position: Position,
): ItemInputs | null {
  const { path, slot } = position as ConditionPosition;
  if (slot in inputs[path]) return inputs[path][slot];
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `CondInputs` object.
 *
 * @param inputs The `CondInputs` object.
 * @param position The position within the `CondInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  inputs: ConditionInputs,
  position: Position,
  item: ItemInputs,
): void {
  const { path, slot } = position as ConditionPosition;
  inputs[path][slot] = item;
}
