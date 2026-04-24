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
import * as RenderUtils from "./render";

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
>(
  flow: Flow<Render, Struct, Inputs, Params>,
  onYield: OnYield<Struct>,
  inputs: Inputs,
): State {
  const plainFlow = flow as PlainFlow;
  const plainInputs = inputs as Record<string, unknown>;
  const plainOnYield = onYield as PlainOnYield;
  return NavigateUtils.initState(plainFlow, plainOnYield, plainInputs);
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
>(
  flow: Flow<Render, Struct, Inputs, Params>,
  onYield: OnYield<Struct>,
  onReturn: OnReturn<Struct>,
  state: State,
  values: Record<string, unknown>,
): State {
  const plainFlow = flow as PlainFlow;
  const plainOnYield = onYield as PlainOnYield;
  const plainOnReturn = onReturn as PlainOnReturn;
  return NavigateUtils.nextState(
    plainFlow,
    plainOnYield,
    plainOnReturn,
    state,
    values,
  );
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
>(
  flow: Flow<Render, Struct, Inputs, Params>,
  onYield: OnYield<Struct>,
  state: State,
  values: Record<string, unknown>,
): State {
  const plainFlow = flow as PlainFlow;
  const plainOnYield = onYield as PlainOnYield;
  return NavigateUtils.prevState(plainFlow, plainOnYield, state, values);
}

/**
 * Returns a new state with the values of the current form step updated.
 */
export function syncState<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(
  flow: Flow<Render, Struct, Inputs, Params>,
  state: State,
  values: Record<string, unknown>,
): State {
  const plainFlow = flow as PlainFlow;
  return StateUtils.syncState(plainFlow, state, values);
}

/**
 * Returns the rendered form for the current step of the multi-step form.
 */
export function render<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
>(
  flow: Flow<Render, Struct, Inputs, Params>,
  params: Params,
  state: State,
  onNext: OnNext<Record<string, unknown>>,
  onBack: OnBack<Record<string, unknown>>,
  getState: GetState<Record<string, unknown>>,
  setState: SetState,
): Render {
  const plainFlow = flow as PlainFlow;
  const plainParams = params as Record<string, unknown>;
  return RenderUtils.render(
    plainFlow,
    plainParams,
    state,
    onNext,
    onBack,
    getState,
    setState,
  ) as Render;
}
