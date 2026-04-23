import type { ItemFlow, ControlFlow } from "../../types/flow/model";
import type { Position } from "../../types/state/position";

import * as ListFlowUtils from "./control.list";
import * as CondFlowUtils from "./control.condition";
import * as LoopFlowUtils from "./control.loop";
import * as SwitchFlowUtils from "./control.switch";

/**
 * Type guard for `ControlFlow` objects.
 *
 * @param flow An `ItemFlow` object.
 * @returns A boolean indicating whether the `flow` is a `ControlFlow` object.
 */
export function is(flow: ItemFlow): flow is ControlFlow {
  return (
    ListFlowUtils.is(flow) ||
    CondFlowUtils.is(flow) ||
    LoopFlowUtils.is(flow) ||
    SwitchFlowUtils.is(flow)
  );
}

/**
 * Returns the initial position for the given `ControlFlow` object if there is an initial position, otherwise it returns `null`.
 *
 * @param flow A `ControlFlow` object.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the initial position, or `null` if there is no initial position.
 */
export function into(
  flow: ControlFlow,
  values: Record<string, unknown>,
): Position | null {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.into(flow);
  }
  if (CondFlowUtils.is(flow)) {
    return CondFlowUtils.into(flow, values);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.into(flow, values);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.into(flow, values);
  }
  throw new Error("Invalid flow");
}

/**
 * Returns the next position for the given `ControlFlow` object if there is a next position, otherwise it returns `null`.
 *
 * @param flow A `ControlFlow` object.
 * @param position A `Position` object representing the current position.
 * @param values An object containing the generated values within the multi-step form.
 * @returns A `Position` object representing the next position, or `null` if there is no next position.
 */
export function next(
  flow: ControlFlow,
  position: Position,
  values: Record<string, unknown>,
): Position | null {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.next(flow, position);
  }
  if (CondFlowUtils.is(flow)) {
    return CondFlowUtils.next(flow, position);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.next(flow, position, values);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.next(flow, position);
  }
  throw new Error("Invalid flow");
}

/**
 * Returns the `ItemFlow` object at the given position within the given `ControlFlow` object.
 *
 * @param flow The `ControlFlow` object.
 * @param position The position within the `ControlFlow` object.
 * @returns The `ItemFlow` object at the given position within the `ControlFlow` object.
 */
export function at(flow: ControlFlow, position: Position): ItemFlow {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.at(flow, position);
  }
  if (CondFlowUtils.is(flow)) {
    return CondFlowUtils.at(flow, position);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.at(flow, position);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.at(flow, position);
  }
  throw new Error("Invalid flow");
}

/**
 * Returns the `ItemFlow` object at the given path within the given `ControlFlow` object.
 *
 * @param flow The `ControlFlow` object.
 * @param path The path within the `ControlFlow` object.
 * @returns The `ItemFlow` object at the given path within the `ControlFlow` object.
 */
export function find(flow: ControlFlow, path: Position[]) {
  let current: ItemFlow = flow;
  for (const position of path) {
    const flow = current as ControlFlow;
    current = at(flow, position);
  }
  return current;
}
