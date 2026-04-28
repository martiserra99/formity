import { createContext } from "react";

import type { FormControlsValue } from "./form-controls-value";

type Value = FormControlsValue<Record<string, unknown>> | null;

export const FormControlsContext = createContext<Value>(null);
