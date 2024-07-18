import * as React from "react";

import { ReactElement, useState, useMemo, useCallback } from "react";

import { FormProps, FormData, FormRenderValues } from "./types/form";
import { ComponentsType, ComponentsParams } from "./types/components";
import { ListSchemaType } from "./types/schema";

import { Controller } from "./classes/controller";
import { Flow } from "./classes/flow";
import { FormResult } from "./types/result";

interface FormityProps<T extends ComponentsParams, U extends FormRenderValues> {
  components: ComponentsType<T>;
  form: (props: FormProps<U>) => ReactElement;
  schema: ListSchemaType;
  onSubmit: (data: FormData) => void;
}

export function Formity<T extends ComponentsParams, U extends FormRenderValues>({
  components,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const controller = useMemo(() => new Controller<T, U>(schema, components), [schema, components]);

  const [flow, setFlow] = useState<Flow<U>>(() => controller.initial());

  const form = flow.result as FormResult<U>;

  const handleSubmit = useCallback((data: FormData) => {
    const nextFlow = controller.next(flow, data);
    if (nextFlow.result.type === "return") onSubmit(nextFlow.result.return);
    else setFlow(nextFlow);
  }, []);

  const handleBack = useCallback((data: FormData) => {
    const previousFlow = controller.previous(flow, data);
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
