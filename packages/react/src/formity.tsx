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
 * @template T The structure and values of the multi-step form.
 * @template U The input values of the multi-step form.
 * @template V The parameter values of the multi-step form.
 * @param schema The structure and behavior of the multi-step form.
 * @param inputs The input values of the multi-step form.
 * @param params The parameter values of the multi-step form.
 * @param onYield Callback function invoked when the multi-step form yields values.
 * @param onReturn Callback function invoked when the multi-step form returns values.
 * @param initialState The initial state of the multi-step form.
 */
interface FormityProps<
  T extends Values,
  U extends Record<string, unknown>,
  V extends Record<string, unknown>,
> {
  schema: Schema<T, U, V>;
  inputs?: U;
  params?: V;
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
  initialState?: State;
}

/**
 * Renders a multi-step form.
 */
export function Formity<
  T extends Values,
  U extends Record<string, unknown> = Record<never, never>,
  V extends Record<string, unknown> = Record<never, never>,
>({
  schema,
  inputs = {} as U,
  params = {} as V,
  onYield = () => {},
  onReturn = () => {},
  initialState,
}: FormityProps<T, U, V>): React.ReactNode {
  const [state, setState] = useState<State>(() => {
    if (initialState) return initialState;
    return getInitialState(schema, inputs, onYield);
  });

  const onNext = useCallback(
    (values: Record<string, unknown>) => {
      const updated = getNextState(state, schema, values, onYield, onReturn);
      setState(updated);
    },
    [state, schema, onYield, onReturn],
  );

  const onBack = useCallback(
    (values: Record<string, unknown>) => {
      const updated = getPreviousState(state, schema, values, onYield);
      setState(updated);
    },
    [state, schema, onYield],
  );

  const _getState = useCallback(
    (values: Record<string, unknown>) => {
      return getState(state, schema, values);
    },
    [state, schema],
  );

  const _setState = useCallback((state: State) => {
    setState(state);
  }, []);

  return getForm(state, schema, params, onNext, onBack, _getState, _setState);
}
