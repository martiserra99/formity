import type { ItemFlow, JumpFlow } from "../../types/flow/plain";
import type { Position } from "../../types/state/position";

export function is(flow: ItemFlow): flow is JumpFlow {
  return "jump" in flow;
}

export function into(): Position | null {
  return { type: "jump" };
}

export function next(): Position | null {
  return null;
}

export function at(flow: JumpFlow): ItemFlow {
  return flow.jump.at;
}
