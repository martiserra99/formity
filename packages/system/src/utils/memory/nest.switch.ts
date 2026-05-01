import type {
  ItemMemory,
  NestMemory,
  SwitchMemory,
} from "../../types/state/memory";

import type { Position, SwitchPosition } from "../../types/state/position";

export function create(): NestMemory {
  return { type: "switch", branches: {}, default: {} };
}

export function clone(memory: SwitchMemory): NestMemory {
  return {
    ...memory,
    branches: Object.fromEntries(
      Object.entries(memory.branches).map(([key, value]) => [
        key,
        { ...value },
      ]),
    ),
    default: { ...memory.default },
  };
}

export function getItem(
  memory: SwitchMemory,
  position: Position,
): ItemMemory | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in memory.branches) {
      if (slot in memory.branches[branch]) return memory.branches[branch][slot];
    }
  } else {
    if (slot in memory.default) return memory.default[slot];
  }
  return null;
}

export function setItem(
  memory: SwitchMemory,
  position: Position,
  item: ItemMemory,
): void {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in memory.branches) {
      memory.branches[branch][slot] = item;
    } else {
      memory.branches[branch] = { [slot]: item };
    }
  } else {
    memory.default[slot] = item;
  }
}
