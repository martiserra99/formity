import { FlowFields } from "../../../../types/new/flow/fields";

export namespace CondPositionUtils {
  export function createFlowFields(): FlowFields {
    return { type: "cond", then: {}, else: {} };
  }
}
