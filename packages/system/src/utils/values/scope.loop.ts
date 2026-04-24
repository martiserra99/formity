import type {
  ItemValues,
  ScopeValues,
  LoopValues,
} from "../../types/state/values";

import type { Position, LoopPosition } from "../../types/state/position";

export function create(): ScopeValues {
  return { type: "loop", list: {} };
}

export function clone(values: LoopValues): ScopeValues {
  return { ...values, list: { ...values.list } };
}

export function getItem(
  values: LoopValues,
  position: Position,
): ItemValues | null {
  const { slot } = position as LoopPosition;
  if (slot in values.list) return values.list[slot];
  return null;
}

export function setItem(
  values: LoopValues,
  position: Position,
  item: ItemValues,
): void {
  const { slot } = position as LoopPosition;
  values.list[slot] = item;
}
