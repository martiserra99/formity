import type { Values, OnYield, OnReturn, State } from "@formity/system";

import { useState, useCallback } from "react";
import {
  getInitialState,
  getNextState,
  getPreviousState,
  getForm,
  getState,
} from "@formity/system";

import type { Schema } from "./schema";

/**
 * The properties of the multi-step form.
 *
 * @template V The structure and values of the multi-step form.
 * @template I The input values of the multi-step form.
 * @template P The parameter values of the multi-step form.
 * @param schema The structure and behavior of the multi-step form.
 * @param inputs The input values of the multi-step form.
 * @param params The parameter values of the multi-step form.
 * @param onYield Callback function invoked when the multi-step form yields values.
 * @param onReturn Callback function invoked when the multi-step form returns values.
 * @param initialState The initial state of the multi-step form.
 */
interface FormityProps<
  V extends Values,
  I extends Record<string, unknown>,
  P extends Record<string, unknown>
> {
  schema: Schema<V, I, P>;
  inputs?: I;
  params?: P;
  onYield?: OnYield<V>;
  onReturn?: OnReturn<V>;
  initialState?: State;
}

/**
 * Renders a multi-step form.
 */
export function Formity<
  V extends Values,
  I extends Record<string, unknown> = Record<string, unknown>,
  P extends Record<string, unknown> = Record<string, unknown>
>({
  schema,
  inputs = {} as I,
  params = {} as P,
  onYield = () => {},
  onReturn = () => {},
  initialState,
}: FormityProps<V, I, P>): React.ReactNode {
  const [state, setState] = useState<State>(() => {
    if (initialState) return initialState;
    return getInitialState(schema, inputs, onYield);
  });

  const onNext = useCallback(
    (values: Record<string, unknown>) => {
      const updated = getNextState(state, schema, values, onYield, onReturn);
      setState(updated);
    },
    [state, schema, onYield, onReturn]
  );

  const onBack = useCallback(
    (values: Record<string, unknown>) => {
      const updated = getPreviousState(state, schema, values, onYield);
      setState(updated);
    },
    [state, schema]
  );

  const _getState = useCallback(
    (values: Record<string, unknown>) => {
      return getState(state, schema, values);
    },
    [state, schema]
  );

  const _setState = useCallback((state: State) => {
    setState(state);
  }, []);

  return getForm(state, schema, params, onNext, onBack, _getState, _setState);
}
