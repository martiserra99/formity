import type {
  ItemEntries,
  FlowEntries,
  LoopEntries,
} from "../../types/flow/entries";

import type { Position, LoopPosition } from "../../types/flow/position";

export function create(): FlowEntries {
  return { type: "loop", list: {} };
}

export function clone(flow: LoopEntries): FlowEntries {
  return { ...flow, list: { ...flow.list } };
}

export function getItem(
  flow: LoopEntries,
  position: Position
): ItemEntries | null {
  const { slot } = position as LoopPosition;
  if (slot in flow.list) return flow.list[slot];
  return null;
}

export function setItem(
  flow: LoopEntries,
  position: Position,
  item: ItemEntries
): void {
  const { slot } = position as LoopPosition;
  flow.list[slot] = item;
}
