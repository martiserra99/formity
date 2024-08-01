import { Value } from "expry";

import { ListFields, FlowFields, ItemFields } from "../../../../types/fields";
import { ListPosition, Position } from "../../../../types/position";

import { FlowFieldsUtils } from "../flow";

export namespace ListFieldsUtils {
  export function get(flow: ListFields, path: Position[], name: string, keys: string[], defaultValue: Value): Value {
    return FlowFieldsUtils.get(flow, path, name, keys, defaultValue);
  }

  export function set(flow: ListFields, path: Position[], name: string, keys: string[], value: Value): ListFields {
    return FlowFieldsUtils.set(flow, path, name, keys, value) as ListFields;
  }

  export function clone(flow: ListFields): FlowFields {
    return {
      type: "list",
      list: { ...flow.list },
    };
  }

  export function newFlow(): FlowFields {
    return { type: "list", list: {} };
  }

  export function getItem(flow: ListFields, position: Position): ItemFields | undefined {
    const { index } = position as ListPosition;
    if (index in flow.list) return flow.list[index];
    return undefined;
  }

  export function setItem(flow: ListFields, position: Position, item: ItemFields): void {
    const { index } = position as ListPosition;
    flow.list[index] = item;
  }
}
