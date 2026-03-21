import { createContext } from "react";

import type { MultiStepValue } from "./multi-step-value";

type Value = MultiStepValue<Record<string, unknown>> | null;

export const MultiStepContext = createContext<Value>(null);
