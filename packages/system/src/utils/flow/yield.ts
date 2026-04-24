import type { ItemFlow, YieldFlow } from "../../types/flow/model";

export function is(flow: ItemFlow): flow is YieldFlow {
  return "yield" in flow;
}
