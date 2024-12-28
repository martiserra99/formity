import type {
  ItemEntries,
  FlowEntries,
  ListEntries,
} from "../../types/flow/entries";

import type { Position, ListPosition } from "../../types/flow/position";

export function create(): FlowEntries {
  return { type: "list", list: {} };
}

export function clone(flow: ListEntries): FlowEntries {
  return { ...flow, list: { ...flow.list } };
}

export function getItem(
  flow: ListEntries,
  position: Position
): ItemEntries | null {
  const { slot } = position as ListPosition;
  if (slot in flow.list) return flow.list[slot];
  return null;
}

export function setItem(
  flow: ListEntries,
  position: Position,
  item: ItemEntries
): void {
  const { slot } = position as ListPosition;
  flow.list[slot] = item;
}
