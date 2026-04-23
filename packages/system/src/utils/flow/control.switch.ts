import type { ItemFlow, SwitchFlow } from "../../types/flow/model";
import type { Position, SwitchPosition } from "../../types/state/position";

/**
 * Type guard for `SwitchFlow` objects.
 *
 * @param flow An `ItemFlow` object.
 * @returns A boolean indicating whether the `flow` is a `SwitchFlow` object.
 */
export function is(flow: ItemFlow): flow is SwitchFlow {
  return "switch" in flow;
}

/**
 * Returns the initial position for the given `SwitchFlow` object if there is an initial position, otherwise it returns `null`.
 *
 * @param flow A `SwitchFlow` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(
  flow: SwitchFlow,
  values: Record<string, unknown>,
): Position | null {
  for (let i = 0; i < flow.switch.branches.length; i++) {
    const branch = flow.switch.branches[i];
    if (branch.case(values)) {
      if (branch.then.length > 0) {
        return { type: "switch", branch: i, slot: 0 };
      }
      return null;
    }
  }
  if (flow.switch.default.length > 0) {
    return { type: "switch", branch: -1, slot: 0 };
  }
  return null;
}

/**
 * Returns the next position for the given `SwitchFlow` object if there is a next position, otherwise it returns `null`.
 *
 * @param flow A `SwitchFlow` object.
 * @param position A `Position` object representing the current position.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(flow: SwitchFlow, position: Position): Position | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (slot < flow.switch.branches[branch].then.length - 1) {
      return { type: "switch", branch, slot: slot + 1 };
    }
    return null;
  }
  if (slot < flow.switch.default.length - 1) {
    return { type: "switch", branch: -1, slot: slot + 1 };
  }
  return null;
}

/**
 * Returns the `ItemFlow` object at the given position within the given `SwitchFlow` object.
 *
 * @param flow The `SwitchFlow` object.
 * @param position The position within the `SwitchFlow` object.
 * @returns The `ItemFlow` object at the given position within the `SwitchFlow` object.
 */
export function at(flow: SwitchFlow, position: Position): ItemFlow {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    return flow.switch.branches[branch].then[slot];
  }
  return flow.switch.default[slot];
}
