import type { ItemFlow, SwitchFlow } from "../../types/flow/plain";
import type { Position, SwitchPosition } from "../../types/state/position";

export function is(flow: ItemFlow): flow is SwitchFlow {
  return "switch" in flow;
}

export function into(
  flow: SwitchFlow,
  inputs: Record<string, unknown>,
): Position | null {
  for (let i = 0; i < flow.switch.branches.length; i++) {
    const branch = flow.switch.branches[i];
    if (branch.case(inputs)) {
      if (branch.then.length > 0) {
        return { type: "switch", branch: i, slot: 0 };
      }
      return null;
    }
  }
  if (flow.switch.default.length > 0) {
    return { type: "switch", branch: -1, slot: 0 };
  }
  return null;
}

export function next(flow: SwitchFlow, position: Position): Position | null {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    if (slot < flow.switch.branches[branch].then.length - 1) {
      return { type: "switch", branch, slot: slot + 1 };
    }
    return null;
  }
  if (slot < flow.switch.default.length - 1) {
    return { type: "switch", branch: -1, slot: slot + 1 };
  }
  return null;
}

export function at(flow: SwitchFlow, position: Position): ItemFlow {
  const { branch, slot } = position as SwitchPosition;
  if (branch >= 0) {
    return flow.switch.branches[branch].then[slot];
  }
  return flow.switch.default[slot];
}
