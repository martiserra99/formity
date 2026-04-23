import type { ItemFlow, LoopFlow } from "../../types/flow/model";
import type { Position, LoopPosition } from "../../types/state/position";

/**
 * Type guard for `LoopFlow` objects.
 *
 * @param flow An `ItemFlow` object.
 * @returns A boolean indicating whether the `flow` is a `LoopFlow` object.
 */
export function is(flow: ItemFlow): flow is LoopFlow {
  return "loop" in flow;
}

/**
 * Returns the initial position for the given `LoopFlow` object if there is an initial position, otherwise it returns `null`.
 *
 * @param flow A `LoopFlow` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(
  flow: LoopFlow,
  values: Record<string, unknown>,
): Position | null {
  if (flow.loop.while(values)) {
    if (flow.loop.do.length > 0) {
      return { type: "loop", slot: 0 };
    }
  }
  return null;
}

/**
 * Returns the next position for the given `LoopFlow` object if there is a next position, otherwise it returns `null`.
 *
 * @param flow A `LoopFlow` object.
 * @param position A `Position` object representing the current position.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(
  flow: LoopFlow,
  position: Position,
  values: Record<string, unknown>,
): Position | null {
  const { slot } = position as LoopPosition;
  if (slot < flow.loop.do.length - 1) {
    return { type: "loop", slot: slot + 1 };
  }
  if (flow.loop.while(values)) {
    return { type: "loop", slot: 0 };
  }
  return null;
}

/**
 * Returns the `ItemFlow` object at the given position within the given `LoopFlow` object.
 *
 * @param flow The `LoopFlow` object.
 * @param position The position within the `LoopFlow` object.
 * @returns The `ItemFlow` object at the given position within the `LoopFlow` object.
 */
export function at(flow: LoopFlow, position: Position): ItemFlow {
  const { slot } = position as LoopPosition;
  return flow.loop.do[slot];
}
