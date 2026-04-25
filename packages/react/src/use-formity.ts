import type { Flow, Schema, OnYield, OnReturn, State } from "@formity/system";
import type { OnNext, OnBack, GetState, SetState } from "@formity/system";

import { useState, useCallback } from "react";

import { initState } from "@formity/system";
import { nextState } from "@formity/system";
import { prevState } from "@formity/system";

import { syncState } from "@formity/system";
import { getForm } from "@formity/system";

interface Options<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown>,
  Params extends Record<string, unknown>,
> {
  flow: Flow<Render, Struct, Inputs, Params>;
  inputs?: Inputs;
  params?: Params;
  onYield?: OnYield<Struct>;
  onReturn?: OnReturn<Struct>;
  initialState?: State;
}

/**
 * Runs a multi-step form and returns the rendered output for the current step.
 *
 * @template Render The type of the rendered output for each form step.
 * @template Struct The structure of the multi-step form.
 * @template Inputs The input values available throughout the form.
 * @template Params The parameter values available when rendering each step.
 * @param flow The structure and behavior of the multi-step form.
 * @param inputs The input values available throughout the form.
 * @param params The parameter values available when rendering each step.
 * @param onYield Callback invoked when the form yields values.
 * @param onReturn Callback invoked when the form returns its final values.
 * @param initialState The initial state to resume from, if any.
 */
export function useFormity<
  Render,
  Struct extends Schema,
  Inputs extends Record<string, unknown> = Record<never, never>,
  Params extends Record<string, unknown> = Record<never, never>,
>({
  flow,
  inputs = {} as Inputs,
  params = {} as Params,
  onYield = () => {},
  onReturn = () => {},
  initialState,
}: Options<Render, Struct, Inputs, Params>): {
  form: Render;
  inputs: Record<string, unknown>;
  values: Record<string, unknown>;
  params: Record<string, unknown>;
  onNext: OnNext<Record<string, unknown>>;
  onBack: OnBack<Record<string, unknown>>;
  getState: GetState<Record<string, unknown>>;
  setState: SetState;
} {
  const [state, setState] = useState<State>(() => {
    if (initialState) return initialState;
    return initState({ flow, onYield, inputs });
  });

  const onNext = useCallback(
    (values: Record<string, unknown>) => {
      const changed = nextState({ flow, onYield, onReturn, state, values });
      setState(changed);
    },
    [flow, onYield, onReturn, state],
  );

  const onBack = useCallback(
    (values: Record<string, unknown>) => {
      const changed = prevState({ flow, onYield, state, values });
      setState(changed);
    },
    [flow, onYield, state],
  );

  const getState = useCallback(
    (values: Record<string, unknown>) => {
      return syncState({ flow, state, values });
    },
    [state, flow],
  );

  const args = { flow, params, state, onNext, onBack, getState, setState };

  return getForm(args);
}
