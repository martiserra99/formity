import { createContext } from "react";

import type { ControllerValue } from "./controller-value";

export const ControllerContext = createContext<ControllerValue | null>(null);
