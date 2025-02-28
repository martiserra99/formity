import type { ListValues } from "../values";

import type { YieldOutput } from "../output/yield";
import type { ReturnOutput } from "../output/return";

/**
 * Callback function invoked when the multi-step form yields values.
 */
export type OnYield<T extends ListValues> = (values: YieldOutput<T>) => void;

/**
 * Callback function invoked when the multi-step form returns values.
 */
export type OnReturn<T extends ListValues> = (values: ReturnOutput<T>) => void;
