import type {
  ItemValues,
  NestValues,
  SwitchValues,
} from "../../types/state/values";

import type { Position, SwitchPosition } from "../../types/state/position";

export function create(): NestValues {
  return { type: "switch", branches: {}, default: {} };
}

export function clone(values: SwitchValues): NestValues {
  return {
    ...values,
    branches: Object.fromEntries(
      Object.entries(values.branches).map(([key, value]) => [
        key,
        { ...value },
      ]),
    ),
    default: { ...values.default },
  };
}

export function getItem(
  values: SwitchValues,
  position: Position,
): ItemValues | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in values.branches) {
      if (slot in values.branches[branch]) return values.branches[branch][slot];
    }
  } else {
    if (slot in values.default) return values.default[slot];
  }
  return null;
}

export function setItem(
  values: SwitchValues,
  position: Position,
  item: ItemValues,
): void {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (branch in values.branches) {
      values.branches[branch][slot] = item;
    } else {
      values.branches[branch] = { [slot]: item };
    }
  } else {
    values.default[slot] = item;
  }
}
