import type { ItemFlow, VariablesFlow } from "../../types/flow/model";

export function is(flow: ItemFlow): flow is VariablesFlow {
  return "variables" in flow;
}
