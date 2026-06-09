import type { ReactNode } from "react";
import type { Next, Back, GetState, SetState } from "@formity/react";

import { useMemo } from "react";

import { FormControlsContext } from "./form-controls-context";
import { FormControlsValue } from "./form-controls-value";

interface FormControlsProps<T extends Record<string, unknown>> {
  step: string;
  next: Next<T>;
  back: Back<T>;
  getState: GetState<T>;
  setState: SetState;
  children: ReactNode;
}

export function FormControls<T extends Record<string, unknown>>({
  step,
  next,
  back,
  getState,
  setState,
  children,
}: FormControlsProps<T>) {
  const value = useMemo(
    () => ({ next, back, getState, setState }),
    [next, back, getState, setState],
  ) as FormControlsValue<Record<string, unknown>>;
  return (
    <div key={step} className="h-full">
      <FormControlsContext.Provider value={value}>
        {children}
      </FormControlsContext.Provider>
    </div>
  );
}
