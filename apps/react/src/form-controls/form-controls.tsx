import type { ReactNode } from "react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useMemo } from "react";

import { FormControlsContext } from "./form-controls-context";
import { FormControlsValue } from "./form-controls-value";

interface FormControlsProps<T extends Record<string, unknown>> {
  step: string;
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  getState: GetState<T>;
  setState: SetState;
  children: ReactNode;
}

export function FormControls<T extends Record<string, unknown>>({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: FormControlsProps<T>) {
  const value = useMemo(
    () => ({ onNext, onBack, getState, setState }),
    [onNext, onBack, getState, setState],
  ) as FormControlsValue<Record<string, unknown>>;
  return (
    <div key={step} className="h-full">
      <FormControlsContext.Provider value={value}>
        {children}
      </FormControlsContext.Provider>
    </div>
  );
}
