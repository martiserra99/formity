import type { ItemFlow, YieldFlow } from "../../types/flow/plain";

export function is(flow: ItemFlow): flow is YieldFlow {
  return "yield" in flow;
}
