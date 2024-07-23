import * as React from "react";

import { useState, useMemo, useCallback } from "react";
import { Value, Variables } from "expry";

import { Components, Parameters } from "./types/components";
import { ListSchemaType } from "./types/schema";
import { FormResult } from "./types/result";

import { Controller } from "./classes/controller";
import { Flow } from "./classes/flow";

import { FormityContext } from "./context/formity-context";

interface FormityProps<T extends Parameters> {
  components: Components<T>;
  schema: ListSchemaType;
  onReturn: (result: Value) => void;
}

export function Formity<T extends Parameters>({ components, schema, onReturn }: FormityProps<T>) {
  const controller = useMemo(() => new Controller(schema, components), [schema, components]);

  const [flow, setFlow] = useState<Flow>(() => controller.initial());

  const form = flow.result as FormResult;

  const handleNext = useCallback(
    (formData: Variables) => {
      const next = controller.next(flow, formData);
      if (next.result.type === "form") setFlow(next);
      else return onReturn(next.result.return);
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
