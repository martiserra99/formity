import { ListValues } from "../values";

import { Yield } from "../values/yield";
import { Return } from "../values/return";

export type OnYield<T extends ListValues> = (values: Yield<T>) => void;
export type OnReturn<T extends ListValues> = (values: Return<T>) => void;
