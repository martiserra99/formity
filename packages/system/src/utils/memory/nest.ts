import type {
  ItemMemory,
  NestMemory,
  FormMemory,
} from "../../types/state/memory";

import type { Position } from "../../types/state/position";

import * as ListMemoryUtils from "./nest.list";
import * as ConditionMemoryUtils from "./nest.condition";
import * as LoopMemoryUtils from "./nest.loop";
import * as SwitchMemoryUtils from "./nest.switch";
import * as JumpMemoryUtils from "./nest.jump";
import * as ModuleMemoryUtils from "./nest.module";
import * as FormMemoryUtils from "./form";

/**
 * Returns the value at the given path, name and keys in `NestMemory`, falling back to `defaultValue`.
 */
export function get(
  memory: NestMemory,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  defaultValue: unknown,
): unknown {
  let current: ItemMemory = memory;
  for (const position of path) {
    const memory = current as NestMemory;
    const item = getItem(memory, position);
    if (item) current = item;
    else return defaultValue;
  }
  const form = current as FormMemory;
  return FormMemoryUtils.get(form, name, keys, defaultValue);
}

/**
 * Returns a new `NestMemory` object with the value at the given path, name and keys set to `data`.
 */
export function set(
  memory: NestMemory,
  path: Position[],
  name: string,
  keys: PropertyKey[],
  data: unknown,
): NestMemory {
  const updated: NestMemory = clone(memory);
  let current: NestMemory = updated;
  for (let i = 0; i < path.length - 1; i++) {
    const position = path[i];
    const item = getItem(current, position);
    if (item) {
      const next = item as NestMemory;
      const cloned = clone(next);
      setItem(current, position, cloned);
      current = cloned;
    } else {
      const next = create(path[i + 1]);
      setItem(current, position, next);
      current = next;
    }
  }
  const position = path[path.length - 1];
  const item = getItem(current, position);
  if (item) {
    const form = item as FormMemory;
    setItem(current, position, FormMemoryUtils.set(form, name, keys, data));
  } else {
    const form: FormMemory = { [name]: { data: { here: false }, keys: {} } };
    setItem(current, position, FormMemoryUtils.set(form, name, keys, data));
  }
  return updated;
}

export function create(position: Position): NestMemory {
  switch (position.type) {
    case "list":
      return ListMemoryUtils.create();
    case "condition":
      return ConditionMemoryUtils.create();
    case "loop":
      return LoopMemoryUtils.create();
    case "switch":
      return SwitchMemoryUtils.create();
    case "jump":
      return JumpMemoryUtils.create();
    case "module":
      return ModuleMemoryUtils.create();
  }
}

export function clone(memory: NestMemory): NestMemory {
  switch (memory.type) {
    case "list":
      return ListMemoryUtils.clone(memory);
    case "condition":
      return ConditionMemoryUtils.clone(memory);
    case "loop":
      return LoopMemoryUtils.clone(memory);
    case "switch":
      return SwitchMemoryUtils.clone(memory);
    case "jump":
      return JumpMemoryUtils.clone(memory);
    case "module":
      return ModuleMemoryUtils.clone(memory);
  }
}

export function getItem(
  memory: NestMemory,
  position: Position,
): ItemMemory | null {
  switch (memory.type) {
    case "list":
      return ListMemoryUtils.getItem(memory, position);
    case "condition":
      return ConditionMemoryUtils.getItem(memory, position);
    case "loop":
      return LoopMemoryUtils.getItem(memory, position);
    case "switch":
      return SwitchMemoryUtils.getItem(memory, position);
    case "jump":
      return JumpMemoryUtils.getItem(memory);
    case "module":
      return ModuleMemoryUtils.getItem(memory);
  }
}

export function setItem(
  memory: NestMemory,
  position: Position,
  item: ItemMemory,
): void {
  switch (memory.type) {
    case "list":
      return ListMemoryUtils.setItem(memory, position, item);
    case "condition":
      return ConditionMemoryUtils.setItem(memory, position, item);
    case "loop":
      return LoopMemoryUtils.setItem(memory, position, item);
    case "switch":
      return SwitchMemoryUtils.setItem(memory, position, item);
    case "jump":
      return JumpMemoryUtils.setItem(memory, item);
    case "module":
      return ModuleMemoryUtils.setItem(memory, item);
  }
}
