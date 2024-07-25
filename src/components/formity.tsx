import * as React from "react";

import { useState, useMemo, useCallback } from "react";
import { Value, Variables } from "expry";

import { Components, Parameters } from "../types/components";
import { ListSchema } from "../types/schema";
import { FormResult } from "../types/result";
import { Flow } from "../types/flow";

import { Controller } from "../classes/controller";

import { useDefaultValues } from "../hooks/use-default-values";
import { useResolver } from "../hooks/use-resolver";
import { useRender } from "../hooks/use-render";

import { FormityContext } from "../context/formity-context";
import { FlowUtils } from "../utils/flow";

export interface FormityProps<T extends Parameters> {
  components: Components<T>;
  schema: ListSchema;
  onReturn: OnReturn;
  initialFlow?: Flow;
}

export type OnReturn = (result: Value) => void;

export function Formity<T extends Parameters>({ components, schema, onReturn, initialFlow }: FormityProps<T>) {
  const controller = useMemo(() => new Controller(schema), [schema]);

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

  const getFlow = useCallback(
    (formData: Variables): Flow => {
      return FlowUtils.getFlow(flow, schema, formData);
    },
    [flow, schema]
  );

  const point = flow.points[flow.points.length - 1];

  const defaultValues = useDefaultValues(form, point.path, flow.fields);
  const resolver = useResolver(form);
  const render = useRender(form, point.variables, components);

  const values = useMemo(
    () => ({
      step: flow.points.length,
      defaultValues: defaultValues,
      resolver: resolver,
      onNext: handleNext,
      onBack: handleBack,
      getFlow,
    }),
    [flow.points.length, defaultValues, resolver, handleNext, handleBack, getFlow]
  );

  return <FormityContext.Provider value={values}>{render(values)}</FormityContext.Provider>;
}
