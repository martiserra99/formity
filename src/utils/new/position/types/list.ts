import { FlowFields } from "../../../../types/new/flow/fields";

export namespace ListPositionUtils {
  export function createFlowFields(): FlowFields {
    return { type: "list", list: {} };
  }
}
