import type { Flow, FormFlow } from "../types/flow/plain";

import type { State } from "../types/state/state";

import type { OnNext, OnBack, GetState, SetState } from "../types/form-actions";

import * as NestFlowUtils from "./flow/nest";
import * as NestValuesUtils from "./values/nest";

export function getForm(options: {
  flow: Flow;
  params: Record<string, unknown>;
  state: State;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
}): {
  form: unknown;
  inputs: Record<string, unknown>;
  values: Record<string, unknown>;
  params: Record<string, unknown>;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
} {
  const { flow, state, ...rest } = options;
  const point = state.points[state.points.length - 1];
  const form = NestFlowUtils.find(flow, point.path) as FormFlow;
  const inputs = point.inputs;
  const values = Object.fromEntries(
    Object.entries(form["form"]["values"](inputs)).map(
      ([name, [value, keys]]) => {
        return [
          name,
          NestValuesUtils.get(state.values, point.path, name, keys, value),
        ];
      },
    ),
  );
  const params = { ...rest, inputs, values };
  return { form: form["form"]["render"](params), ...params };
}
