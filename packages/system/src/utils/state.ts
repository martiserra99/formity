import type { Flow, FormFlow } from "../types/flow/plain";

import type { State } from "../types/state/state";
import type { Values, NestValues } from "../types/state/values";

import * as NestFlowUtils from "./flow/nest";
import * as FlowInputsUtils from "./values/nest";

export function syncState(options: {
  flow: Flow;
  state: State;
  values: Record<string, unknown>;
}): State {
  const { flow, state, values } = options;
  const point = state.points[state.points.length - 1];
  const path = point.path;
  const formFlow = NestFlowUtils.find(flow, point.path) as FormFlow;
  const formValues = formFlow["form"]["values"](point.inputs);
  let stateValues: NestValues = state.values;
  for (const [name, value] of Object.entries(values)) {
    if (name in formValues) {
      const keys = formValues[name][1];
      stateValues = FlowInputsUtils.set(stateValues, path, name, keys, value);
    }
  }
  return { points: state.points, values: stateValues as Values };
}
