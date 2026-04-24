import type { Schema } from "../types/schema";

import type { Flow as TypedFlow } from "../types/flow/typed";
import type { Flow, FormFlow } from "../types/flow/model";

import type { State } from "../types/state/state";
import type { Values, ScopeValues } from "../types/state/values";

import * as ControlFlowUtils from "./flow/scope";
import * as FlowInputsUtils from "./values/scope";

/**
 * Returns the current state of the multi-step form after updating the values of the current form.
 *
 * @param state The current state of the multi-step form.
 * @param flow The `Flow` object representing the multi-step form.
 * @param values An object containing the values of the current form.
 * @returns The current state of the multi-step form after updating the values of the current form.
 */
export function getState<
  T,
  U extends Schema,
  V extends Record<string, unknown>,
  W extends Record<string, unknown>,
>(
  state: State,
  flow: TypedFlow<T, U, V, W>,
  values: Record<string, unknown>,
): State {
  const _schema = flow as Flow;
  return _getState(state, _schema, values);
}

function _getState(
  state: State,
  flow: Flow,
  values: Record<string, unknown>,
): State {
  const point = state.points[state.points.length - 1];
  const formFlow = ControlFlowUtils.find(flow, point.path) as FormFlow;
  const formValues = formFlow["form"]["values"](point.inputs);
  let inputs: ScopeValues = state.values;
  for (const [name, value] of Object.entries(values)) {
    if (name in formValues) {
      const keys = formValues[name][1];
      const path = point.path;
      inputs = FlowInputsUtils.set(inputs, path, name, keys, value);
    }
  }
  return { points: state.points, values: inputs as Values };
}
