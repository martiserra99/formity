import { useContext } from "react";

import { FormActionsContext } from "./form-actions-context";
import { FormActionsValue } from "./form-actions-value";

export function useFormActions<
  T extends Record<string, unknown>,
>(): FormActionsValue<T> {
  const context = useContext(FormActionsContext);
  if (!context) {
    throw new Error("useFormActions must be used within a FormActions");
  }
  return context as FormActionsValue<T>;
}
