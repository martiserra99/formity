import { CondFields, FlowFields, ItemFields } from "../../types/fields";
import { CondPosition, Position } from "../../types/position";

export const CondFieldsUtils = {
  clone(flow: CondFields): FlowFields {
    return {
      type: "cond",
      then: { ...flow.then },
      else: { ...flow.else },
    };
  },

  createFlow(): FlowFields {
    return { type: "cond", then: {}, else: {} };
  },

  getItem(flow: CondFields, position: Position): ItemFields | null {
    const { branch, index } = position as CondPosition;
    if (branch in flow) {
      if (index in flow[branch]) return flow[branch][index];
    }
    return null;
  },

  setItem(flow: CondFields, position: Position, value: ItemFields): void {
    const { branch, index } = position as CondPosition;
    if (branch in flow) flow[branch][index] = value;
    else flow[branch] = { [index]: value };
  },
};
