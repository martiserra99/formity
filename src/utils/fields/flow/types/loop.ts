import { Value } from "expry";

import { LoopFields, FlowFields, ItemFields } from "../../../../types/fields";
import { LoopPosition, Position } from "../../../../types/position";

import { FlowFieldsUtils } from "../flow";

export namespace LoopFieldsUtils {
  export function get(flow: LoopFields, path: Position[], name: string, keys: string[], defaultValue: Value): Value {
    return FlowFieldsUtils.get(flow, path, name, keys, defaultValue);
  }

  export function set(flow: LoopFields, path: Position[], name: string, keys: string[], value: Value): LoopFields {
    return FlowFieldsUtils.set(flow, path, name, keys, value) as LoopFields;
  }

  export function clone(flow: LoopFields): FlowFields {
    return {
      type: "loop",
      list: { ...flow.list },
    };
  }

  export function newFlow(): FlowFields {
    return { type: "loop", list: {} };
  }

  export function getItem(flow: LoopFields, position: Position): ItemFields | undefined {
    const { index } = position as LoopPosition;
    if (index in flow.list) return flow.list[index];
    return undefined;
  }

  export function setItem(flow: LoopFields, position: Position, item: ItemFields): void {
    const { index } = position as LoopPosition;
    flow.list[index] = item;
  }
}
