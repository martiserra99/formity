import type { ItemFlow, ReturnFlow } from "../../types/flow/model";

export function is(flow: ItemFlow): flow is ReturnFlow {
  return "return" in flow;
}
