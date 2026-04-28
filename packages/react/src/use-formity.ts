import type { Flow, Definition } from "@formity/system";
import type { OnYield, OnReturn, State } from "@formity/system";

import { useState, useCallback } from "react";

import { initState } from "@formity/system";
import { nextState } from "@formity/system";
import { prevState } from "@formity/system";

import { syncState } from "@formity/system";
import { getForm } from "@formity/system";

interface Options<T extends Definition> {
  flow: Flow<T>;
  inputs?: T["inputs"];
  params?: T["params"];
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
  initialState?: State;
}

/**
 * Runs a multi-step form and returns the rendered output for the current step.
 *
 * @template T An object type extending `Definition` with the following properties:
 * - `render` - the type of the rendered output for each form step.
 * - `schema` — the structure of the multi-step form, including the values handled in each phase.
 * - `inputs` — additional values available across all steps of the multi-step form.
 * - `params` — values accessible when rendering each form step.
 *
 * @param flow The structure and behavior of the multi-step form.
 * @param inputs Additional values available across all steps of the multi-step form.
 * @param params Values accessible when rendering each form step.
 * @param onYield Callback invoked when the form yields values.
 * @param onReturn Callback invoked when the form returns its final values.
 * @param initialState The initial state to resume from, if any.
 */
export function useFormity<T extends Definition>({
  flow,
  inputs = {} as T["inputs"],
  params = {} as T["params"],
  onYield = () => {},
  onReturn = () => {},
  initialState,
}: Options<T>): T["render"] {
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
