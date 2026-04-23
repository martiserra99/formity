import type { ItemFlow, ConditionFlow } from "../../types/flow/model";
import type { Position, ConditionPosition } from "../../types/state/position";

/**
 * Type guard for `ConditionFlow` objects.
 *
 * @param flow An `ItemFlow` object.
 * @returns A boolean indicating whether the `flow` is a `ConditionFlow` object.
 */
export function is(flow: ItemFlow): flow is ConditionFlow {
  return "condition" in flow;
}

/**
 * Returns the initial position for the given `ConditionFlow` object if there is an initial position, otherwise it returns `null`.
 *
 * @param flow A `ConditionFlow` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(
  flow: ConditionFlow,
  values: Record<string, unknown>,
): Position | null {
  if (flow.condition.if(values)) {
    if (flow.condition.then.length > 0) {
      return { type: "condition", path: "then", slot: 0 };
    }
  } else {
    if (flow.condition.else.length > 0) {
      return { type: "condition", path: "else", slot: 0 };
    }
  }
  return null;
}

/**
 * Returns the next position for the given `ConditionFlow` object if there is a next position, otherwise it returns `null`.
 *
 * @param flow A `ConditionFlow` object.
 * @param position A `Position` object representing the current position.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(flow: ConditionFlow, position: Position): Position | null {
  const { path, slot } = position as ConditionPosition;
  if (slot < flow.condition[path].length - 1) {
    return { type: "condition", path, slot: slot + 1 };
  }
  return null;
}

/**
 * Returns the `ItemFlow` object at the given position within the given `ConditionFlow` object.
 *
 * @param flow The `ConditionFlow` object.
 * @param position The position within the `ConditionFlow` object.
 * @returns The `ItemFlow` object at the given position within the `ConditionFlow` object.
 */
export function at(flow: ConditionFlow, position: Position): ItemFlow {
  const { path, slot } = position as ConditionPosition;
  return flow.condition[path][slot];
}
