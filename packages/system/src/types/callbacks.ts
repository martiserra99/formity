/**
 * These types define the callback functions available within the `render` function of a `FormSchema`.
 * They are essential for navigating and manipulating the flow of a multi-step form.
 */

import type { Flow } from "./flow/flow";

export type OnNext = (values: object) => void;
export type OnBack = (values: object) => void;
export type GetFlow = (values: object) => Flow;
export type SetFlow = (flow: Flow) => void;
