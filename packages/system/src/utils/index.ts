import type { Schema } from "../types/schema";

import type { Flow } from "../types/flow/typed";
import type { Flow as PlainFlow } from "../types/flow/plain";

import type { OnYield } from "../types/handlers/typed";
import type { OnReturn } from "../types/handlers/typed";
import type { OnYield as PlainOnYield } from "../types/handlers/plain";
import type { OnReturn as PlainOnReturn } from "../types/handlers/plain";

import type { OnNext } from "src/types/render";
import type { OnBack } from "src/types/render";
import type { GetState } from "src/types/render";
import type { SetState } from "src/types/render";

import type { State } from "../types/state/state";

import * as NavigateUtils from "./navigate";
import * as StateUtils from "./state";
import * as FormUtils from "./form";

/**
 * Finds the first form step in the flow, triggering `onYield` for any yield
 * operations along the way, and returns the initial state at the position of that form step.
 *
 * @throws If no form step is found or a return is encountered before reaching one.
 */
export function initState<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(options: {
  flow: Flow<Render, Struct, Inputs, Params>;
  onYield: OnYield<Struct>;
  inputs: Inputs;
}): State {
  const flow = options.flow as PlainFlow;
  const inputs = options.inputs as Record<string, unknown>;
  const onYield = options.onYield as PlainOnYield;
  return NavigateUtils.initState({ flow, onYield, inputs });
}

/**
 * Advances past the current form step, triggering `onYield` for any yield operations
 * and `onReturn` if a return is found, and returns the state at the next form step
 * if reached, or the current one otherwise.
 */
export function nextState<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(options: {
  flow: Flow<Render, Struct, Inputs, Params>;
  onYield: OnYield<Struct>;
  onReturn: OnReturn<Struct>;
  state: State;
  values: Record<string, unknown>;
}): State {
  const flow = options.flow as PlainFlow;
  const onYield = options.onYield as PlainOnYield;
  const onReturn = options.onReturn as PlainOnReturn;
  const state = options.state;
  const values = options.values;
  return NavigateUtils.nextState({ flow, onYield, onReturn, state, values });
}

/**
 * Goes back to the previous form step, triggering `onYield` for any yield
 * operations encountered along the way, and returns the state at the previous
 * form step if found, or the current one otherwise.
 */
export function prevState<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(options: {
  flow: Flow<Render, Struct, Inputs, Params>;
  onYield: OnYield<Struct>;
  state: State;
  values: Record<string, unknown>;
}): State {
  const flow = options.flow as PlainFlow;
  const onYield = options.onYield as PlainOnYield;
  const state = options.state;
  const values = options.values;
  return NavigateUtils.prevState({ flow, onYield, state, values });
}

/**
 * Returns a new state with the values of the current form step updated.
 */
export function syncState<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(options: {
  flow: Flow<Render, Struct, Inputs, Params>;
  state: State;
  values: Record<string, unknown>;
}): State {
  const flow = options.flow as PlainFlow;
  const state = options.state;
  const values = options.values;
  return StateUtils.syncState({ flow, state, values });
}

/**
 * Returns the rendered form for the current step of the multi-step form.
 */
export function getForm<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(options: {
  flow: Flow<Render, Struct, Inputs, Params>;
  params: Params;
  state: State;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
}): {
  form: Render;
  inputs: Record<string, unknown>;
  values: Record<string, unknown>;
  params: Record<string, unknown>;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
} {
  const flow = options.flow as PlainFlow;
  const params = options.params as Record<string, unknown>;
  const state = options.state;
  const onNext = options.onNext;
  const onBack = options.onBack;
  const getState = options.getState;
  const setState = options.setState;
  const controls = { onNext, onBack, getState, setState };
  return FormUtils.getForm({ flow, params, state, ...controls }) as {
    form: Render;
    inputs: Record<string, unknown>;
    values: Record<string, unknown>;
    params: Record<string, unknown>;
    onNext: OnNext<Record<string, unknown>>;
    onBack: OnBack<Record<string, unknown>>;
    getState: GetState<Record<string, unknown>>;
    setState: SetState;
  };
}
