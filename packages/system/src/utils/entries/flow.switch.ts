import type {
  ItemEntries,
  FlowEntries,
  SwitchEntries,
} from "../../types/flow/entries";

import type { Position, SwitchPosition } from "../../types/flow/position";

/**
 * Creates a `SwitchEntries` object.
 *
 * @returns The created `SwitchEntries` object.
 */
export function create(): FlowEntries {
  return { type: "switch", branches: {}, default: {} };
}

/**
 * Clones a `SwitchEntries` object.
 *
 * @param flow A `SwitchEntries` object.
 * @returns The cloned `SwitchEntries` object.
 */
export function clone(flow: SwitchEntries): FlowEntries {
  return {
    ...flow,
    branches: Object.fromEntries(
      Object.entries(flow.branches).map(([key, value]) => [key, { ...value }])
    ),
    default: { ...flow.default },
  };
}

/**
 * Returns the `ItemEntries` object at the given position within the given `SwitchEntries` object, or `null` if there is no item at the given position.
 *
 * @param flow The `SwitchEntries` object.
 * @param position The position within the `SwitchEntries` object.
 * @returns The `ItemEntries` object at the given position within the `SwitchEntries` object, or `null` if there is no item at the given position.
 */
export function getItem(
  flow: SwitchEntries,
  position: Position
): ItemEntries | null {
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
 * Sets the `ItemEntries` object at the given position within the given `SwitchEntries` object.
 *
 * @param flow The `SwitchEntries` object.
 * @param position The position within the `SwitchEntries` object.
 * @param item The `ItemEntries` object to set.
 */
export function setItem(
  flow: SwitchEntries,
  position: Position,
  item: ItemEntries
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
