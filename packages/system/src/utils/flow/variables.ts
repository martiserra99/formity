import type { ItemFlow, VariablesFlow } from "../../types/flow/plain";

export function is(flow: ItemFlow): flow is VariablesFlow {
  return "variables" in flow;
}
