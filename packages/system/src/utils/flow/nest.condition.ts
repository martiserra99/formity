import type { ItemFlow, ConditionFlow } from "../../types/flow/plain";
import type { Position, ConditionPosition } from "../../types/state/position";

import * as NestFlowUtils from "./nest";

export function is(flow: ItemFlow): flow is ConditionFlow {
  return "condition" in flow;
}

export function into(
  flow: ConditionFlow,
  inputs: Record<string, unknown>,
): Position | null {
  if (flow.condition.if(inputs)) {
    if (flow.condition.then.length > 0) {
      return { type: "condition", branch: "then", slot: 0 };
    }
  } else {
    if (flow.condition.else.length > 0) {
      return { type: "condition", branch: "else", slot: 0 };
    }
  }
  return null;
}

export function next(flow: ConditionFlow, position: Position): Position | null {
  const { branch, slot } = position as ConditionPosition;
  if (slot < flow.condition[branch].length - 1) {
    return { type: "condition", branch: branch, slot: slot + 1 };
  }
  return null;
}

export function jump(flow: ConditionFlow, id: string): Position[] | null {
  for (const branch of ["then", "else"] as const) {
    for (let i = 0; i < flow.condition[branch].length; i++) {
      const item = flow.condition[branch][i];
      if (NestFlowUtils.is(item)) {
        const path = NestFlowUtils.jump(flow, id);
        if (path) {
          return [{ type: "condition", branch, slot: i }, ...path];
        }
      }
    }
  }
  return null;
}

export function at(flow: ConditionFlow, position: Position): ItemFlow {
  const { branch, slot } = position as ConditionPosition;
  return flow.condition[branch][slot];
}
