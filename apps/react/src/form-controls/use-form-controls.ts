import { useContext } from "react";

import { FormControlsContext } from "./form-controls-context";
import { FormControlsValue } from "./form-controls-value";

export function useFormControls<
  T extends Record<string, unknown>,
>(): FormControlsValue<T> {
  const context = useContext(FormControlsContext);
  if (!context) {
    throw new Error("useFormControls must be used within a FormControls");
  }
  return context as FormControlsValue<T>;
}
