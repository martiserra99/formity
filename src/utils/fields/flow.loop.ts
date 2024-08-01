import { LoopFields, FlowFields, ItemFields } from "../../types/fields";
import { LoopPosition, Position } from "../../types/position";

export namespace LoopFieldsUtils {
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
