import type { Schema, OnYield, OnReturn, State } from "@formity/system";

import { useState, useCallback } from "react";

import { initState } from "@formity/system";
import { nextState } from "@formity/system";
import { prevState } from "@formity/system";

import { syncState } from "@formity/system";
import { render } from "@formity/system";

import type { Flow } from "./flow";

/**
 * The properties of the multi-step form.
 *
 * @template Struct The structure of the multi-step form.
 * @template Inputs The input values of the multi-step form.
 * @template Params The parameter values of the multi-step form.
 * @param flow The structure and behavior of the multi-step form.
 * @param inputs The input values of the multi-step form.
 * @param params The parameter values of the multi-step form.
 * @param onYield Callback function invoked when the multi-step form yields values.
 * @param onReturn Callback function invoked when the multi-step form returns values.
 * @param initialState The initial state of the multi-step form.
 */
interface FormityProps<
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> {
  flow: Flow<Struct, Inputs, Params>;
  inputs?: Inputs;
  params?: Params;
  onYield?: OnYield<Struct>;
  onReturn?: OnReturn<Struct>;
  initialState?: State;
}

/**
 * Renders a multi-step form.
 */
export function Formity<
  Struct extends Schema,
  U extends Record<string, unknown> = Record<never, never>,
  V extends Record<string, unknown> = Record<never, never>,
>({
  flow,
  inputs = {} as U,
  params = {} as V,
  onYield = () => {},
  onReturn = () => {},
  initialState,
}: FormityProps<Struct, U, V>): React.ReactNode {
  const [state, setState] = useState<State>(() => {
    if (initialState) return initialState;
    return initState(flow, onYield, inputs);
  });

  const onNext = useCallback(
    (values: Record<string, unknown>) => {
      const changed = nextState(flow, onYield, onReturn, state, values);
      setState(changed);
    },
    [flow, onYield, onReturn, state],
  );

  const onBack = useCallback(
    (values: Record<string, unknown>) => {
      const changed = prevState(flow, onYield, state, values);
      setState(changed);
    },
    [flow, onYield, state],
  );

  const getState = useCallback(
    (values: Record<string, unknown>) => {
      return syncState(flow, state, values);
    },
    [state, flow],
  );

  return render(flow, params, state, onNext, onBack, getState, setState);
}
