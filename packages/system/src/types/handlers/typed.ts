import type { Shape } from "../shape";

import type { YieldOutput } from "../output/yield";
import type { ReturnOutput } from "../output/return";

/**
 * Callback function invoked when the multi-step form yields values.
 */
export type OnYield<T extends Shape> = (values: YieldOutput<T>) => void;

/**
 * Callback function invoked when the multi-step form returns values.
 */
export type OnReturn<T extends Shape> = (values: ReturnOutput<T>) => void;
