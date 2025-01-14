import type { State } from "./state/state";

/**
 * Callback function used to navigate to the next step of a multi-step form.
 */
export type OnNext = (values: object) => void;

/**
 * Callback function used to navigate to the previous step of a multi-step form.
 */
export type OnBack = (values: object) => void;

/**
 * Callback function used to get the current state of the multi-step form.
 */
export type GetState = (values: object) => State;

/**
 * Callback function used to set the current state of the multi-step form.
 */
export type SetState = (state: State) => void;
