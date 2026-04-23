import type { Schema } from "../types/schema";

import type { Flow as TypedFlow } from "../types/flow/typed";
import type { Flow, FormFlow } from "../types/flow/model";

import type { State } from "../types/state/state";

import type { OnNext, OnBack, GetState, SetState } from "../types/render";

import * as ControlFlowUtils from "./flow/control";
import * as FlowInputsUtils from "./inputs/control";

/**
 * Returns the rendered form for the current step of the multi-step form.
 *
 * @param state The current state of the multi-step form.
 * @param flow The `Flow` object representing the multi-step form.
 * @param params An object containing the parameters for the form.
 * @param onNext A callback function used to navigate to the next step of the multi-step form.
 * @param onBack A callback function used to navigate to the previous step of the multi-step form.
 * @param getState A callback function used to get the current state of the multi-step form.
 * @param setState A callback function used to set the current state of the multi-step form.
 * @returns The rendered form for the current step of the multi-step form.
 */
export function getForm<
  T,
  U extends Schema,
  V extends Record<string, unknown>,
  W extends Record<string, unknown>,
>(
  state: State,
  flow: TypedFlow<T, U, V, W>,
  params: W,
  onNext: OnNext<Record<string, unknown>>,
  onBack: OnBack<Record<string, unknown>>,
  getState: GetState<Record<string, unknown>>,
  setState: SetState,
): T {
  const _flow = flow as Flow;
  const _params = params as Record<string, unknown>;
  return _getForm(
    state,
    _flow,
    _params,
    onNext,
    onBack,
    getState,
    setState,
  ) as T;
}

function _getForm(
  state: State,
  flow: Flow,
  params: Record<string, unknown>,
  onNext: OnNext<Record<string, unknown>>,
  onBack: OnBack<Record<string, unknown>>,
  getState: GetState<Record<string, unknown>>,
  setState: SetState,
): unknown {
  const point = state.points[state.points.length - 1];
  const form = ControlFlowUtils.find(flow, point.path) as FormFlow;
  const inputs = point.values;
  const values = Object.fromEntries(
    Object.entries(form["form"]["values"](point.values)).map(
      ([name, [value, keys]]) => {
        return [
          name,
          FlowInputsUtils.get(state.inputs, point.path, name, keys, value),
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
