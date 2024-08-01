import { CondFields, FlowFields, ItemFields } from "../../types/fields";
import { CondPosition, Position } from "../../types/position";

export namespace CondFieldsUtils {
  export function clone(flow: CondFields): FlowFields {
    return {
      type: "cond",
      then: { ...flow.then },
      else: { ...flow.else },
    };
  }

  export function createFlow(): FlowFields {
    return { type: "cond", then: {}, else: {} };
  }

  export function getItem(flow: CondFields, position: Position): ItemFields | undefined {
    const { branch, index } = position as CondPosition;
    if (branch in flow) {
      if (index in flow[branch]) return flow[branch][index];
    }
    return undefined;
  }

  export function setItem(flow: CondFields, position: Position, value: ItemFields): void {
    const { branch, index } = position as CondPosition;
    if (branch in flow) flow[branch][index] = value;
    else flow[branch] = { [index]: value };
  }
}
