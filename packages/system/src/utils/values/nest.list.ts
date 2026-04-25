import type {
  ItemValues,
  NestValues,
  ListValues,
} from "../../types/state/values";

import type { Position, ListPosition } from "../../types/state/position";

export function create(): NestValues {
  return { type: "list", list: {} };
}

export function clone(values: ListValues): NestValues {
  return { ...values, list: { ...values.list } };
}

export function getItem(
  values: ListValues,
  position: Position,
): ItemValues | null {
  const { slot } = position as ListPosition;
  if (slot in values.list) return values.list[slot];
  return null;
}

export function setItem(
  values: ListValues,
  position: Position,
  item: ItemValues,
): void {
  const { slot } = position as ListPosition;
  values.list[slot] = item;
}
