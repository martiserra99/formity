import type {
  ItemInputs,
  FlowInputs,
  SwitchInputs,
} from "../../types/state/inputs";

import type { Position, SwitchPosition } from "../../types/state/position";

/**
 * Creates a `SwitchInputs` object.
 *
 * @returns The created `SwitchInputs` object.
 */
export function create(): FlowInputs {
  return { type: "switch", branches: {}, default: {} };
}

/**
 * Clones a `SwitchInputs` object.
 *
 * @param flow A `SwitchInputs` object.
 * @returns The cloned `SwitchInputs` object.
 */
export function clone(flow: SwitchInputs): FlowInputs {
  return {
    ...flow,
    branches: Object.fromEntries(
      Object.entries(flow.branches).map(([key, value]) => [key, { ...value }])
    ),
    default: { ...flow.default },
  };
}

/**
 * Returns the `ItemInputs` object at the given position within the given `SwitchInputs` object, or `null` if there is no item at the given position.
 *
 * @param flow The `SwitchInputs` object.
 * @param position The position within the `SwitchInputs` object.
 * @returns The `ItemInputs` object at the given position within the `SwitchInputs` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: SwitchInputs,
  position: Position
): ItemInputs | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in flow.branches) {
      if (slot in flow.branches[branch]) return flow.branches[branch][slot];
    }
  } else {
    if (slot in flow.default) return flow.default[slot];
  }
  return null;
}

/**
 * Sets the `ItemInputs` object at the given position within the given `SwitchInputs` object.
 *
 * @param flow The `SwitchInputs` object.
 * @param position The position within the `SwitchInputs` object.
 * @param item The `ItemInputs` object to set.
 */
export function setItem(
  flow: SwitchInputs,
  position: Position,
  item: ItemInputs
): void {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in flow.branches) {
      flow.branches[branch][slot] = item;
    } else {
      flow.branches[branch] = { [slot]: item };
    }
  } else {
    flow.default[slot] = item;
  }
}
