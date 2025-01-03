import { useState, useCallback } from "react";
import {
  type Flow,
  type Values,
  type OnYield,
  type OnReturn,
  initFlow,
  nextFlow,
  prevFlow,
  getForm,
  getFlow,
} from "@formity/system";

import type { Schema } from "./schema";

/**
 * Props for the Formity component.
 *
 * @template T The structure and values of the multi-step form.
 * @template U The input values of the multi-step form.
 * @template V The parameter values of the multi-step form.
 * @param schema The structure and behavior of the multi-step form.
 * @param inputs The input values of the multi-step form.
 * @param params The parameter values of the multi-step form.
 * @param onYield Callback function invoked when the multi-step form yields values.
 * @param onReturn Callback function invoked when the multi-step form returns values.
 * @param initialFlow The initial state of the multi-step form.
 */
interface FormityProps<T extends Values, U extends object, V extends object> {
  schema: Schema<T, U, V>;
  inputs?: U;
  params?: V;
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
  initialFlow?: Flow;
}

export default function Formity<
  T extends Values,
  U extends object = object,
  V extends object = object
>({
  schema,
  inputs = {} as U,
  params = {} as V,
  onYield = () => {},
  onReturn = () => {},
  initialFlow,
}: FormityProps<T, U, V>) {
  const [flow, setFlow] = useState<Flow>(() => {
    if (initialFlow) return initialFlow;
    return initFlow(schema, inputs, onYield);
  });

  const onNext = useCallback(
    (values: object) => {
      setFlow((flow) => nextFlow(flow, schema, values, onYield, onReturn));
    },
    [schema, onYield, onReturn]
  );

  const onBack = useCallback(
    (values: object) => {
      setFlow((flow) => prevFlow(flow, schema, values));
    },
    [schema]
  );

  const obtainFlow = useCallback(
    (values: object) => {
      return getFlow(flow, schema, values);
    },
    [flow, schema]
  );

  const changeFlow = useCallback((flow: Flow) => {
    setFlow(flow);
  }, []);

  return getForm(flow, schema, params, onNext, onBack, obtainFlow, changeFlow);
}
