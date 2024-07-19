import * as React from "react";

import { ReactElement, useState, useMemo, useCallback } from "react";
import { Value, Variables } from "expry";

import { FormProps } from "./types/form";
import { Components, Parameters } from "./types/components";
import { ListSchemaType } from "./types/schema";
import { FormResult } from "./types/result";

import { Controller } from "./classes/controller";
import { Flow } from "./classes/flow";

interface FormityProps<T extends Parameters, U extends Variables> {
  components: Components<T>;
  form: (props: FormProps<U>) => ReactElement;
  schema: ListSchemaType;
  onSubmit: (result: Value) => void;
}

export function Formity<T extends Parameters, U extends Variables>({
  components,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const controller = useMemo(() => new Controller(schema, components), [schema, components]);

  const [flow, setFlow] = useState<Flow>(() => controller.initial());

  const form = flow.result as FormResult;

  const handleSubmit = useCallback((variables: Variables) => {
    const nextFlow = controller.next(flow, variables);
    if (nextFlow.result.type === "return") {
      return onSubmit(nextFlow.result.return);
    }
    setFlow(nextFlow);
  }, []);

  const handleBack = useCallback((variables: Variables) => {
    const previousFlow = controller.previous(flow, variables);
    setFlow(previousFlow);
  }, []);

  return (
    <Form
      defaultValues={form.defaultValues}
      resolver={form.resolver}
      render={form.render}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );
}
