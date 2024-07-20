import * as React from "react";

import { ReactElement, Fragment, useState, useMemo, useCallback } from "react";
import { Value, Variables } from "expry";

import { FormProps } from "./types/form";
import { Components, Parameters } from "./types/components";
import { ListSchemaType } from "./types/schema";
import { FormResult } from "./types/result";

import { Controller } from "./classes/controller";
import { Flow } from "./classes/flow";

interface FormityProps<T extends Parameters, U extends Variables> {
  components: Components<T>;
  wrapper?: (children: ReactElement, key: number) => ReactElement;
  form: (props: FormProps<U>) => ReactElement;
  schema: ListSchemaType;
  onSubmit: (result: Value) => void;
}

export function Formity<T extends Parameters, U extends Variables>({
  components,
  wrapper = (children, key) => <Fragment key={key}>{children}</Fragment>,
  form: Form,
  schema,
  onSubmit,
}: FormityProps<T, U>) {
  const controller = useMemo(() => new Controller(schema, components), [schema, components]);

  const [flow, setFlow] = useState<Flow>(() => controller.initial());

  const form = flow.result as FormResult;

  const handleSubmit = useCallback(
    (formData: Variables) => {
      const next = controller.next(flow, formData);
      if (next.result.type === "form") setFlow(next);
      else return onSubmit(next.result.return);
    },
    [controller, flow, onSubmit]
  );

  const handleBack = useCallback(
    (formData: Variables) => {
      const previous = controller.previous(flow, formData);
      setFlow(previous);
    },
    [controller, flow]
  );

  const component = (
    <Form
      defaultValues={form.defaultValues}
      resolver={form.resolver}
      render={form.render}
      onSubmit={handleSubmit}
      onBack={handleBack}
    />
  );

  const key = flow.points.length;

  return wrapper(component, key);
}
