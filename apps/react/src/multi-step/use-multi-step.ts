import { useContext } from "react";

import { MultiStepValue } from "./multi-step-value";
import { MultiStepContext } from "./multi-step-context";

export function useMultiStep(): MultiStepValue {
  const context = useContext(MultiStepContext);
  if (!context) throw new Error("useMultiStep must be used within a MultiStep");
  return context;
}
