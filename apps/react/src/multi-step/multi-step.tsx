import type { ReactNode } from "react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useMemo } from "react";

import { MultiStepContext } from "./multi-step-context";

interface MultiStepProps {
  step: string;
  onNext: OnNext;
  onBack: OnBack;
  getState: GetState;
  setState: SetState;
  children: ReactNode;
}

export function MultiStep({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: MultiStepProps) {
  const value = useMemo(
    () => ({ onNext, onBack, getState, setState }),
    [onNext, onBack, getState, setState]
  );
  return (
    <div key={step} className="h-full">
      <MultiStepContext.Provider value={value}>
        {children}
      </MultiStepContext.Provider>
    </div>
  );
}
