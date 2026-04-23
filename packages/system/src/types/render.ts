import type { State } from "./state/state";

/**
 * Callback function used to navigate to the next step of a multi-step form.
 */
export type OnNext<T extends Record<string, unknown>> = (values: T) => void;

/**
 * Callback function used to navigate to the previous step of a multi-step form.
 */
export type OnBack<T extends Record<string, unknown>> = (values: T) => void;

/**
 * Callback function used to get the current state of a multi-step form.
 */
export type GetState<T extends Record<string, unknown>> = (values: T) => State;

/**
 * Callback function used to set the current state of a multi-step form.
 */
export type SetState = (state: State) => void;
