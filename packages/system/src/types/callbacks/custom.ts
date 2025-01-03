/**
 * These types define the callback functions invoked when navigating between steps in a multi-step form.
 * They provide type inference for the values that are yielded and returned during the navigation process.
 */

import { ListValues } from "../values";
import { Yield } from "../values/yield";
import { Return } from "../values/return";

export type OnYield<T extends ListValues> = (values: Yield<T>) => void;
export type OnReturn<T extends ListValues> = (values: Return<T>) => void;
