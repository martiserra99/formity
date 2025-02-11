import { createContext } from "react";

import type { MultiStepValue } from "./multi-step-value";

export const MultiStepContext = createContext<MultiStepValue | null>(null);
