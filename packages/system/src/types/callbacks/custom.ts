import { ListValues } from "../values";
import { Yield } from "../values/yield";
import { Return } from "../values/return";

/**
 * Callback function invoked when the multi-step form yields values.
 */
export type OnYield<T extends ListValues> = (values: Yield<T>) => void;

/**
 * Callback function invoked when the multi-step form returns values.
 */
export type OnReturn<T extends ListValues> = (values: Return<T>) => void;
