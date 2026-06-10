import type { Schema } from "../schema";

import type { YieldOutput } from "../output/yield";
import type { ReturnOutput } from "../output/return";

/**
 * Callback function invoked when the multi-step form yields values.
 */
export type OnYield<T extends Schema> = (output: YieldOutput<T>) => void;

/**
 * Callback function invoked when the multi-step form returns values.
 */
export type OnReturn<T extends Schema> = (output: ReturnOutput<T>) => void;
