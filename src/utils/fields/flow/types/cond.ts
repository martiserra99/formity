import { Value } from "expry";

import { CondFields, FlowFields, ItemFields } from "../../../../types/fields";
import { CondPosition, Position } from "../../../../types/position";

import { FlowFieldsUtils } from "../flow";

export namespace CondFieldsUtils {
  export function get(flow: CondFields, path: Position[], name: string, keys: string[], defaultValue: Value): Value {
    return FlowFieldsUtils.get(flow, path, name, keys, defaultValue);
  }

  export function set(flow: CondFields, path: Position[], name: string, keys: string[], value: Value): CondFields {
    return FlowFieldsUtils.set(flow, path, name, keys, value) as CondFields;
  }

  export function clone(flow: CondFields): FlowFields {
    return {
      type: "cond",
      then: { ...flow.then },
      else: { ...flow.else },
    };
  }

  export function newFlow(): FlowFields {
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
