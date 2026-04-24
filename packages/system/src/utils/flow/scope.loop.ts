import type { ItemFlow, LoopFlow } from "../../types/flow/plain";
import type { Position, LoopPosition } from "../../types/state/position";

export function is(flow: ItemFlow): flow is LoopFlow {
  return "loop" in flow;
}

export function into(
  flow: LoopFlow,
  inputs: Record<string, unknown>,
): Position | null {
  if (flow.loop.while(inputs)) {
    if (flow.loop.do.length > 0) {
      return { type: "loop", slot: 0 };
    }
  }
  return null;
}

export function next(
  flow: LoopFlow,
  position: Position,
  inputs: Record<string, unknown>,
): Position | null {
  const { slot } = position as LoopPosition;
  if (slot < flow.loop.do.length - 1) {
    return { type: "loop", slot: slot + 1 };
  }
  if (flow.loop.while(inputs)) {
    return { type: "loop", slot: 0 };
  }
  return null;
}

export function at(flow: LoopFlow, position: Position): ItemFlow {
  const { slot } = position as LoopPosition;
  return flow.loop.do[slot];
}
