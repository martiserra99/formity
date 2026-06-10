import type { ItemFlow, NestFlow } from "../../types/flow/plain";
import type { Position } from "../../types/state/position";

import * as ListFlowUtils from "./nest.list";
import * as ConditionFlowUtils from "./nest.condition";
import * as LoopFlowUtils from "./nest.loop";
import * as SwitchFlowUtils from "./nest.switch";
import * as JumpFlowUtils from "./nest.jump";
import * as ModuleFlowUtils from "./nest.module";

export function is(flow: ItemFlow): flow is NestFlow {
  return (
    ListFlowUtils.is(flow) ||
    ConditionFlowUtils.is(flow) ||
    LoopFlowUtils.is(flow) ||
    SwitchFlowUtils.is(flow) ||
    JumpFlowUtils.is(flow) ||
    ModuleFlowUtils.is(flow)
  );
}

export function into(
  flow: NestFlow,
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
  if (ModuleFlowUtils.is(flow)) {
    return ModuleFlowUtils.into();
  }
  throw new Error("Invalid flow");
}

export function next(
  flow: NestFlow,
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
  if (ModuleFlowUtils.is(flow)) {
    return ModuleFlowUtils.next();
  }
  throw new Error("Invalid flow");
}

export function jump(flow: NestFlow, id: unknown): Position[] | null {
  if (ListFlowUtils.is(flow)) {
    return ListFlowUtils.jump(flow, id);
  }
  if (ConditionFlowUtils.is(flow)) {
    return ConditionFlowUtils.jump(flow, id);
  }
  if (LoopFlowUtils.is(flow)) {
    return LoopFlowUtils.jump(flow, id);
  }
  if (SwitchFlowUtils.is(flow)) {
    return SwitchFlowUtils.jump(flow, id);
  }
  if (JumpFlowUtils.is(flow)) {
    return JumpFlowUtils.jump(flow, id);
  }
  if (ModuleFlowUtils.is(flow)) {
    return ModuleFlowUtils.jump(flow, id);
  }
  throw new Error("Invalid flow");
}

export function at(flow: NestFlow, position: Position): ItemFlow {
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
  if (ModuleFlowUtils.is(flow)) {
    return ModuleFlowUtils.at(flow);
  }
  throw new Error("Invalid flow");
}

export function find(flow: NestFlow, path: Position[]) {
  let current: ItemFlow = flow;
  for (const position of path) {
    const flow = current as NestFlow;
    current = at(flow, position);
  }
  return current;
}
