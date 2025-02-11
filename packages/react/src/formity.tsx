import { useState, useCallback } from "react";
import {
  type State,
  type Values,
  type OnYield,
  type OnReturn,
  initState,
  nextState,
  prevState,
  getForm,
  getState,
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
 * @param initialState The initial state of the multi-step form.
 */
interface FormityProps<T extends Values, U extends object, V extends object> {
  schema: Schema<T, U, V>;
  inputs?: U;
  params?: V;
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
  initialState?: State;
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
  initialState,
}: FormityProps<T, U, V>) {
  const [state, setState] = useState<State>(() => {
    if (initialState) return initialState;
    return initState(schema, inputs, onYield);
  });

  const onNext = useCallback(
    (values: object) => {
      const updatedState = nextState(state, schema, values, onYield, onReturn);
      setState(updatedState);
    },
    [state, schema, onYield, onReturn]
  );

  const onBack = useCallback(
    (values: object) => {
      const updatedState = prevState(state, schema, values, onYield);
      setState(updatedState);
    },
    [state, schema]
  );

  const obtainState = useCallback(
    (values: object) => {
      return getState(state, schema, values);
    },
    [state, schema]
  );

  const changeState = useCallback((state: State) => {
    setState(state);
  }, []);

  return getForm(
    state,
    schema,
    params,
    onNext,
    onBack,
    obtainState,
    changeState
  );
}
