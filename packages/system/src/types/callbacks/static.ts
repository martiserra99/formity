/**
 * These types define the callback functions invoked when navigating between steps in a multi-step form.
 */

export type OnYield = (values: object) => void;
export type OnReturn = (values: object) => void;
