import * as React from "react";

import { useState, useMemo, useCallback } from "react";
import { Value, Variables } from "expry";

import { Components, Parameters } from "../types/components";
import { ListSchema } from "../types/schema";
import { FormResult } from "../types/result";
import { Flow } from "../types/flow";

import { Controller } from "../classes/controller";

import { FormityContext } from "../context/formity-context";

export interface FormityProps<T extends Parameters> {
  components: Components<T>;
  schema: ListSchema;
  onReturn: OnReturn;
  initialFlow?: Flow;
}

export type OnReturn = (result: Value) => void;

export function Formity<T extends Parameters>({ components, schema, initialFlow, onReturn }: FormityProps<T>) {
  const controller = useMemo(() => new Controller(schema, components), [schema, components]);

  const [flow, setFlow] = useState<Flow>(() => {
    if (initialFlow) return initialFlow;
    return controller.initial();
  });

  const form = flow.result as FormResult;

  const handleNext = useCallback(
    (formData: Variables) => {
      const next = controller.next(flow, formData);
      if (next.result.type === "return") onReturn(next.result.return);
      else setFlow(next);
    },
    [controller, flow, onReturn]
  );

  const handleBack = useCallback(
    (formData: Variables) => {
      const previous = controller.previous(flow, formData);
      setFlow(previous);
    },
    [controller, flow]
  );

  const values = useMemo(
    () => ({
      step: flow.points.length,
      defaultValues: form.defaultValues,
      resolver: form.resolver,
      onNext: handleNext,
      onBack: handleBack,
    }),
    [flow.points.length, form.defaultValues, form.resolver, handleNext, handleBack]
  );

  return <FormityContext.Provider value={values}>{form.render(values)}</FormityContext.Provider>;
}
