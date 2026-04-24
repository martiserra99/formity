import type {
  ItemValues,
  ScopeValues,
  ConditionValues,
} from "../../types/state/values";

import type { Position, ConditionPosition } from "../../types/state/position";

export function create(): ScopeValues {
  return { type: "condition", then: {}, else: {} };
}

export function clone(values: ConditionValues): ScopeValues {
  return { ...values, then: { ...values.then }, else: { ...values.else } };
}

export function getItem(
  values: ConditionValues,
  position: Position,
): ItemValues | null {
  const { path, slot } = position as ConditionPosition;
  if (slot in values[path]) return values[path][slot];
  return null;
}

export function setItem(
  values: ConditionValues,
  position: Position,
  item: ItemValues,
): void {
  const { path, slot } = position as ConditionPosition;
  values[path][slot] = item;
}
