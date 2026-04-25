import type { ReactNode } from "react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useMemo } from "react";

import { FormActionsContext } from "./form-actions-context";
import { FormActionsValue } from "./form-actions-value";

interface FormActionsProps<T extends Record<string, unknown>> {
  step: string;
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  getState: GetState<T>;
  setState: SetState;
  children: ReactNode;
}

export function FormActions<T extends Record<string, unknown>>({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: FormActionsProps<T>) {
  const value = useMemo(
    () => ({ onNext, onBack, getState, setState }),
    [onNext, onBack, getState, setState],
  ) as FormActionsValue<Record<string, unknown>>;
  return (
    <div key={step} className="h-full">
      <FormActionsContext.Provider value={value}>
        {children}
      </FormActionsContext.Provider>
    </div>
  );
}
