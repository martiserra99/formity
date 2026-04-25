import type { State } from "./state/state";

/**
 * Callback function used to navigate to the next step of a multi-step form.
 */
export type OnNext<Values extends Record<string, unknown>> = (
  values: Values,
) => void;

/**
 * Callback function used to navigate to the previous step of a multi-step form.
 */
export type OnBack<Values extends Record<string, unknown>> = (
  values: Values,
) => void;

/**
 * Callback function used to get the current state of a multi-step form.
 */
export type GetState<Values extends Record<string, unknown>> = (
  values: Values,
) => State;

/**
 * Callback function used to set the current state of a multi-step form.
 */
export type SetState = (state: State) => void;
