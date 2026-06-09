import type { State } from "./state/state";

/**
 * Callback function used to navigate to the next step of a multi-step form.
 */
export type Next<Fields extends Record<string, unknown>> = (
  fields: Fields,
) => void;

/**
 * Callback function used to navigate to the previous step of a multi-step form.
 */
export type Back<Fields extends Record<string, unknown>> = (
  fields: Fields,
) => void;

/**
 * Callback function used to jump to the corresponding jump element of a multi-step form.
 */
export type Jump<Fields extends Record<string, unknown>> = (
  id: unknown,
  fields: Fields,
) => void;

/**
 * Callback function used to get the current state of a multi-step form.
 */
export type GetState<Fields extends Record<string, unknown>> = (
  fields: Fields,
) => State;

/**
 * Callback function used to set the current state of a multi-step form.
 */
export type SetState = (state: State) => void;
