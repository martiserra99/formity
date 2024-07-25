import { FlowFields } from "../../../types/fields";

export namespace CondPositionUtils {
  export function createFlowFields(): FlowFields {
    return { type: "cond", then: {}, else: {} };
  }
}
