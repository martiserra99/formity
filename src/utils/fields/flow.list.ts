import { ListFields, FlowFields, ItemFields } from "../../types/fields";
import { ListPosition, Position } from "../../types/position";

export namespace ListFieldsUtils {
  export function clone(flow: ListFields): FlowFields {
    return {
      type: "list",
      list: { ...flow.list },
    };
  }

  export function createFlow(): FlowFields {
    return { type: "list", list: {} };
  }

  export function getItem(flow: ListFields, position: Position): ItemFields | null {
    const { index } = position as ListPosition;
    if (index in flow.list) return flow.list[index];
    return null;
  }

  export function setItem(flow: ListFields, position: Position, item: ItemFields): void {
    const { index } = position as ListPosition;
    flow.list[index] = item;
  }
}
