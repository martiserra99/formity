import type { ItemFlow, ListFlow } from "../../types/flow/plain";
import type { Position, ListPosition } from "../../types/state/position";

import * as NestFlowUtils from "./nest";

export function is(flow: ItemFlow): flow is ListFlow {
  return Array.isArray(flow);
}

export function into(flow: ListFlow): Position | null {
  if (flow.length > 0) {
    return { type: "list", slot: 0 };
  }
  return null;
}

export function next(flow: ListFlow, position: Position): Position | null {
  const { slot } = position as ListPosition;
  if (slot < flow.length - 1) {
    return { type: "list", slot: slot + 1 };
  }
  return null;
}

export function jump(flow: ListFlow, id: unknown): Position[] | null {
  for (let i = 0; i < flow.length; i++) {
    const item = flow[i];
    if (NestFlowUtils.is(item)) {
      const path = NestFlowUtils.jump(item, id);
      if (path) {
        return [{ type: "list", slot: i }, ...path];
      }
    }
  }
  return null;
}

export function at(flow: ListFlow, position: Position): ItemFlow {
  const { slot } = position as ListPosition;
  return flow[slot];
}
