import type {
  ItemInputs,
  ControlInputs,
  SwitchInputs,
} from "../../types/state/inputs";

import type { Position, SwitchPosition } from "../../types/state/position";

/**
 * Creates a `SwitchInputs` object.
 *
 * @returns The created `SwitchInputs` object.
 */
export function create(): ControlInputs {
  return { type: "switch", branches: {}, default: {} };
}

/**
 * Clones a `SwitchInputs` object.
 *
 * @param inputs A `SwitchInputs` object.
 * @returns The cloned `SwitchInputs` object.
 */
export function clone(inputs: SwitchInputs): ControlInputs {
  return {
    ...inputs,
    branches: Object.fromEntries(
      Object.entries(inputs.branches).map(([key, value]) => [
        key,
        { ...value },
      ]),
    ),
    default: { ...inputs.default },
  };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `SwitchInputs` object, or `null` if there is no item at the given position.
 *
 * @param inputs The `SwitchInputs` object.
 * @param position The position within the `SwitchInputs` object.
 * @returns The `ItemInputs` object at the given position within the `SwitchInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  inputs: SwitchInputs,
  position: Position,
): ItemInputs | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in inputs.branches) {
      if (slot in inputs.branches[branch]) return inputs.branches[branch][slot];
    }
  } else {
    if (slot in inputs.default) return inputs.default[slot];
  }
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `SwitchInputs` object.
 *
 * @param inputs The `SwitchInputs` object.
 * @param position The position within the `SwitchInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  inputs: SwitchInputs,
  position: Position,
  item: ItemInputs,
): void {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in inputs.branches) {
      inputs.branches[branch][slot] = item;
    } else {
      inputs.branches[branch] = { [slot]: item };
    }
  } else {
    inputs.default[slot] = item;
  }
}
