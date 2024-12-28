import type {
  ItemEntries,
  FlowEntries,
  CondEntries,
} from "../../types/flow/entries";

import type { Position, CondPosition } from "../../types/flow/position";

export function create(): FlowEntries {
  return { type: "cond", then: {}, else: {} };
}

export function clone(flow: CondEntries): FlowEntries {
  return { ...flow, then: { ...flow.then }, else: { ...flow.else } };
}

export function getItem(
  flow: CondEntries,
  position: Position
): ItemEntries | null {
  const { path, slot } = position as CondPosition;
  if (path in flow) {
    if (slot in flow[path]) return flow[path][slot];
  }
  return null;
}

export function setItem(
  flow: CondEntries,
  position: Position,
  item: ItemEntries
): void {
  const { path, slot } = position as CondPosition;
  if (path in flow) flow[path][slot] = item;
  else flow[path] = { [slot]: item };
}
