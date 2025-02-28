import type { Values } from "../values";

import type { YieldOutput } from "../output/yield";
import type { ReturnOutput } from "../output/return";

/**
 * Callback function invoked when the multi-step form yields values.
 */
export type OnYield<V extends Values> = (values: YieldOutput<V>) => void;

/**
 * Callback function invoked when the multi-step form returns values.
 */
export type OnReturn<V extends Values> = (values: ReturnOutput<V>) => void;
