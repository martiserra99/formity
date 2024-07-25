import { expry, Variables } from "expry";
import { useMemo } from "react";

import { Resolver } from "../types/form";
import { FormResult } from "../types/result";

export function useResolver(form: FormResult): Resolver {
  return useMemo(() => {
    return (values: Variables) => {
      const errors: Record<string, { type: string; message: string }> = {};
      for (const [name, validations] of Object.entries(form.resolver)) {
        const error = validations.find(([expr]) => !expry(expr, values));
        if (error) errors[name] = { type: "validation", message: error[1] };
      }
      return { values, errors };
    };
  }, [form]);
}
