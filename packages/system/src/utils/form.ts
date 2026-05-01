import type { Flow, FormFlow } from "../types/flow/plain";

import type { State } from "../types/state/state";

import type {
  OnNext,
  OnBack,
  OnJump,
  GetState,
  SetState,
} from "../types/form-controls";

import * as NestFlowUtils from "./flow/nest";
import * as NestMemoryUtils from "./memory/nest";

export function getForm(options: {
  flow: Flow;
  params: Record<string, unknown>;
  state: State;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  onJump: OnJump<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
}): unknown {
  const { flow, state, params, ...controls } = options;
  const point = state.points[state.points.length - 1];
  const form = NestFlowUtils.find(flow, point.path) as FormFlow;
  const values = point.values;
  const fields = Object.fromEntries(
    Object.entries(form["form"]["fields"](values)).map(
      ([name, [value, keys]]) => {
        return [
          name,
          NestMemoryUtils.get(state.memory, point.path, name, keys, value),
        ];
      },
    ),
  );
  return form["form"]["render"]({ fields, values, params, ...controls });
}
