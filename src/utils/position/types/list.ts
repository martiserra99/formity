import { FlowFields } from "../../../types/fields";

export namespace ListPositionUtils {
  export function createFlowFields(): FlowFields {
    return { type: "list", list: {} };
  }
}
