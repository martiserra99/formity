import { FlowFields } from "../../../../types/new/flow/fields";

export namespace LoopPositionUtils {
  export function createFlowFields(): FlowFields {
    return { type: "loop", list: {} };
  }
}
