import type { ItemFlow, ScopeFlow } from "../../types/flow/plain";
import type { Position } from "../../types/state/position";

import * as ListFlowUtils from "./scope.list";
import * as ConditionFlowUtils from "./scope.condition";
import * as LoopFlowUtils from "./scope.loop";
import * as SwitchFlowUtils from "./scope.switch";
import * as JumpFlowUtils from "./scope.jump";

export function is(flow: ItemFlow): flow is ScopeFlow {
  return (
    ListFlowUtils.is(flow) ||
    ConditionFlowUtils.is(flow) ||
    LoopFlowUtils.is(flow) ||
    SwitchFlowUtils.is(flow) ||
    JumpFlowUtils.is(flow)
  );
}

export function into(
  flow: ScopeFlow,
  inputs: Record<string, unknown>,
): Position | null {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.into(flow);
  }
  if (ConditionFlowUtils.is(flow)) {
    return ConditionFlowUtils.into(flow, inputs);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.into(flow, inputs);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.into(flow, inputs);
  }
  if (JumpFlowUtils.is(flow)) {
    return JumpFlowUtils.into();
  }
  throw new Error("Invalid flow");
}

export function next(
  flow: ScopeFlow,
  position: Position,
  inputs: Record<string, unknown>,
): Position | null {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.next(flow, position);
  }
  if (ConditionFlowUtils.is(flow)) {
    return ConditionFlowUtils.next(flow, position);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.next(flow, position, inputs);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.next(flow, position);
  }
  if (JumpFlowUtils.is(flow)) {
    return JumpFlowUtils.next();
  }
  throw new Error("Invalid flow");
}

export function at(flow: ScopeFlow, position: Position): ItemFlow {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.at(flow, position);
  }
  if (ConditionFlowUtils.is(flow)) {
    return ConditionFlowUtils.at(flow, position);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.at(flow, position);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.at(flow, position);
  }
  if (JumpFlowUtils.is(flow)) {
    return JumpFlowUtils.at(flow);
  }
  throw new Error("Invalid flow");
}

export function find(flow: ScopeFlow, path: Position[]) {
  let current: ItemFlow = flow;
  for (const position of path) {
    const flow = current as ScopeFlow;
    current = at(flow, position);
  }
  return current;
}
