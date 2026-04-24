import type { ItemFlow, ReturnFlow } from "../../types/flow/plain";

export function is(flow: ItemFlow): flow is ReturnFlow {
  return "return" in flow;
}
