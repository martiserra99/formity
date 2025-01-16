import type { ReactNode } from "react";
import type { OnNext, OnBack, GetState, SetState } from "@formity/react";

import { useMemo } from "react";

import { ControllerContext } from "./controller-context";

interface ControllerProps {
  step: string;
  onNext: OnNext;
  onBack: OnBack;
  getState: GetState;
  setState: SetState;
  children: ReactNode;
}

export function Controller({
  step,
  onNext,
  onBack,
  getState,
  setState,
  children,
}: ControllerProps) {
  const values = useMemo(
    () => ({
      onNext,
      onBack,
      getState,
      setState,
    }),
    [onNext, onBack, getState, setState]
  );
  return (
    <div key={step} className="h-full">
      <ControllerContext.Provider value={values}>
        {children}
      </ControllerContext.Provider>
    </div>
  );
}
