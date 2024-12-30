import type { ControllerValue } from "./controller-value";

import { useContext } from "react";
import { ControllerContext } from "./controller-context";

export function useController(): ControllerValue {
  const context = useContext(ControllerContext);

  if (!context) {
    throw new Error(
      "useController must be used within a ControllerContext.Provider"
    );
  }

  return context;
}
