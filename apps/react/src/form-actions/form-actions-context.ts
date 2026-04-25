import { createContext } from "react";

import type { FormActionsValue } from "./form-actions-value";

type Value = FormActionsValue<Record<string, unknown>> | null;

export const FormActionsContext = createContext<Value>(null);
