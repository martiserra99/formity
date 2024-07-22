import { useState, useMemo, useCallback } from "react";
import { Value, Variables } from "expry";

import { Components, Parameters } from "./types/components";
import { ListSchemaType } from "./types/schema";
import { FormResult } from "./types/result";

import { Controller } from "./classes/controller";
import { Flow } from "./classes/flow";

interface FormityProps<T extends Parameters> {
  components: Components<T>;
  schema: ListSchemaType;
  onEmit?: () => {};
  onSave?: () => {};
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

  return form.render({
    step: flow.points.length,
    defaultValues: form.defaultValues,
    resolver: form.resolver,
    onNext: handleNext,
    onBack: handleBack,
  });
}
