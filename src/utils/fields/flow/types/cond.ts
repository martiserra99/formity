import { CondFields, FlowFields, ItemFields } from "../../../../types/fields";
import { CondPosition, Position } from "../../../../types/position";

export namespace CondFieldsUtils {
  export function clone(flow: CondFields): FlowFields {
    return {
      type: "cond",
      then: { ...flow.then },
      else: { ...flow.else },
    };
  }

  export function getItemFields(flow: CondFields, position: Position): ItemFields | undefined {
    const { branch, index } = position as CondPosition;
    if (index in flow[branch]) return flow[branch][index];
    else return undefined;
  }

  export function setItemFields(flow: CondFields, position: Position, value: ItemFields): void {
    const { branch, index } = position as CondPosition;
    flow[branch][index] = value;
  }
}
