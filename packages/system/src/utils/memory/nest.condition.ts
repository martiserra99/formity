import type {
  ItemMemory,
  NestMemory,
  ConditionMemory,
} from "../../types/state/memory";

import type { Position, ConditionPosition } from "../../types/state/position";

export function create(): NestMemory {
  return { type: "condition", then: {}, else: {} };
}

export function clone(memory: ConditionMemory): NestMemory {
  return { ...memory, then: { ...memory.then }, else: { ...memory.else } };
}

export function getItem(
  memory: ConditionMemory,
  position: Position,
): ItemMemory | null {
  const { branch, slot } = position as ConditionPosition;
  if (slot in memory[branch]) return memory[branch][slot];
  return null;
}

export function setItem(
  memory: ConditionMemory,
  position: Position,
  item: ItemMemory,
): void {
  const { branch, slot } = position as ConditionPosition;
  memory[branch][slot] = item;
}
