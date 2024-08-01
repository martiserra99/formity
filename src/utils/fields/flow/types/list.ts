import { Value } from "expry";

import { ListFields, FlowFields, ItemFields } from "../../../../types/fields";
import { ListPosition, Position } from "../../../../types/position";

import { FlowFieldsUtils } from "../flow";

export namespace ListFieldsUtils {
  export function set(flow: ListFields, path: Position[], name: string, keys: string[], value: Value): ListFields {
    return FlowFieldsUtils.set(flow, path, name, keys, value) as ListFields;
  }

  export function clone(flow: ListFields): FlowFields {
    return {
      type: "list",
      list: { ...flow.list },
    };
  }

  export function getItemFields(flow: ListFields, position: Position): ItemFields | undefined {
    const { index } = position as ListPosition;
    if (index in flow.list) return flow.list[index];
    else return undefined;
  }

  export function setItemFields(flow: ListFields, position: Position, item: ItemFields): void {
    const listPosition = position as ListPosition;
    const index = listPosition.index;
    flow.list[index] = item;
  }
}
