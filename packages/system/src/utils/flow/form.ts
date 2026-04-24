import type { ItemFlow, FormFlow } from "../../types/flow/plain";

export function is(flow: ItemFlow): flow is FormFlow {
  return "form" in flow;
}
