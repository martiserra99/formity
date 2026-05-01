import type { Flow, FormFlow } from "../types/flow/plain";

import type { State } from "../types/state/state";
import type { Memory, NestMemory } from "../types/state/memory";

import * as NestFlowUtils from "./flow/nest";
import * as NestMemoryUtils from "./memory/nest";

export function syncState(options: {
  flow: Flow;
  state: State;
  fields: Record<string, unknown>;
}): State {
  const { flow, state, fields } = options;
  const point = state.points[state.points.length - 1];
  const path = point.path;
  const formFlow = NestFlowUtils.find(flow, point.path) as FormFlow;
  const formFields = formFlow["form"]["fields"](point.values);
  let memory: NestMemory = state.memory;
  for (const [name, value] of Object.entries(fields)) {
    if (name in formFields) {
      const keys = formFields[name][1];
      memory = NestMemoryUtils.set(memory, path, name, keys, value);
    }
  }
  return { points: state.points, memory: memory as Memory };
}
