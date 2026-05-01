import type {
  ItemMemory,
  NestMemory,
  ListMemory,
} from "../../types/state/memory";

import type { Position, ListPosition } from "../../types/state/position";

export function create(): NestMemory {
  return { type: "list", list: {} };
}

export function clone(memory: ListMemory): NestMemory {
  return { ...memory, list: { ...memory.list } };
}

export function getItem(
  memory: ListMemory,
  position: Position,
): ItemMemory | null {
  const { slot } = position as ListPosition;
  if (slot in memory.list) return memory.list[slot];
  return null;
}

export function setItem(
  memory: ListMemory,
  position: Position,
  item: ItemMemory,
): void {
  const { slot } = position as ListPosition;
  memory.list[slot] = item;
}
