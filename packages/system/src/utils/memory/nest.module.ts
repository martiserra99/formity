import type {
  ItemMemory,
  NestMemory,
  ModuleMemory,
} from "../../types/state/memory";

export function create(): NestMemory {
  return { type: "module", module: undefined };
}

export function clone(memory: ModuleMemory): NestMemory {
  return { ...memory };
}

export function getItem(memory: ModuleMemory): ItemMemory | null {
  if (memory.module) return memory.module;
  return null;
}

export function setItem(memory: ModuleMemory, item: ItemMemory): void {
  memory.module = item;
}
