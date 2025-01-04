import type { ListValues } from "../values";

import type { Yield } from "../values/yield";
import type { Return } from "../values/return";

/**
 * Callback function invoked when the multi-step form yields values.
 */
export type OnYield<T extends ListValues> = (values: Yield<T>) => void;

/**
 * Callback function invoked when the multi-step form returns values.
 */
export type OnReturn<T extends ListValues> = (values: Return<T>) => void;
