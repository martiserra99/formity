import type { Flow, Schema } from "@formity/system";
import type { OnYield, OnReturn, State } from "@formity/system";

import { useState, useCallback } from "react";

import { initState } from "@formity/system";
import { nextState } from "@formity/system";
import { prevState } from "@formity/system";
import { jumpState } from "@formity/system";

import { syncState } from "@formity/system";
import { getForm } from "@formity/system";

interface Options<T extends Schema> {
  flow: Flow<T>;
  inputs?: T["inputs"];
  params?: T["params"];
  history?: boolean;
  initialState?: State;
  onYield?: OnYield<T>;
  onReturn?: OnReturn<T>;
}

/**
 * Runs a multi-step form and returns the rendered output for the current step.
 *
 * @template T An object type extending `Schema` with the following properties:
 * - `render` - the type of the rendered output for each form step.
 * - `struct` — the structure of the multi-step form, including the values handled in each phase.
 * - `inputs` — additional values available across all steps of the multi-step form.
 * - `params` — values accessible when rendering each form step.
 *
 * @param flow The structure and behavior of the multi-step form.
 * @param inputs Additional values available across all steps of the multi-step form.
 * @param params Values accessible when rendering each form step.
 * @param history Whether to keep a history of previous states.
 * @param initialState The initial state to resume from, if any.
 * @param onYield Callback invoked when the form yields values.
 * @param onReturn Callback invoked when the form returns its final values.
 */
export function useFormity<T extends Schema>({
  flow,
  inputs = {} as T["inputs"],
  params = {} as T["params"],
  history = false,
  initialState = undefined,
  onYield = () => {},
  onReturn = () => {},
}: Options<T>): T["render"] {
  const [state, setState] = useState<State>(() => {
    if (initialState) return initialState;
    return initState({ flow, onYield, inputs });
  });

  const onNext = useCallback(
    (values: Record<string, unknown>) => {
      const options = { flow, onYield, onReturn, state, values, history };
      const changed = nextState(options);
      setState(changed);
    },
    [flow, onYield, onReturn, state, history],
  );

  const onBack = useCallback(
    (values: Record<string, unknown>) => {
      const changed = prevState({ flow, onYield, state, values });
      setState(changed);
    },
    [flow, onYield, state],
  );

  const onJump = useCallback(
    (id: string, values: Record<string, unknown>) => {
      const changed = jumpState({ id, flow, state, values, history });
      setState(changed);
    },
    [flow, state, history],
  );

  const getState = useCallback(
    (values: Record<string, unknown>) => {
      return syncState({ flow, state, values });
    },
    [state, flow],
  );

  return getForm({
    flow,
    params,
    state,
    onNext,
    onBack,
    onJump,
    getState,
    setState,
  });
}
