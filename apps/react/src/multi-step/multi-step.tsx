import type { ReactNode } from "react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useMemo } from "react";

import { MultiStepContext } from "./multi-step-context";
import { MultiStepValue } from "./multi-step-value";

interface MultiStepProps<T extends Record<string, unknown>> {
  step: string;
  onNext: OnNext<T>;
  onBack: OnBack<T>;
  getState: GetState<T>;
  setState: SetState;
  children: ReactNode;
}

export function MultiStep<T extends Record<string, unknown>>({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: MultiStepProps<T>) {
  const value = useMemo(
    () => ({ onNext, onBack, getState, setState }),
    [onNext, onBack, getState, setState],
  ) as MultiStepValue<Record<string, unknown>>;
  return (
    <div key={step} className="h-full">
      <MultiStepContext.Provider value={value}>
        {children}
      </MultiStepContext.Provider>
    </div>
  );
}
