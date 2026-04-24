import type { ItemFlow, ConditionFlow } from "../../types/flow/model";
import type { Position, ConditionPosition } from "../../types/state/position";

export function is(flow: ItemFlow): flow is ConditionFlow {
  return "condition" in flow;
}

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

export function next(flow: ConditionFlow, position: Position): Position | null {
  const { path, slot } = position as ConditionPosition;
  if (slot < flow.condition[path].length - 1) {
    return { type: "condition", path, slot: slot + 1 };
  }
  return null;
}

export function at(flow: ConditionFlow, position: Position): ItemFlow {
  const { path, slot } = position as ConditionPosition;
  return flow.condition[path][slot];
}
