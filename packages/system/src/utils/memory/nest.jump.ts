import type {
  ItemMemory,
  NestMemory,
  JumpMemory,
} from "../../types/state/memory";

export function create(): NestMemory {
  return { type: "jump", at: undefined };
}

export function clone(memory: JumpMemory): NestMemory {
  return { ...memory };
}

export function getItem(memory: JumpMemory): ItemMemory | null {
  if (memory.at) return memory.at;
  return null;
}

export function setItem(memory: JumpMemory, item: ItemMemory): void {
  memory.at = item;
}
