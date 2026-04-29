import type { Schema } from "src/types/schema";

import type { Flow } from "../types/flow/typed";
import type { Flow as PlainFlow } from "../types/flow/plain";

import type { OnYield } from "../types/handlers/typed";
import type { OnReturn } from "../types/handlers/typed";
import type { OnYield as PlainOnYield } from "../types/handlers/plain";
import type { OnReturn as PlainOnReturn } from "../types/handlers/plain";

import type { OnNext } from "src/types/form-controls";
import type { OnBack } from "src/types/form-controls";
import type { OnJump } from "src/types/form-controls";
import type { GetState } from "src/types/form-controls";
import type { SetState } from "src/types/form-controls";

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
export function initState<T extends Schema>(options: {
  flow: Flow<T>;
  onYield: OnYield<T>;
  inputs: T["inputs"];
  history: boolean;
}): State {
  const flow = options.flow as PlainFlow;
  const inputs = options.inputs as Record<string, unknown>;
  const onYield = options.onYield as PlainOnYield;
  const history = options.history;
  return NavigateUtils.initState({ flow, onYield, inputs, history });
}

/**
 * Advances past the current form step, triggering `onYield` for any yield operations
 * and `onReturn` if a return is found, and returns the state at the next form step
 * if reached, or the current one otherwise.
 */
export function nextState<T extends Schema>(options: {
  flow: Flow<T>;
  onYield: OnYield<T>;
  onReturn: OnReturn<T>;
  state: State;
  values: Record<string, unknown>;
  history: boolean;
}): State {
  const flow = options.flow as PlainFlow;
  const onYield = options.onYield as PlainOnYield;
  const onReturn = options.onReturn as PlainOnReturn;
  const state = options.state;
  const values = options.values;
  const history = options.history;
  const args = { flow, onYield, onReturn, state, values, history };
  return NavigateUtils.nextState(args);
}

/**
 * Goes back to the previous form step, triggering `onYield` for any yield
 * operations encountered along the way, and returns the state at the previous
 * form step if found, or the current one otherwise.
 */
export function prevState<T extends Schema>(options: {
  flow: Flow<T>;
  onYield: OnYield<T>;
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
 * Jumps to the jump element with the given id and returns the state at its form step,
 * or returns the current state if no matching jump element is found.
 */
export function jumpState<T extends Schema>(options: {
  flow: Flow<T>;
  state: State;
  values: Record<string, unknown>;
  history: boolean;
  id: string;
}): State {
  const id = options.id;
  const flow = options.flow as PlainFlow;
  const state = options.state;
  const values = options.values;
  const history = options.history;
  return NavigateUtils.jumpState({ flow, state, values, history, id });
}

/**
 * Returns a new state with the values of the current form step updated.
 */
export function syncState<T extends Schema>(options: {
  flow: Flow<T>;
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
export function getForm<T extends Schema>(options: {
  flow: Flow<T>;
  params: T["params"];
  state: State;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  onJump: OnJump<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
}): T["render"] {
  const flow = options.flow as PlainFlow;
  const params = options.params as Record<string, unknown>;
  const state = options.state;
  const onNext = options.onNext;
  const onBack = options.onBack;
  const onJump = options.onJump;
  const getState = options.getState;
  const setState = options.setState;
  const controls = { onNext, onBack, onJump, getState, setState };
  return FormUtils.getForm({ flow, params, state, ...controls }) as T["render"];
}
