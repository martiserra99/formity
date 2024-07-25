import { FlowFields } from "../../../types/fields";

export namespace LoopPositionUtils {
  export function createFlowFields(): FlowFields {
    return { type: "loop", list: {} };
  }
}
