import type {
  ItemMemory,
  NestMemory,
  LoopMemory,
} from "../../types/state/memory";

import type { Position, LoopPosition } from "../../types/state/position";

export function create(): NestMemory {
  return { type: "loop", do: {} };
}

export function clone(memory: LoopMemory): NestMemory {
  return { ...memory, do: { ...memory.do } };
}

export function getItem(
  memory: LoopMemory,
  position: Position,
): ItemMemory | null {
  const { slot } = position as LoopPosition;
  if (slot in memory.do) return memory.do[slot];
  return null;
}

export function setItem(
  memory: LoopMemory,
  position: Position,
  item: ItemMemory,
): void {
  const { slot } = position as LoopPosition;
  memory.do[slot] = item;
}
