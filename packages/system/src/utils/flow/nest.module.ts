import type { ItemFlow, ModuleFlow } from "../../types/flow/plain";
import type { Position } from "../../types/state/position";

import * as NestFlowUtils from "./nest";

export function is(flow: ItemFlow): flow is ModuleFlow {
  return "module" in flow;
}

export function into(): Position | null {
  return { type: "module" };
}

export function next(): Position | null {
  return null;
}

export function jump(flow: ModuleFlow, id: unknown): Position[] | null {
  for (let i = 0; i < flow.module.length; i++) {
    const item = flow.module[i];
    if (NestFlowUtils.is(item)) {
      const path = NestFlowUtils.jump(item, id);
      if (path) {
        return [{ type: "loop", slot: i }, ...path];
      }
    }
  }
  return null;
}

export function at(flow: ModuleFlow): ItemFlow {
  return flow.module;
}
