import type {
  ItemValues,
  NestValues,
  JumpValues,
} from "../../types/state/values";

export function create(): NestValues {
  return { type: "jump", at: undefined };
}

export function clone(values: JumpValues): NestValues {
  return { ...values };
}

export function getItem(values: JumpValues): ItemValues | null {
  if (values.at) return values.at;
  return null;
}

export function setItem(values: JumpValues, item: ItemValues): void {
  values.at = item;
}
