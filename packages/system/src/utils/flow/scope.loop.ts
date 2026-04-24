import type { ItemFlow, LoopFlow } from "../../types/flow/model";
import type { Position, LoopPosition } from "../../types/state/position";

export function is(flow: ItemFlow): flow is LoopFlow {
  return "loop" in flow;
}

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

export function at(flow: LoopFlow, position: Position): ItemFlow {
  const { slot } = position as LoopPosition;
  return flow.loop.do[slot];
}
