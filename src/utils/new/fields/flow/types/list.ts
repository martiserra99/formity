import { ListFields, FlowFields, ItemFields } from "../../../../../types/new/flow/fields";
import { ListPosition, Position } from "../../../../../types/new/flow/position";

export namespace ListFieldsUtils {
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
