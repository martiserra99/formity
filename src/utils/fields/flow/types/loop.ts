import { LoopFields, FlowFields, ItemFields } from "../../../../types/fields";
import { LoopPosition, Position } from "../../../../types/position";

export namespace LoopFieldsUtils {
  export function clone(flow: LoopFields): FlowFields {
    return {
      type: "loop",
      list: { ...flow.list },
    };
  }

  export function getItemFields(flow: LoopFields, position: Position): ItemFields | undefined {
    const { index } = position as LoopPosition;
    if (index in flow.list) return flow.list[index];
    else return undefined;
  }

  export function setItemFields(flow: LoopFields, position: Position, item: ItemFields): void {
    const listPosition = position as LoopPosition;
    const index = listPosition.index;
    flow.list[index] = item;
  }
}
