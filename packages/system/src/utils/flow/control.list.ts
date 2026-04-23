import type { ItemFlow, ListFlow } from "../../types/flow/model";
import type { Position, ListPosition } from "../../types/state/position";

/**
 * Type guard for `ListFlow` objects.
 *
 * @param flow An `ItemFlow` object.
 * @returns A boolean indicating whether the `flow` is a `ListFlow` object.
 */
export function is(flow: ItemFlow): flow is ListFlow {
  return Array.isArray(flow);
}

/**
 * Returns the initial position for the given `ListFlow` object if there is an initial position, otherwise it returns `null`.
 *
 * @param flow A `ListFlow` object.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(flow: ListFlow): Position | null {
  if (flow.length > 0) {
    return { type: "list", slot: 0 };
  }
  return null;
}

/**
 * Returns the next position for the given `ListFlow` object if there is a next position, otherwise it returns `null`.
 *
 * @param flow A `ListFlow` object.
 * @param position A `Position` object representing the current position.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(flow: ListFlow, position: Position): Position | null {
  const { slot } = position as ListPosition;
  if (slot < flow.length - 1) {
    return { type: "list", slot: slot + 1 };
  }
  return null;
}

/**
 * Returns the `ItemFlow` object at the given position within the given `ListFlow` object.
 *
 * @param flow The `ListFlow` object.
 * @param position The position within the `ListFlow` object.
 * @returns The `ItemFlow` object at the given position within the `ListFlow` object.
 */
export function at(flow: ListFlow, position: Position): ItemFlow {
  const { slot } = position as ListPosition;
  return flow[slot];
}
