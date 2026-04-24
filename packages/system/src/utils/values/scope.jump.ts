import type {
  ItemValues,
  ScopeValues,
  JumpValues,
} from "../../types/state/values";

export function create(): ScopeValues {
  return { type: "jump", item: undefined };
}

export function clone(values: JumpValues): ScopeValues {
  return { ...values };
}

export function getItem(values: JumpValues): ItemValues | null {
  if (values.item) return values.item;
  return null;
}

export function setItem(values: JumpValues, item: ItemValues): void {
  values.item = item;
}
