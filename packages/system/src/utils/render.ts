import type { Flow, FormFlow } from "../types/flow/plain";

import type { State } from "../types/state/state";

import type { OnNext, OnBack, GetState, SetState } from "../types/render";

import * as NestFlowUtils from "./flow/nest";
import * as NestValuesUtils from "./values/nest";

export function render(
  flow: Flow,
  params: Record<string, unknown>,
  state: State,
  onNext: OnNext<Record<string, unknown>>,
  onBack: OnBack<Record<string, unknown>>,
  getState: GetState<Record<string, unknown>>,
  setState: SetState,
): unknown {
  const point = state.points[state.points.length - 1];
  const form = NestFlowUtils.find(flow, point.path) as FormFlow;
  const inputs = point.inputs;
  const values = Object.fromEntries(
    Object.entries(form["form"]["values"](point.inputs)).map(
      ([name, [value, keys]]) => {
        return [
          name,
          NestValuesUtils.get(state.values, point.path, name, keys, value),
        ];
      },
    ),
  );
  return form["form"]["render"]({
    inputs,
    values,
    params,
    onNext,
    onBack,
    getState,
    setState,
  });
}
